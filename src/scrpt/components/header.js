import { createHtmlElement } from "../function";

const header = createHtmlElement("header", "header", "", document.body);
const wrapper = createHtmlElement("div", "wrapper wrapper__header", "", header);
const buttons = createHtmlElement("div", "buttons", "", wrapper);
const buttonStart = createHtmlElement(
  "button",
  "button button__start",
  "New game",
  buttons
);
const buttonSave = createHtmlElement(
  "button",
  "button button__save",
  "Save",
  buttons
);
const buttonContinue = createHtmlElement(
  "button",
  "button button__continue",
  "Continue game",
  buttons
);
const buttonResults = createHtmlElement(
  "button",
  "button button__resalts",
  "Resaults",
  buttons
);
const buttonSound = createHtmlElement(
  "div",
  "checkSound checkSound_active",
  "<p>Sound: </p><div></div>",
  buttons
);
const hamburger = createHtmlElement(
  "div",
  "hamburger",
  "<span></span><span></span><span></span>",
  wrapper
);

export { buttonStart, buttonContinue, buttonSave, buttonResults, buttonSound, hamburger };
