import createHtmlElement from "../function/function";
import defaultImg from "../../assets/img/bird.jpg";
import Player from "./player";

export default class Question {
  constructor(data, lang, observer) {
    this.data = data;
    this.isShow = false;
    this.lang = lang;
    this.observer = observer;
    this.el = createHtmlElement("div", "question-wrapper");
    const imgContainer = createHtmlElement("div", "img-container", "", this.el);
    this.image = createHtmlElement("img", "bird-img", "", imgContainer);
    const div = createHtmlElement("div", "container-player", "", this.el);
    this.name = createHtmlElement("p", "bird-name", "****", div);
    this.player = new Player(this.observer);
    div.append(this.player.playerContainer);
    this.init();
    this.observer.addEvent('changeLang', this.changeLang);
  }

  init = () => {
     this.image.src = defaultImg;
     this.name.innerHTML = "****"
     this.player.player.src = this.data.audio;
  }

  next = (data) => {
    this.data = data;
    this.isShow = false;
    this.init();
  }

  show = () => {
    this.image.src = this.data.image;
    this.name.innerHTML = this.data.name[this.lang];
    this.isShow = true;
  };

  changeLang = (lang) => {
    this.lang = lang;
    if (this.isShow) {
      this.show();
    }
  }
}
