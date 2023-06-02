class NotesClient {
  loadNotes(callback, errorCallback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => callback(data))
      .catch((error) => {
        errorCallback();
        console.log(error);
      });
  }

  createNote(note, errorCallback) {
    return fetch('http://localhost:3000/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"content" : note})
    }).catch((error) => {
      errorCallback();
      console.log(error);
    });
  }

  deleteNotes() {
    return fetch('http://localhost:3000/notes', {
      method: "DELETE"
    })
  }
}

module.exports = NotesClient;