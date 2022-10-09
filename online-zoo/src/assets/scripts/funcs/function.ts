const createHtmlElement = (
	type: string,
	newclass: string,
	innerHTML?: string,
	parrent?: HTMLElement,
): HTMLElement => {
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

function shuffle(array: any[]):void {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function stopScroll() {
	document.body.style.top = `-${window.scrollY}px`;
	document.body.style.position = "fixed";
}

function startScroll() {
	const scrool = document.body.style.top;
	document.body.style.position = "";
	document.body.style.top = "";
	window.scrollTo(0, parseInt(scrool || "0") * -1);
}

export {createHtmlElement, shuffle, stopScroll,startScroll};