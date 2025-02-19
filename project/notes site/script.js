let notes = [];
let editingIndex = null;

// Open the modal to add or edit a note
function openNoteModal(index = null) {
  if (index !== null) {
    // Editing an existing note
    document.getElementById("noteText").value = notes[index].text;
    document.getElementById("noteColor").value = notes[index].color;
    editingIndex = index;
  } else {
    // Adding a new note
    document.getElementById("noteText").value = "";
    document.getElementById("noteColor").value = "#fffdc1";
    editingIndex = null;
  }

  document.getElementById("noteModal").style.display = "flex";
}

// Close the modal
function closeNoteModal() {
  document.getElementById("noteModal").style.display = "none";
}

// Save the note (either new or edited)
function saveNote() {
  const noteText = document.getElementById("noteText").value;
  const noteColor = document.getElementById("noteColor").value;

  if (noteText.trim() !== "") {
    const newNote = {
      text: noteText,
      color: noteColor,
      createdAt: new Date().toLocaleString()  // Store the current date and time
    };

    if (editingIndex !== null) {
      // Edit the existing note
      notes[editingIndex] = newNote;
    } else {
      // Add a new note
      notes.push(newNote);
    }

    displayNotes();
    closeNoteModal();
  } else {
    alert("Please write something before saving the note.");
  }
}

// Display notes on the main page
function displayNotes() {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = '';  // Clear the notes container

  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;

    const noteText = document.createElement("textarea");
    noteText.value = note.text;
    noteText.disabled = true;

    const noteDate = document.createElement("div");
    noteDate.classList.add("note-date");
    noteDate.textContent = `Created on: ${note.createdAt}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = "&times;";
    deleteButton.onclick = () => deleteNote(index);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = "✎";
    editButton.onclick = () => editNote(index);

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    noteElement.appendChild(noteText);
    noteElement.appendChild(noteDate);
    noteElement.appendChild(buttonsContainer);
    notesContainer.appendChild(noteElement);
  });
}

// Edit a note
function editNote(index) {
  const note = notes[index];
  document.getElementById("noteText").value = note.text;
  document.getElementById("noteColor").value = note.color;
  editingIndex = index;
  openNoteModal(index);
}

// Delete a note
function deleteNote(index) {
  notes.splice(index, 1);  // Remove the note
  displayNotes();
}

// Load the notes when the page is loaded
window.onload = function() {
  displayNotes();
};
