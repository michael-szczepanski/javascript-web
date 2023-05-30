const Model = require('../../src/models/notesModel.js')

let model;

describe('NotesModel', () => {
  beforeEach(() => {
    model = new Model();
  })

  describe('getNotes()', () => {
    test('should return [] for empty array', () => {
      expect(model.getNotes()).toEqual([]);
    })
  })

  describe('addNote()', () => {
    test('adds notes to the model', () => {
      let note1 = 'Buy milk';
      let note2 = 'Go to the gym';
      model.addNote(note1);
      model.addNote(note2);

      expect(model.getNotes()).toEqual([note1, note2]);
    })
  })

  describe('reset()', () => {
    test('clears all notes from array', () => {
      model.addNote('Note 1');
      model.reset();
      expect(model.getNotes()).toEqual([]);
    })
  })
})