import AnswerViewer from "../viewers/answerViewer";
import Player from "../player";

export default class Answer {
  constructor(data, dataLang, lang, observer) {
    this.data = data;
    this.dataLang = dataLang;
    this.lang = lang;
    this.observer = observer;
    this.player = new Player(this.observer);
    this.viewer = new AnswerViewer(this.data, this.dataLang, this.lang, this.player, this.observer);
    this.answerContainer = this.viewer.answerContainer;

    this.observer.addEvent("changeLang", this.changeLang);
    this.observer.addEvent("showDetails", this.showDetails);
  }

  changeLang = (lang) => {
    this.lang = lang;
    this.viewer.changeLang(lang);
  };

  next = (data) => {
    this.data = data;
    this.viewer.next(this.data);
  }

  showDetails = (id) => {
    const dataDetails = this.data.find(el => el.id === id);
    this.viewer.showDetails(dataDetails);
  } 
}
