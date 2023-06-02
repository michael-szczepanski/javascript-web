const NotesModel = require('./src/models/notesModel.js');
const NotesView = require('./src/views/notesView.js')
const NotesClient = require('./src/clients/notesClient.js')
const EmojiClient = require('./src/clients/emojiClient.js')

const notesModel = new NotesModel();
const notesClient = new NotesClient();
const notesView = new NotesView(notesModel, notesClient);
notesView.setEmojiClient(new EmojiClient());

notesView.displayNotesFromApi();