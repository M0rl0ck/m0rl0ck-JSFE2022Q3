import createHtmlElement from "../function/function";
import defaultImg from "../../assets/img/bird.jpg";
import Player from "./player";

export default class Question {
  constructor(data) {
    this.data = data;
    this.el = createHtmlElement("div", "question-wrapper");
    const imgContainer = createHtmlElement("div", "img-container", "", this.el);
    this.image = createHtmlElement("img", "bird-img", "", imgContainer);
    const div = createHtmlElement("div", "container-player", "", this.el);
    this.name = createHtmlElement("p", "bird-name", "****", div);
    this.player = new Player();
    div.append(this.player.playerContainer);
    this.init();
  }

  init = () => {
     this.image.src = defaultImg;
     this.player.player.src = this.data.audio;
  }

  next = (data) => {
    this.data = data;
    this.init();
  }

  show = () => {
    this.image.src = this.data.image;
    this.name.innerHTML = this.data.name;
    console.log('show');
  };
}
