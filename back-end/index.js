const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config.js");
const User = require("./db/User");
const Product = require("./db/Product.js");
const Jwt = require("jsonwebtoken");
const jwtKey = "notes";
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body); // object of user schema.
  let result = await user.save(); // saved in 'users' collection.
  result = result.toObject();
  delete result.password; // to delete password from response.
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("Something went wrong");
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password"); // send all user details except for the password.
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("Something went wrong");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({
        message: "No User Found",
      });
    }
  } else {
    res.send({
      message: "No User Found",
    });
  }
});

app.post("/add", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let notes = await Product.find(); // returns all data in collection
  if (notes.length > 0) {
    res.send(notes);
  } else {
    res.send({ message: "No notes in database!" });
  }
});

app.delete("/product/:id", async (req, res) => {
  // res.send(result);
  // res.send(req.params.id);
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ message: "No Note Found" });
  }
});

app.put("/product/:id", async (req, res) => {
  const result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { title: { $regex: req.params.key } },
      { content: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    // token = token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.send({
          result: "not a valid token",
        });
      } else {
        next();
      }
    });
  } else {
    res.send({
      result: "Please add token",
    });
  }
}

app.listen(process.env.PORT);
