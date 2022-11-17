import { wrapper, lang } from "./script/app";
import birdsData from "./script/data/dataBird";
import dataLang from "./script/data/dataLang";
import Question from "./script/base/question";
import createHtmlElement from "./script/function/function";
import observer from './script/base/observer';
import Answer from './script/base/controlers/answer';
import start from './script/app';

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


// const question = new Question(birdsData[0][1], lang, observer);

// const answer = new Answer(birdsData[0], dataLang, lang, observer);

// wrapper.append(question.el);

// const button = createHtmlElement('button', '', 'show', wrapper);
// const button1 = createHtmlElement('button', '', 'next', wrapper);
// // const button2 = createHtmlElement('button', '', 'eng', main.wrapper);
// wrapper.append(answer.answerContainer);

// const show = () => {
//   question.show();
// }
// const showNext = () => {
//   question.next(birdsData[5][3]);
//   answer.next(birdsData[5])
// }

// button.addEventListener('click', show);
// button1.addEventListener('click', showNext);
// button2.addEventListener('click', changeLang);
start()
