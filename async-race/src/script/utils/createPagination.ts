import createHtmlElement from "./createElement";

const createPagination = (className: string, prev: HTMLButtonElement, text: HTMLElement, next: HTMLButtonElement) => {
  const el = createHtmlElement("div", `${className}__buttons`, "");
  const buttons = createHtmlElement("div", "pagination__buttons", "", el);
  buttons.append(prev, text, next);
  return el;
};

export default createPagination;
