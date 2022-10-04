const hamburger = document.querySelector<HTMLElement>('.hamburger');
const menu = document.querySelector<HTMLElement>('.header__nav');
const shadowNav = document.querySelector<HTMLElement>('.shadow_nav');

function openMenu() {
  hamburger?.classList.toggle('hamburger_open');
  menu?.classList.toggle('header__nav_open');
  shadowNav.classList.toggle('shadow_nav_open');
}

export { hamburger, shadowNav, openMenu };