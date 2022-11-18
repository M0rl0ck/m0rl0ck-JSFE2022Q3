import createHtmlElement from "../../function/function";
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
  maxScore,
} from "../../data/constans/constans";
import Result from "./result";

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
    this.maxScore = maxScore;
    this.currentScore = maxCurrentScore;
    this.container = createHtmlElement('section', 'game-container');
    this.container.style.display = 'none';

    this.init();
    this.observer.addEvent("checkAnswer", this.checkAnswer);
    this.observer.addEvent("next", this.next);
    this.observer.addEvent("newGame", this.restart);
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
    this.result = new Result(this.lang, this.score, this.observer, this.maxScore);

  };

  getRandomIndex = () => {
    return Math.floor(Math.random() * (this.endIndex + 1));
  };

  checkAnswer = (id, isChecked) => {
    if (!this.answer.player.player.paused) {
      this.answer.player.stop();
    }
    
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
        this.question.player.stop();
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

  showResult = () => {
    this.result.showResult(this.score === this.maxScore, this.score);
    this.container.style.display = 'none';
  }

  restart = () => {
    this.currentIndex = startIndex;
    this.score = minCurrentScore;
    this.currentScore = maxCurrentScore;
    this.isWin = false;
    this.answer.viewer.removeClassBird();
    this.answer.viewer.changeScore(this.score);
    const index = this.getRandomIndex();
    this.questionData = this.birdsData[this.currentIndex].data[index];
    this.question.next(this.questionData);
    this.answer.next(this.birdsData[this.currentIndex].data, this.currentIndex);
    this.answer.viewer.disableNext();
  };
}
