// script.js
document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');
    
    // Load notes from local storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Display existing notes on page load
    displayNotes();

    // Handle form submission for adding new note
    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();

        if (title && content) {
            const note = { id: Date.now(), title, content };
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
            noteForm.reset();
        } else {
            alert('Please enter both title and content for the note.');
        }
    });

    // Function to display notes in the UI
    function displayNotes() {
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.classList.add('note');
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="deleteNote(${note.id})">Delete</button>
            `;
            notesList.appendChild(noteCard);
        });
    }

    // Function to delete a note
    window.deleteNote = function(id) {
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    };
});