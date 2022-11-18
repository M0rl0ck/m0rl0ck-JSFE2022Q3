import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import dataLang from "./data/dataLang";
import langList from "./data/constans/langList";
import observer from "./base/observer";
import MainPage from "./components/pages/mainPage";
import Galerry from "./components/pages/galerry";
import Game from "./components/pages/game";

let lang = localStorage.getItem("lang") ?? "Rus";
if (!langList.includes(lang)) {
  lang = "Rus";
}

class Start {
  constructor() {
    this.header = new Header(dataLang, lang, observer);
    this.main = new Main();
    this.footer = new Footer();

    this.wrapper = this.main.wrapper;

    this.mainPage = new MainPage(lang, observer);
    this.gallery = new Galerry();
    this.game = new Game(lang, observer);

    this.wrapper.append(
      this.mainPage.container,
      this.game.container,
      this.game.result.container,
      this.gallery.container
    );

    observer.addEvent("startPage", this.startPage);
    observer.addEvent("newGame", this.newGame);
    observer.addEvent("slider", this.slider);
  }

  startPage = () => {
    this.displayNone();
    this.mainPage.container.style.display = '';
  }

  newGame = () => {
    this.displayNone();
    this.game.container.style.display = '';
  }

  slider = () => {
    this.displayNone();
    this.gallery.container.style.display = '';
  }

  displayNone = () => {
    this.mainPage.container.style.display = 'none';
    this.game.container.style.display = 'none';
    this.game.result.container.style.display = 'none';
    this.gallery.container.style.display = 'none';
  }
}

export default Start;
