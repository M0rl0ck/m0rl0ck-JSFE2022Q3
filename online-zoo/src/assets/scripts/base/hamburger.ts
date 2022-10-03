const hamburger = document.querySelector<HTMLElement>('.hamburger');
const menu = document.querySelector<HTMLElement>('.header__nav');

function openMenu() {
  hamburger?.classList.toggle('hamburger_open');
  menu?.classList.toggle('header__nav_open')
}

export { hamburger, openMenu };