const NotesClient = require('../../src/clients/notesClient.js');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

let client;

describe('Client class', () => {
  beforeEach(() => {
    fetch.resetMocks();
    client = new NotesClient();
  });

  test('calls fetch and loads data', (done) => {
    // 1. Instantiate the class

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      notes: ['note 1', 'note 2']
    }));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.notes).toEqual(['note 1', 'note 2']);

      // 4. Tell Jest our test can now end.
      done();
    });
  });

  test('makes a POST request with the correct parameters', () => {
    const note = 'new note'

    fetch.mockResponseOnce(JSON.stringify({
      content: note
    }))

    return client.createNote(note).then(() => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.lastCall[0]).toEqual('http://localhost:3000/notes');
      expect(fetch.mock.lastCall[1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"new note"}'
      })
      expect(fetch).toBeCalledWith('http://localhost:3000/notes',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"new note"}'
      })
    });
  });
  
  
  
});