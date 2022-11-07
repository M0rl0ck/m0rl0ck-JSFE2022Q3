import createHtmlElement from "../function/function";
import defaultImg from "../../assets/img/bird.jpg";
import Player from "./player";

export default class Question {
  constructor(data) {
    this.data = data;
    this.el = createHtmlElement("div", "question-wrapper");
    const imgContainer = createHtmlElement("div", "img-container", "", this.el);
    this.image = createHtmlElement("img", "bird-img", "", imgContainer);
    this.image.src = defaultImg;
    const div = createHtmlElement("div", "container-player", "", this.el);
    this.name = createHtmlElement("p", "bird-name", "****", div);
    this.player = new Player(this.data.audio);
    div.append(this.player.playerContainer);
  }

  show = () => {
    this.image.src = this.data.image;
    this.name.innerHTML = this.data.name;
    console.log('show');
  };
}
