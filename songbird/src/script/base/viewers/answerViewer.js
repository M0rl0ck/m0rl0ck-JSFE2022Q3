import createHtmlElement from "../../function/function";

export default class AnswerViewer {
  constructor(birdsdata, index, dataLang, lang, player, observer) {
    this.birdsData = birdsdata;
    this.index = index;
    this.data = this.birdsData[index].data;
    this.dataLang = dataLang;
    this.dataDetails = "";
    this.lang = lang;
    this.player = player;
    this.observer = observer;
    this.answerContainer = createHtmlElement("div", "answer-container");

    // LIST QUESTIONS >>>>>>>>>>>>>>>>>>>>>>

    const questionsListWrapper = createHtmlElement(
      "div",
      "questions-list-wrapper",
      "",
      this.answerContainer
    );

    this.qustionsLinks = [];
    this.birdsData.forEach((data, index) => {
      const button = createHtmlElement(
        "div",
        index === this.index
          ? "qustion-button qustion-button_active"
          : "qustion-button",
        this.birdsData[index].questionsName[this.lang],
        questionsListWrapper
      );
      this.qustionsLinks.push(button);
    });

    const answerWrapperRow = createHtmlElement(
      "div",
      "answer-wrapper__row",
      "",
      this.answerContainer
    );

    // LIST ANSWER ///////////////////////////////

    const answerListWrapper = createHtmlElement(
      "div",
      "answer-list__wrapper",
      "",
      answerWrapperRow
    );

    const answerListContainer = createHtmlElement(
      "ul",
      "answer-list",
      "",
      answerListWrapper
    );

    // Answer List ::::::::::::::::::::::::::;

    this.answerList = [];
    this.data.forEach((item) => {
      const bird = {};
      bird.el = createHtmlElement(
        "li",
        "list-bird-name",
        "",
        answerListContainer
      );
      bird.isChecked = false;
      bird.check = createHtmlElement("span", "bird-name-check", "", bird.el);
      bird.name = createHtmlElement("span", "", item.name[this.lang], bird.el);
      bird.id = item.id;
      this.answerList.push(bird);

      bird.el.addEventListener("click", () => {
        this.observer.startEvents("checkAnswer", bird.id, bird.isChecked);
      });
    });

    // Details //////////////////////////////////////////////

    const birdsDetailsWrapper = createHtmlElement(
      "div",
      "birds-details-wrapper",
      "",
      answerWrapperRow
    );

    this.startDetails = createHtmlElement(
      "div",
      "start-details",
      "",
      birdsDetailsWrapper
    );

    this.firstInstuction = createHtmlElement(
      "p",
      "",
      this.dataLang.firstInstuction[this.lang],
      this.startDetails
    );
    this.secondInstuction = createHtmlElement(
      "p",
      "",
      this.dataLang.secondInstuction[this.lang],
      this.startDetails
    );

    this.birdDetail = createHtmlElement(
      "div",
      "detail-wrapper",
      "",
      birdsDetailsWrapper
    );
    this.birdDetail.style.display = "none";
    const birdDetailContainerRow = createHtmlElement(
      "div",
      "detail-container-row",
      "",
      this.birdDetail
    );
    const imgContainer = createHtmlElement(
      "div",
      "img-container",
      "",
      birdDetailContainerRow
    );
    this.image = createHtmlElement("img", "bird-img", "", imgContainer);
    const div = createHtmlElement(
      "div",
      "container-player",
      "",
      birdDetailContainerRow
    );
    this.name = createHtmlElement("p", "bird-name-detail", "", div);
    this.latinName = createHtmlElement("p", "bird-latine-name", "", div);
    div.append(this.player.playerContainer);
    this.description = createHtmlElement(
      "p",
      "bird-descriptions",
      "",
      this.birdDetail
    );

    // BUTTON NEXT /////////////////////////

    const scoreWrapper = createHtmlElement(
      "div",
      "score-wrapper",
      "",
      this.answerContainer
    );
    this.buttonNext = createHtmlElement(
      "div",
      "button button_disabled",
      this.dataLang.buttonNext[this.lang],
      scoreWrapper
    );
    const scoreContainer = createHtmlElement(
      "div",
      "scoreContainer",
      "",
      scoreWrapper
    );
    this.score = createHtmlElement(
      "p",
      "",
      `${this.dataLang.score[this.lang]}: `,
      scoreContainer
    );
    this.scoreNum = createHtmlElement("span", "scoreNum", "0", scoreContainer);
  }

  changeScore = (score) => {
    this.scoreNum.innerHTML = score;
  };

  changeLang = (lang) => {
    this.lang = lang;
    this.newList();
    if (this.dataDetails) {
      this.newLangDetails();
    }
    this.buttonNext.innerHTML = this.dataLang.buttonNext[this.lang];
    this.score.innerHTML = `${this.dataLang.score[this.lang]}: `;
    this.firstInstuction.innerHTML = this.dataLang.firstInstuction[this.lang];
    this.secondInstuction.innerHTML = this.dataLang.secondInstuction[this.lang];
  };

  newList = () => {
    this.answerList.forEach((bird) => {
      const data = this.data.find((el) => el.id === bird.id);
      bird.name.innerHTML = data.name[this.lang];
    });
    this.qustionsLinks.forEach((button, index) => {
      button.innerHTML = this.birdsData[index].questionsName[this.lang];
    });
  };

  newLangDetails = () => {
    this.name.innerHTML = this.dataDetails.name[this.lang];
    this.latinName.innerHTML = this.dataDetails.species;
    this.description.innerHTML = this.dataDetails.description[this.lang];
  };

  next = (index) => {
    this.index = index;
    this.startDetails.style.display = "";
    this.birdDetail.style.display = "none";
    this.data = this.birdsData[this.index].data;
    this.newList();
    this.newQustionsList();
  };

  newQustionsList = () => {
    this.qustionsLinks.forEach((button, index) => {
      button.classList.remove("qustion-button_past");
      if (index === this.index) {
        button.classList.add("qustion-button_active");
      } else {
        button.classList.remove("qustion-button_active");
        if (index < this.index) {
          button.classList.add("qustion-button_past");
        }
      }
      ;
    });
  }

  showDetails = (data) => {
    this.startDetails.style.display = "none";
    this.birdDetail.style.display = "";
    this.dataDetails = data;
    this.image.src = data.image;
    this.player.player.src = data.audio;
    this.newLangDetails();
  };

  addClassToBird = (id, className) => {
    this.answerList.forEach((bird) => {
      if (bird.id === id) {
        bird.isChecked = true;
        bird.check.classList.add(`bird-name-check_${className}`);
      }
    });
  };

  removeClassBird = () => {
    this.answerList.forEach((bird) => {
      bird.isChecked = false;
      bird.check.classList.remove("bird-name-check_false");
      bird.check.classList.remove("bird-name-check_true");
    });
  };

  setActiveNext = () => {
    this.buttonNext.classList.remove("button_disabled");
    this.buttonNext.addEventListener("click", this.goNext);
  };

  disableNext = () => {
    this.buttonNext.classList.add("button_disabled");
    this.buttonNext.removeEventListener("click", this.goNext);
  };

  goNext = () => {
    this.observer.startEvents("next");
    console.log("hi");
  };
}
