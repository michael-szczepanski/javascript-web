const NotesModel = require('../models/notesModel.js');
const NotesClient = require('../clients/notesClient.js');

class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.addNoteButton = document.querySelector("#add-note-button");
    this.addNoteButton.addEventListener('click', () => { this.addNote() });
  }

  displayNotes() {
    this.model.getNotes().forEach((note) => {
      let div = document.createElement('div');
      div.className = 'note'
      div.append(note);
      document.querySelector('#main-container').append(div);
    })
  }

  clearNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
  }

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      data.forEach((element) => {
        this.model.addNote(element);
      })
      this.clearNotes();
      this.displayNotes();
    })
    
  }

  // Private methods

  addNote() {
    const note = document.querySelector("#note-text").value;
    this.client.createNote(note);
    this.clearNotes();
    this.displayNotesFromApi();
    document.querySelector('#note-text').value = '';
  }
}

module.exports = NotesView;