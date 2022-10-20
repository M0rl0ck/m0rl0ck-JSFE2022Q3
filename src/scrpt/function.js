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

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// eslint-disable-next-line import/prefer-default-export
export { createHtmlElement, shuffle }