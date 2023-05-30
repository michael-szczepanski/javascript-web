/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const MessageView = require('./messageView');
let vie

describe('MessageView', () => {

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const view = new MessageView();
  });

  it('clicks the button', () => {
    document.querySelector('#message-input').value = "Our message"
    const buttonEl = document.querySelector('#show-message-button');
    buttonEl.click();

    let message = document.querySelector('#message');
    expect(message).not.toBeNull();
    expect(message.textContent).toBe('Our message');
  });

  it('Hides all messages after being clicked', () => {
    let buttonEl = document.querySelector('#show-message-button');
    buttonEl.click();
    buttonEl = document.querySelector('#hide-message-button');
    buttonEl.click();
    expect(document.querySelector('#message')).toBeNull();
  });
});