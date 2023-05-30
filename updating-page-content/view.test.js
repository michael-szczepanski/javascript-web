/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./view');

let view;

describe('Page view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    view = new View();
  })

  it('displays 2 paragraphs', () => {
    expect(document.querySelectorAll('p').length).toBe(2);
  });

  it('dynamically adds a paragraph with addParagraph()', () => {
    view.addParagraph();
    expect(document.querySelectorAll('p').length).toBe(3);
  })

  it('clears all paragraphs with clearParagraphs()', () => {
    view.clearParagraphs();
    expect(document.querySelectorAll('p').length).toBe(0);
  })
});