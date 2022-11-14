import Header from './script/components/header';
import Main from './script/components/main';
import Footer from './script/components/footer';
import Player from "./script/base/player";
import birdsData from "./script/data/constans/dataBird";
import dataLang from "./script/data/constans/dataLang";
import Question from "./script/base/question";
import createHtmlElement from "./script/function/function";
import observer from './script/base/observer';
import Answer from './script/base/controlers/answer';

// function preload() {
//   birdsData.forEach(arr => {
//     arr.forEach(el => {
//       const audio = new Audio;
//       audio.src = el.audio;
//       const img = new Image;
//       img.src = el.image
//     })
//   })
// }

// preload();
let lang = 'Rus';
const header = new Header(dataLang, lang, observer);
const main = new Main;
const footer = new Footer;
const question = new Question(birdsData[0][1], lang, observer);

const answer = new Answer(birdsData[0], dataLang, lang, observer);

main.wrapper.append(question.el);

const button = createHtmlElement('button', '', 'show', main.wrapper);
const button1 = createHtmlElement('button', '', 'next', main.wrapper);
// const button2 = createHtmlElement('button', '', 'eng', main.wrapper);
main.wrapper.append(answer.answerContainer);
const showNext = () => {
  question.next(birdsData[5][3]);
  answer.next(birdsData[5])
}

button.addEventListener('click', question.show);
button1.addEventListener('click', showNext);
// button2.addEventListener('click', changeLang);
