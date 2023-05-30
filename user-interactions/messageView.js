class MessageView {
  constructor() {
    this.buttonEl = document.querySelector('#show-message-button');
    this.hideButton = document.querySelector('#hide-message-button');

    this.hideButton.addEventListener('click', () => {
      this.hideMessages();
    });

    this.buttonEl.addEventListener('click', () => {
       this.displayMessage();
    });
  }

  displayMessage() {
    const value = document.querySelector('#message-input').value
    const div = document.createElement("div");
    div.id="message";
    div.append(value);
    document.querySelector("#main-container").append(div);
  }

  hideMessages() {
    const all = document.querySelectorAll("#message");
    all.forEach(message => message.remove());
  }
}

module.exports = MessageView;

