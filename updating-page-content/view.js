class View {
  constructor() {
    this.mainContainerEl = document.querySelector('#main-container');

    console.log(this.mainContainerEl);
  }

  addParagraph() {
    let p = document.createElement("p");
    let content = "This paragraph has been dynamically added by JavaScript!";
    p.append(content);
    document.querySelector('#main-container').append(p);
  }

  clearParagraphs() {
    document.querySelectorAll('p').forEach((element) => {
      element.remove();
    })
  }
}

module.exports = View;