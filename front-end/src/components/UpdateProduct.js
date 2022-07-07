import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNotesDetails();
  }, []);

  const getNotesDetails = async () => {
    console.log(params);
    let result = await fetch(
      `http://localhost:${process.env.PORT}/product/${params.id}`,
      {
        method: "Get",
      }
    );
    result = await result.json();
    setTitle(result.title);
    setContent(result.content);
    setCategory(result.category);
  };

  const UpdateProductHandler = async () => {
    if (title && content) {
      await fetch(`http://localhost:${process.env.PORT}/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
          category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/home");
    } else {
      alert("Please add title and content");
    }
  };

  return (
    <div>
      <h1>Update Note</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Update Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        className="inputBox"
        type="text"
        placeholder="Update Content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Update Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <button className="addBtn" onClick={UpdateProductHandler}>
        Update Note
      </button>
    </div>
  );
};

export default UpdateProduct;
