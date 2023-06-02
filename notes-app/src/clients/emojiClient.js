class EmojiClient {
  emojify(text) {
    return fetch('https://makers-emojify.herokuapp.com/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"text" : text})
    })
    .then(response => response.json())
    .then((data) => 
    {
      return data.emojified_text;
    })
  }
}

module.exports = EmojiClient;