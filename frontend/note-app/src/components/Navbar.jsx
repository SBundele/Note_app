import { FaSquarePlus } from "react-icons/fa6";
import PropTypes from "prop-types";

function Navbar({ searchText, handleSearchText, onSearch, onAddNote }) {
  return (
    <nav className="navbar bg-body-tertiary py-50" style={{ padding: "20px" }}>
      <div className="container d-flex flex-wrap justify-content-around gap-3">
        <a className="navbar-brand" href="/">
          <h4 style={{ fontWeight: "bold" }}>Notey</h4>
        </a>
        <form
          className="d-flex w-100"
          style={{ maxWidth: "500px" }}
          onSubmit={onSearch}
        >
          <div
            className="input-group input-group-sm w-100"
            style={{ height: "40px" }}
          >
            <input
              className="form-control"
              placeholder="Search"
              value={searchText}
              onChange={(e) => handleSearchText(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </form>

        <button
          className="btn btn-outline-primary btn-md"
          type="button"
          onClick={onAddNote}
        >
          <FaSquarePlus className="me-2 fs-6" /> Add Notes
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

Navbar.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleSearchText: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
};
