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
      "main",
      `${this.dataLang.buttonMain[this.lang]}`
    );
    this.buttonGaim = this.createButton(
      "gaim",
      `${this.dataLang.buttonGaim[this.lang]}`
    );
    this.buttonSlaider = this.createButton(
      "slaider",
      `${this.dataLang.buttonSlaider[this.lang]}`
    );
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

    this.langContainer.addEventListener('click', this.changeLang);
  }

  createButton(className, name) {
    const button = createHtmlElement(
      "div",
      `button header__button header__button_${className}`,
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
    if (this.lang === 'Rus') {
      this.lang = 'Eng';
    } else if (this.lang === 'Eng') {
      this.lang = 'Rus';
    }
    localStorage.setItem('lang', this.lang)
    this.observer.startEvents('changeLang', this.lang);
    this.setLang();
  };
}
