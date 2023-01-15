import createHtmlElement from "./createElement";

const createButton = (newclass: string, innerText: string, disabled?: boolean, parrent?: HTMLElement) => {
  const el = createHtmlElement("button", newclass, innerText, parrent) as HTMLButtonElement;
  if (disabled) {
    el.disabled = true;
  }
  return el;
};
export default createButton;
