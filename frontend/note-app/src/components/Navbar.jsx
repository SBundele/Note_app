import React from 'react'
import { FaSquarePlus } from "react-icons/fa6";
// import { Link } from "react-router-dom";

function Navbar({ searchText, handelSearchText }) {
  return (
    <nav className="navbar bg-body-tertiary py-50" style={{ padding: "20px" }}>
      <div className="container d-flex justify-content-around">
        <a className="navbar-brand" href="/">
          <h4 style={{ fontWeight: "bold" }}>Notey</h4>
        </a>
        <div className="d-flex">
          <div
            className="input-group input-group-sm"
            style={{ width: "500px", height: "40px" }}
          >
            <input
              className="form-control"
              placeholder="Search"
              value={searchText}
              onChange={(e) => handelSearchText(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </div>

        <a href="/add-note" style={{ textDecoration: "none" }}>
          <button className="btn btn-outline-primary btn-md" type="button">
            <FaSquarePlus className="me-2 fs-6" /> Add Notes
           </button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar
