/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('jest-fetch-mock').enableMocks()

const NotesView = require('../../src/views/notesView.js');
const NotesModel = require('../../src/models/notesModel.js');
jest.mock('../../src/models/notesModel.js');
const NotesClient = require('../../src/clients/notesClient.js');
jest.mock('../../src/clients/notesClient.js');

let notesView;

describe('NotesView', () => {
  beforeEach(() => {
    NotesModel.mockClear();
    NotesClient.mockClear();
    fetch.resetMocks();

    document.body.innerHTML = fs.readFileSync('./index.html');
    let notesModel = new NotesModel();
    let notesClient = new NotesClient();
    notesModel.getNotes.mockImplementation(() => ['note 1', 'note 2'])
    notesView = new NotesView(notesModel, notesClient);
  })

  describe('displayNotes', () => {
    test('it gets a list of notes from the model', () => {
      jest.spyOn(notesView.notesModel, 'getNotes')
      
      notesView.displayNotes();
      expect(notesView.notesModel.getNotes).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll('.note').length).toBe(2);
      expect(document.querySelectorAll('div').length).toBe(3);
    })
    
    test('Add note button', () => {
      notesView = new NotesView(new NotesModel());
      notesView.notesModel.getNotes.mockImplementation(() => ["Feed the Peregrine Falcon"])
      const button = document.querySelector("#add-note-button");
      document.querySelector("#note-text").value = "Feed the Peregrine Falcon";
      button.click();
      expect(document.querySelector(".note").textContent).toBe("Feed the Peregrine Falcon");
    });
  })

  describe('clearNotes', () => {
    test('it removes all notes from the list', () => {
      jest.spyOn(notesView.notesModel, 'getNotes')
      jest.spyOn(notesView, 'displayNotes')

      const button = document.querySelector("#add-note-button");
      document.querySelector("#note-text").value = "Feed the Peregrine Falcon";
      button.click();
      notesView.displayNotes();
      notesView.clearNotes();
      expect(document.querySelectorAll('.note').length).toBe(0);
      expect(notesView.displayNotes).toHaveBeenCalledTimes(2);
    })
  })

  describe('displayNotesFromApi()', () => {
    test('it loads notes correctlt', async () => {
      // jest.spyOn(notesView.notesClient, 'loadNotes')
      fetch.mockResponseOnce(JSON.stringify({
        notes: ['note 1', 'note 2']
      }));

      notesView.notesClient.loadNotes.mockImplementation(() => {
        fetch('');
        notesView.displayNotes();
      })

      await notesView.displayNotesFromApi()

      expect(notesView.notesClient.loadNotes).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls.length).toBe(1);
      expect(document.querySelectorAll('.note').length).toBe(2);
    })
  })
})