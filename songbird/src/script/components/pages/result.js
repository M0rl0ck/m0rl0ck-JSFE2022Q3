import createHtmlElement from "../../function/function";
import dataLangResult from "../../data/dataLangResult";

export default class Result {
  constructor(lang, score, observer, maxScore) {
    this.lang = lang;
    this.score = score;
    this.observer = observer;
    this.maxScore = maxScore;
    this.container = createHtmlElement("section", "result-container");
    this.container.style.display = "none";
    const textContainer = createHtmlElement('div', 'text-container', '', this.container)
    this.header = createHtmlElement(
      "h2",
      "",
      dataLangResult.header[this.lang],
      textContainer
    );
    const text = this.getText();
    this.text = createHtmlElement("p", "", text, textContainer);
    
    this.button = createHtmlElement('div', 'button button-result', dataLangResult.button[this.lang], this.container);

    this.observer.addEvent("changeLang", this.changeLang);
    this.button.addEventListener("click", this.newGame);
  }

  newGame = () => {
    this.observer.startEvents("newGame");
    this.container.style.display = "none";
  }

  getText = () => {
    return (
      dataLangResult.firstText[this.lang] +
      " " +
      this.score +
      " " +
      dataLangResult.secondText[this.lang] +
      " " +
      this.maxScore +
      " " +
      dataLangResult.endText[this.lang]
    );
  };

  changeLang = (lang) => {
    this.lang = lang;
    this.text.innerHTML = this.getText();
    this.button.innerHTML = dataLangResult.button[this.lang];
  }

  showResult = (isWin, score) => {
    this.button.style.display = isWin ? 'none' : '';
    this.score = score;
    this.changeLang(this.lang);
    this.container.style.display = '';
  }
}
