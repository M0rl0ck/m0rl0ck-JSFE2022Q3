import { createHtmlElement } from "../function";


const header = createHtmlElement("header", "header", "", document.body);
const shadow = createHtmlElement('div', 'shadow', '', document.body);
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

function closeMenu() {
  buttons.classList.remove('buttons_open');
  shadow.classList.remove('shadow_open');
  hamburger.classList.remove('hamburger_open');
  buttons.removeEventListener('click', closeMenu);
}

function openMenu() {
  buttons.classList.toggle('buttons_open');
  shadow.classList.toggle('shadow_open');
  hamburger.classList.toggle('hamburger_open');
  buttons.addEventListener('click', closeMenu);
}



hamburger.addEventListener('click', openMenu);

export { buttonStart, buttonContinue, buttonSave, buttonResults, buttonSound, hamburger, shadow };
