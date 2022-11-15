import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import dataLang from "./data/dataLang";
import langList from "./data/constans/langList";
import observer from './base/observer';

let lang = localStorage.getItem("lang") ?? "Rus";
if (!langList.includes(lang)) {
  lang = "Rus";
}
const header = new Header(dataLang, lang, observer);
const main = new Main();
const footer = new Footer();

const wrapper = main.wrapper;

export { wrapper, lang };
