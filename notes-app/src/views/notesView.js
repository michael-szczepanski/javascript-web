const NotesModel = require('../models/notesModel.js');

class NotesView {
  constructor(notesModel) {
    this.notesModel = notesModel;
    this.addNoteButton = document.querySelector("#add-note-button");
    this.addNoteButton.addEventListener('click', () => { this.#addNote() });
  }

  displayNotes() {
    this.notesModel.getNotes().forEach((note) => {
      let div = document.createElement('div');
      div.className = 'note'
      div.append(note);
      document.querySelector('#main-container').append(div);
    })
  }

  clearNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
  }

  // Private methods

  #addNote() {
    const value = document.querySelector("#note-text").value;
    this.notesModel.addNote(value);
    this.clearNotes();
    this.displayNotes();
    document.querySelector('#note-text').value = '';
  }
}

module.exports = NotesView;