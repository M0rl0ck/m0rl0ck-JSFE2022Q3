import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import dataLang from "./data/dataLang";
import langList from "./data/constans/langList";
import observer from "./base/observer";
import Game from "./components/controlers/game";

let lang = localStorage.getItem("lang") ?? "Rus";
if (!langList.includes(lang)) {
  lang = "Rus";
}

const start = () => {
  const header = new Header(dataLang, lang, observer);
  const main = new Main();
  const footer = new Footer();

  const wrapper = main.wrapper;

  const game = new Game(lang, observer);

  wrapper.append(game.container)
};
export default start;