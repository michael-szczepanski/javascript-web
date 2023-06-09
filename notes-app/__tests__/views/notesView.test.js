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

let view;

describe('NotesView', () => {
  beforeEach(() => {
    NotesModel.mockClear();
    NotesClient.mockClear();
    fetch.resetMocks();

    document.body.innerHTML = fs.readFileSync('./index.html');
    let model = new NotesModel();
    let client = new NotesClient();
    model.getNotes.mockImplementation(() => ['note 1', 'note 2'])
    view = new NotesView(model, client);
  })

  describe('displayNotes', () => {
    test('it gets a list of notes from the model', () => {
      jest.spyOn(view.model, 'getNotes')
      
      view.displayNotes();
      expect(view.model.getNotes).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll('.note').length).toBe(2);
      expect(document.querySelectorAll('div').length).toBe(3);
    })
    
    test('Add note button', () => {
      jest.spyOn(view, 'addNote');
      jest.spyOn(view.client, 'createNote');
      const button = document.querySelector("#add-note-button");
      button.click();
      expect(view.addNote).toHaveBeenCalledTimes(1);
      expect(view.client.createNote).toHaveBeenCalledTimes(1);
    });
  })

  describe('clearNotes', () => {
    test('it removes all notes from the list', async () => {
      jest.spyOn(view, 'displayNotesFromApi')
      view.client.loadNotes.mockImplementationOnce(() => {
        let div = document.createElement('div');
        div.className = 'note'
        div.append("Feed the Peregrine Falcon");
        document.querySelector('#main-container').append(div);
      })

      const button = document.querySelector("#add-note-button");
      await button.click();
      
      expect(view.displayNotesFromApi).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll('.note').length).toBe(1);
      view.clearNotes();
      expect(document.querySelectorAll('.note').length).toBe(0);
    })
  })

  describe('displayNotesFromApi()', () => {
    test('it loads notes correctly', async () => {
      fetch.mockResponseOnce(JSON.stringify({
        notes: ['note 1', 'note 2']
      }));

      view.client.loadNotes.mockImplementation(() => {
        fetch('');
        view.displayNotes();
      })

      await view.displayNotesFromApi()

      expect(view.client.loadNotes).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls.length).toBe(1);
      expect(document.querySelectorAll('.note').length).toBe(2);
    })
  })

  describe('displayError', () => {
    test('it appends the correct item to the document', () => {
      view.displayError();
      expect(document.querySelectorAll('.error').length).toBe(1);
      expect(document.querySelector('.error').textContent).toBe('Oops, something went wrong.');
    })
  })

  describe('deleteNotes', () => {
    test('it calls the correct method on the client', async () => {
      jest.spyOn(view, 'deleteNotes');
      jest.spyOn(view, 'clearNotes');
      let deleteNotesButton = document.querySelector('#delete-notes-button')
      await deleteNotesButton.click();
      expect(view.deleteNotes).toHaveBeenCalledTimes(1);
      expect(view.client.deleteNotes).toHaveBeenCalledTimes(1);
      expect(view.clearNotes).toHaveBeenCalledTimes(1);
    })
  })
})