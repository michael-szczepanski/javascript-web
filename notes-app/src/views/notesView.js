const NotesModel = require('../models/notesModel.js');

class NotesView {
  constructor(notesModel) {
    this.notesModel = notesModel;
    this.button = document.querySelector("#add-note-button");
    this.button.addEventListener('click', () => {
      const value = document.querySelector("#note-text").value;
      this.notesModel.addNote(value);
      this.displayNotes();
    });
  }

  displayNotes() {
    this.notesModel.getNotes().forEach((note) => {
      let div = document.createElement('div');
      div.className = 'note'
      div.append(note);
      document.querySelector('#main-container').append(div);
    })
  }
}

module.exports = NotesView;