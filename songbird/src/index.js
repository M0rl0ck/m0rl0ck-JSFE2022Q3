import Header from './script/components/header';
import Main from './script/components/main';
import Footer from './script/components/footer';
import Player from "./script/base/player";
import birdsData from "./script/data/constans/dataBird";
import dataLang from "./script/data/constans/dataLang";
import Question from "./script/base/question";
import createHtmlElement from "./script/function/function";
import observer from './script/base/observer';

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
const player = new Player(observer);
player.player.src = birdsData[4][2].audio;

main.wrapper.append(question.el);
main.wrapper.append(player.playerContainer);
const button = createHtmlElement('button', '', 'show', main.wrapper);
const button1 = createHtmlElement('button', '', 'next', main.wrapper);
// const button2 = createHtmlElement('button', '', 'eng', main.wrapper);

const showNext = () => {
  question.next(birdsData[5][3]);
}

button.addEventListener('click', question.show);
button1.addEventListener('click', showNext);
// button2.addEventListener('click', changeLang);
