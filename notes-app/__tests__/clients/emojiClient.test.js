const EmojiClient = require('../../src/clients/emojiClient.js');

let client;

describe('EmojiClient', () => {
  beforeEach(() => {
    client = new EmojiClient();
  })

  describe('emojify', () => {
    test('it correctly returns a an object in the right format', () => {
      const url = 'https://makers-emojify.herokuapp.com/'
      const text = ':fire: Emojified :fire:'

      return client.emojify(text, (data) => {
        expect(data).toBeTruthy();
        expect(data.text).toEqual("🔥 Emojified 🔥");
      })
    })
  })
})