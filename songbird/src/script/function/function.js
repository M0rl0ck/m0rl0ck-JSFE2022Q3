const createHtmlElement = (
  type,
  newclass,
  innerHTML,
  parrent
) => {
  const element = document.createElement(type);
  if (newclass) {
    element.className = newclass;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  if (parrent) {
    parrent.append(element);
  }

  return element;
};

export default createHtmlElement;