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

function checkFieldArr(arr) {
  let count = 0;
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[i] > arr[j]) {
        count += 1;
      }
    }
  }
  return !(count % 2);
}

function genFieldArr(size) {
  let arr = [];
  for (let i = 1; i < size; i += 1) {
    arr.push(i);
  }
  arr = shuffle(arr);
  if (!checkFieldArr(arr)) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  arr.push(0);
  return arr;
}

export { createHtmlElement, shuffle, genFieldArr }