import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  });

  const loginHandler = async () => {
    console.log(email, password);
    if (email.length > 0 && password.length > 0) {
      let result = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result.auth) {
        navigate("/home");
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
      } else {
        alert(result.message);
      }
    } else {
      alert("Please fill out the fields");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button className="loginBtn" type="button" onClick={loginHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;
