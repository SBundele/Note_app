import { useState } from "react";
import PropTypes from "prop-types";

const emptyNote = {
  title: "",
  body: "",
  category: "PERSONAL",
};

export default function AddNoteModal({ onAdd, onCancel, error, noteToEdit }) {
  const [note, setNote] = useState(noteToEdit || emptyNote);

  const isEditing = Boolean(noteToEdit);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((currentNote) => ({ ...currentNote, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(note);
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditing ? "Edit note" : "Add note"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
              />
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label className="form-label" htmlFor="note-title">
                  Title
                </label>
                <input
                  id="note-title"
                  name="title"
                  className="form-control"
                  value={note.title}
                  onChange={handleChange}
                  required
                  maxLength="100"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="note-body">
                  Note
                </label>
                <textarea
                  id="note-body"
                  name="body"
                  className="form-control"
                  rows="5"
                  value={note.body}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="note-category">
                  Category
                </label>
                <select
                  id="note-category"
                  name="category"
                  className="form-select"
                  value={note.category}
                  onChange={handleChange}
                >
                  <option value="BUSINESS">Business</option>
                  <option value="PERSONAL">Personal</option>
                  <option value="IMPORTANT">Important</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditing ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

AddNoteModal.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  noteToEdit: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    slug: PropTypes.string,
  }),
};
