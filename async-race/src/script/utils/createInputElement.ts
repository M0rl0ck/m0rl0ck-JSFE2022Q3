import createHtmlElement from "./createElement";

type InputType = 'text' | 'color';

const createInputElement = (innerText: string, typeName: InputType) => {
  const el = createHtmlElement('input', innerText) as HTMLInputElement;
  el.type = typeName;
  return el;
}

export default createInputElement;