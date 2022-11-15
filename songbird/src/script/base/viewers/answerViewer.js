import createHtmlElement from "../../function/function";

export default class AnswerViewer {
  constructor(data, dataLang, lang, player, observer) {
    this.data = data;
    this.dataLang = dataLang;
    this.dataDetails = "";
    this.lang = lang;
    this.player = player;
    this.observer = observer;
    this.answerContainer = createHtmlElement("div", "answer-container");
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
      createHtmlElement("span", "bird-name-check", "", bird.el);
      bird.name = createHtmlElement("span", "", item.name[this.lang], bird.el);
      bird.id = item.id;
      this.answerList.push(bird);

      bird.el.addEventListener("click", () => {
        this.observer.startEvents("showDetails", bird.id);
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

    // this.startDetails.style.display = 'none';

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
  };

  newLangDetails = () => {
    this.name.innerHTML = this.dataDetails.name[this.lang];
    this.latinName.innerHTML = this.dataDetails.species;
    this.description.innerHTML = this.dataDetails.description[this.lang];
  };

  next = (data) => {
    this.startDetails.style.display = "";
    this.birdDetail.style.display = "none";
    this.data = data;
    this.newList();
  };

  showDetails = (data) => {
    this.startDetails.style.display = "none";
    this.birdDetail.style.display = "";
    this.dataDetails = data;
    this.image.src = data.image;
    this.player.player.src = data.audio;
    this.newLangDetails();
  };
}
