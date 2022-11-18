import createHtmlElement from "../function/function";

export default class Header {
  constructor(dataLang, lang, observer) {
    this.observer = observer;
    this.dataLang = dataLang;
    this.lang = lang;
    const el = createHtmlElement("header", "header", "", document.body);
    const wrapper = createHtmlElement("div", "wrapper header__wrapper", "", el);
    createHtmlElement("div", "header__logo", "", wrapper);
    this.nav = createHtmlElement("nav", "nav", "", wrapper);

    this.buttonMain = this.createButton(
      "checked",
      `${this.dataLang.buttonMain[this.lang]}`
    );
    this.buttonMain.addEventListener("click", this.checkMain);

    this.buttonGaim = this.createButton(
      "",
      `${this.dataLang.buttonGaim[this.lang]}`
    );
    this.buttonGaim.addEventListener("click", this.checkGame);

    this.buttonSlaider = this.createButton(
      "",
      `${this.dataLang.buttonSlaider[this.lang]}`
    );
    this.buttonSlaider.addEventListener("click", this.checkSlaider);

    this.langContainer = createHtmlElement("div", "lang", "", wrapper);
    this.langRu = createHtmlElement(
      "span",
      "lang lang_active",
      `${this.dataLang.langRu[this.lang]}`,
      this.langContainer
    );
    createHtmlElement("span", "", " / ", this.langContainer);
    this.langEn = createHtmlElement(
      "span",
      "lang",
      `${this.dataLang.langEn[this.lang]}`,
      this.langContainer
    );

    this.langContainer.addEventListener("click", this.changeLang);
  }

  createButton(className, name) {
    const button = createHtmlElement(
      "div",
      `button button_${className}`,
      name,
      this.nav
    );
    return button;
  }

  setLang = () => {
    this.buttonMain.innerHTML = `${this.dataLang.buttonMain[this.lang]}`;
    this.buttonGaim.innerHTML = `${this.dataLang.buttonGaim[this.lang]}`;
    this.buttonSlaider.innerHTML = `${this.dataLang.buttonSlaider[this.lang]}`;
    this.langRu.innerHTML = `${this.dataLang.langRu[this.lang]}`;
    this.langEn.innerHTML = `${this.dataLang.langEn[this.lang]}`;
    this.langRu.className = this.lang === "Rus" ? "lang lang_active" : "lang";
    this.langEn.className = this.lang === "Eng" ? "lang lang_active" : "lang";
  };

  changeLang = (lang) => {
    if (this.lang === "Rus") {
      this.lang = "Eng";
    } else if (this.lang === "Eng") {
      this.lang = "Rus";
    }
    localStorage.setItem("lang", this.lang);
    this.observer.startEvents("changeLang", this.lang);
    this.setLang();
  };

  checkMain = () => {
    this.uncheckButton();
    this.buttonMain.classList.add('button_checked')
    this.observer.startEvents("startPage");
  }
  checkGame = () => {
    this.uncheckButton();
    this.buttonGaim.classList.add('button_checked')
    this.observer.startEvents("newGame");
  }
  checkSlaider = () => {
    this.uncheckButton();
    this.buttonSlaider.classList.add('button_checked')
    this.observer.startEvents("slider");
  }

  uncheckButton = () => {
    this.buttonMain.classList.remove('button_checked');
    this.buttonGaim.classList.remove('button_checked');
    this.buttonSlaider.classList.remove('button_checked');
  }
}
