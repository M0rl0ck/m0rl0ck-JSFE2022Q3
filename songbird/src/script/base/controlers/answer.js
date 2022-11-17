import AnswerViewer from "../viewers/answerViewer";
import Player from "../player";

export default class Answer {
  constructor(birdsData, index, dataLang, lang, observer) {
    this.birdsData = birdsData;
    this.index = index;
    this.data = this.birdsData[index].data;
    this.dataLang = dataLang;
    this.lang = lang;
    this.observer = observer;
    this.player = new Player(this.observer);
    this.viewer = new AnswerViewer(this.birdsData, this.index, this.dataLang, this.lang, this.player, this.observer);
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
