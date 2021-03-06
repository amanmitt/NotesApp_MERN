import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    let noteList = await fetch(`http://localhost:5000/products`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    noteList = await noteList.json();
    setNotes(noteList);
  };
  //   console.log(notes);

  const deleteHandler = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    console.log(result);
    getNotes();
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      setNotes(result);
    } else getNotes();
  };
  return (
    <>
      <h1 style={{ marginLeft: 50, color: "darkseagreen" }}>Notes list</h1>
      <input
        type="text"
        placeholder="Search note"
        onChange={searchHandle}
        className="search"
      />
      {notes.length ? (
        <div className="notes-list">
          {/* <ul className="head-ul">
            <li>Title</li>
            <li>Content</li>
            <li>Category</li>
          </ul> */}

          {notes.map((item, index) => (
            <ul>
              {/* <li>{item.title}</li> */}
              <li>{item.content}</li>
              {/* <li>{item.category}</li> */}
              <div className="buttons">
                <li>
                  <Link className="updateBtn" to={`/update/${item._id}`}>
                    Update
                  </Link>
                </li>
                <li id="delete">
                  <Link
                    className="deleteBtn"
                    to="/"
                    onClick={() => deleteHandler(item._id)}
                  >
                    Delete
                  </Link>
                </li>
              </div>
            </ul>
          ))}
        </div>
      ) : (
        <div>
          <h4>No notes found</h4>
        </div>
      )}
    </>
  );
};

export default ProductList;
