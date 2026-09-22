import { useState } from "react";
import Navbar from "./components/Navbar";
import AddNoteModal from "./components/AddNoteModal";
import Filter from "./components/Filter";
import NoteContainer from "./components/NoteContainer";
import { API_URL } from "./config";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [appliedSearchText, setAppliedSearchText] = useState("");
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [addNoteError, setAddNoteError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const saveNote = async (note) => {
    setAddNoteError("");
    const isEditing = Boolean(noteToEdit);
    const url = isEditing
      ? `${API_URL}/notes/${noteToEdit.slug}`
      : `${API_URL}/notes`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error("Unable to add note.");
      }

      setIsAddNoteOpen(false);
      setNoteToEdit(null);
      setRefreshKey((currentKey) => currentKey + 1);
    } catch (error) {
      setAddNoteError(error.message);
    }
  };

  const deleteNote = async (note) => {
    setDeleteError("");

    try {
      const response = await fetch(`${API_URL}/notes/${note.slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete note.");
      }

      setRefreshKey((currentKey) => currentKey + 1);
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  return (
    <>
      <Navbar
        searchText={searchText}
        handleSearchText={setSearchText}
        onSearch={(event) => {
          event.preventDefault();
          setAppliedSearchText(searchText);
        }}
        onAddNote={() => {
          setAddNoteError("");
          setNoteToEdit(null);
          setIsAddNoteOpen(true);
        }}
      />
      {isAddNoteOpen && (
        <AddNoteModal
          onAdd={saveNote}
          noteToEdit={noteToEdit}
          onCancel={() => {
            setIsAddNoteOpen(false);
            setNoteToEdit(null);
          }}
          error={addNoteError}
        />
      )}
      <Filter handleFilterText={setSelectedCategory} />

      <div className="container mt-5">
        <div className="row gap-5 justify-content-center">
          <NoteContainer
            selectedCategory={selectedCategory}
            searchText={appliedSearchText}
            refreshKey={refreshKey}
            deleteError={deleteError}
            onDelete={deleteNote}
            onEdit={(note) => {
              setAddNoteError("");
              setNoteToEdit(note);
              setIsAddNoteOpen(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
