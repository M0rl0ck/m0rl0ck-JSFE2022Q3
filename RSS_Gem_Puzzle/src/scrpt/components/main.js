import { createHtmlElement } from "../function";

function createRadio(id, name, checked) {
  const element = createHtmlElement('li');
  const input = createHtmlElement('input', '', '', element);
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'size');
  input.setAttribute('id', `size${id}`);
  input.setAttribute('value', `${id}`);
  if (checked) {
    input.setAttribute('checked', '')
  }
  const label = createHtmlElement('label', '', name, element);
  label.setAttribute('for', `size${id}`);
  return element;
}

const main = createHtmlElement("main", "main", "", document.body);
const wrapper = createHtmlElement("div", "wrapper wrapper__main", "", main);
const container = createHtmlElement("div", "container__timer", "", wrapper);
const movesContainer = createHtmlElement(
  "div",
  "movesContainer",
  "",
  container
);
createHtmlElement("p", "", "Moves: ", movesContainer);
const moves = createHtmlElement("p", "moves", "00", movesContainer);
const timerContainer = createHtmlElement(
  "div",
  "timerContainer",
  "",
  container
);
createHtmlElement("p", "", "Time: ", timerContainer);
const timer = createHtmlElement("p", "timer", "00:00", timerContainer);
const fieldContainer = createHtmlElement("div", "fieldContainer", "", wrapper);
const field = createHtmlElement("div", "field", "", fieldContainer);
const frameSizeForm = createHtmlElement("form", "frameSizeForm", "", wrapper);
const formField = createHtmlElement(
  "fieldset",
  "",
  "<legend>Please select frame size:</legend>",
  frameSizeForm
);
const listRadio = createHtmlElement('ul', 'listRadio', '', formField);
const arrRadio = [];
for (let i = 3; i<=8; i +=1) {
  const radio = createRadio(i, `${i}x${i}`, i === 4);
  arrRadio.push(radio);
  listRadio.append(radio);
}

export { moves, timer, field, formField, arrRadio };
