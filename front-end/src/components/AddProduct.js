import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const AddProductHandler = async () => {
    console.log(title, content, category);

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(userId);
    if (title && content) {
      let result = await fetch(`http://localhost:${process.env.PORT}/add`, {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          category,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      setTitle("");
      setCategory("");
      setContent("");
    } else {
      alert("Please add title and content");
    }
  };
  return (
    <div>
      <h1>Add Note</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        className="inputBox"
        type="text"
        placeholder="Enter Content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <button className="addBtn" onClick={AddProductHandler}>
        Add Note
      </button>
    </div>
  );
};

export default AddProduct;
