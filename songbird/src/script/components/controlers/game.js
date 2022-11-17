import GameViewer from "../viewers/gameViewer";
import birdsData from "../../data/dataBird";
import Question from "../../base/question";
import Answer from "../../base/controlers/answer";
import dataLang from "../../data/dataLang";
import soundWin from "../../../assets/sound/win.mp3";
import soundError from "../../../assets/sound/error.mp3";
import {
  maxCurrentScore,
  minCurrentScore,
  startIndex,
  volumeError,
} from "../../data/constans/constans";

export default class Game {
  constructor(lang, observer) {
    this.birdsData = birdsData;
    this.lang = lang;
    this.observer = observer;
    this.startIndex = startIndex;
    this.currentIndex = this.startIndex;
    this.endIndex = this.birdsData.length - 1;
    this.isWin = false;
    this.score = minCurrentScore;
    this.currentScore = maxCurrentScore;
    this.gameViewer = new GameViewer();
    this.container = this.gameViewer.gameContainer;

    this.init();
    this.observer.addEvent("checkAnswer", this.checkAnswer);
    this.observer.addEvent("next", this.next);
  }

  init = () => {
    const index = this.getRandomIndex();
    this.questionData = this.birdsData[this.currentIndex].data[index];
    this.question = new Question(this.questionData, this.lang, this.observer);
    this.container.append(this.question.el);
    this.answer = new Answer(
      this.birdsData,
      this.currentIndex,
      dataLang,
      this.lang,
      this.observer
    );
    this.container.append(this.answer.answerContainer);
  };

  getRandomIndex = () => {
    return Math.floor(Math.random() * (this.endIndex + 1));
  };

  checkAnswer = (id, isChecked) => {
    this.answer.showDetails(id);
    if (!this.isWin && !isChecked) {
      const player = new Audio();
      player.volume = volumeError;
      if (id !== this.questionData.id) {
        this.currentScore =
          this.currentScore === minCurrentScore
            ? minCurrentScore
            : this.currentScore - 1;

        this.answer.addClassToBird(id, "false");
        player.src = soundError;
        player.play();
      } else if (id === this.questionData.id) {
        this.isWin = true;
        this.score += this.currentScore;
        this.answer.viewer.changeScore(this.score);
        this.answer.viewer.setActiveNext();
        this.answer.viewer.addClassToBird(id, "true");
        this.question.show();
        player.src = soundWin;
        player.play();
      }
    }
  };

  next = () => {
    if (this.currentIndex < this.endIndex) {
      this.currentIndex += 1;
      this.currentScore = maxCurrentScore;
      this.isWin = false;
      this.answer.viewer.removeClassBird();
      const index = this.getRandomIndex();
      this.questionData = this.birdsData[this.currentIndex].data[index];
      this.question.next(this.questionData);
      this.answer.next(
        this.birdsData[this.currentIndex].data,
        this.currentIndex
      );
      this.answer.viewer.disableNext();
    } else {
      this.showResult();
    }
  };

  restart = () => {
    this.currentIndex = startIndex;
    this.score = minCurrentScore;
    this.currentScore = maxCurrentScore;
    this.isWin = false;
    this.answer.viewer.removeClassBird();
    const index = this.getRandomIndex();
    this.questionData = this.birdsData[this.currentIndex].data[index];
    this.question.next(this.questionData);
    this.answer.next(this.birdsData[this.currentIndex].data, this.currentIndex);
    this.answer.viewer.disableNext();
  };
}
