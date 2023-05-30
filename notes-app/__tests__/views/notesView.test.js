/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('../../src/views/notesView.js');
const NotesModel = require('../../src/models/notesModel.js');

let notesView;

describe('NotesView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    let notesModel = new NotesModel();
    notesView = new NotesView(notesModel);
  })

  describe('displayNotes', () => {
    test('it gets a list of notes from the model', () => {
      jest.spyOn(notesView.notesModel, 'getNotes')
      notesView.notesModel.getNotes.mockImplementationOnce(() => {
        return ['firstNote', 'secondNote'];
      })
      notesView.displayNotes();
      expect(notesView.notesModel.getNotes).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll('.note').length).toBe(2);
      expect(document.querySelectorAll('div').length).toBe(3);
    })
    
    test('', () => {
      const button = document.querySelector("#add-note-button");
      document.querySelector("#note-text").value = "Feed the Peregrine Falcon";
      button.click();
      notesView.displayNotes();
      expect(document.querySelector(".note").textContent).toBe("Feed the Peregrine Falcon");
    });
  })
})