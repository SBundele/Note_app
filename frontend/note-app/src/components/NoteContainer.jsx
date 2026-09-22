import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../config";

export default function NoteContainer({
  selectedCategory,
  searchText,
  refreshKey,
  deleteError,
  onDelete,
  onEdit,
}) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setFetchError("");

      try {
        const response = await fetch(`${API_URL}/notes`);
        if (!response.ok) {
          throw new Error("Unable to load notes.");
        }

        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [refreshKey, retryCount]);

  const normalizedSearchText = searchText.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      !selectedCategory || note.category === selectedCategory;
    const matchesTitle =
      !normalizedSearchText ||
      note.title.toLowerCase().includes(normalizedSearchText);

    return matchesCategory && matchesTitle;
  });

  const emptyState = filteredNotes.length === 0 && (
    <div className="alert alert-info text-center w-100">
      {selectedCategory
        ? `No ${selectedCategory.toLowerCase()} notes available.`
        : normalizedSearchText
          ? `No notes found for "${searchText}".`
          : "No notes available."}
    </div>
  );

  if (isLoading) {
    return (
      <div className="alert alert-secondary text-center w-100">
        Loading notes...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="alert alert-danger text-center w-100">
        <p className="mb-3">{fetchError}</p>
        <button
          className="btn btn-outline-danger"
          onClick={() => setRetryCount((count) => count + 1)}
        >
          Try again
        </button>
      </div>
    );
  }

  const noteCards = filteredNotes.map((note) => (
    <div key={note.id} className="card mb-3 p-3 col-md-3">
      <div>
        <span
          className={`badge ${note.category === "BUSINESS" ? "bg-success" : note.category === "PERSONAL" ? "bg-primary" : "bg-danger"}`}
        >
          {note.category}
        </span>
      </div>
      <div className="card-body px-0">
        <h2 className="card-title">{note.title}</h2>
        <p className="card-text">{note.body}</p>
        <small className="text-muted">
          Updated {new Date(note.updated).toLocaleString()}
        </small>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            if (window.confirm(`Delete "${note.title}"?`)) {
              onDelete(note);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <>
      {deleteError && (
        <div className="alert alert-danger text-center w-100">
          {deleteError}
        </div>
      )}
      {emptyState}
      {noteCards}
    </>
  );
}

NoteContainer.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  refreshKey: PropTypes.number.isRequired,
  deleteError: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
