const NotesModel = require('../models/notesModel.js');
const NotesClient = require('../clients/notesClient.js');

class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.addNoteButton = document.querySelector("#add-note-button");
    this.addNoteButton.addEventListener('click', () => { this.addNote() });

    this.deleteNotesButton = document.querySelector("#delete-notes-button");
    this.deleteNotesButton.addEventListener('click', () => { this.deleteNotes() })

    this.mainContainerEl = document.querySelector('#main-container');
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

  async displayNotesFromApi() {
    this.model.reset();
    await this.client.loadNotes((data) => {
      data.forEach((element) => {
        this.model.addNote(element);
      })
      this.clearNotes();
      this.displayNotes();
    }, () => { this.displayError() })
    
  }

  async addNote() {
    const note = document.querySelector("#note-text").value;
    document.querySelector('#note-text').value = '';
    await this.client.createNote(note, () => { this.displayError() });
    this.displayNotesFromApi();
  }

  displayError() {
    const errorEl = document.createElement('div');
    errorEl.className = 'error';
    errorEl.append('Oops, something went wrong.');
    this.mainContainerEl.append(errorEl);
  }

  deleteNotes() {
    this.client.deleteNotes();
    this.clearNotes();
  }
}

module.exports = NotesView;