import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Notes</Link>
          </li>
          <li>
            <Link to="/add">Add Note</Link>
          </li>
          <li>
            <Link onClick={logoutHandler} to="/login">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
