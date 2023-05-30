const NotesModel = require('./src/models/notesModel.js');
const NotesView = require('./src/views/notesView.js')

const notesModel = new NotesModel();

const notesView = new NotesView(notesModel);
notesView.displayNotes();