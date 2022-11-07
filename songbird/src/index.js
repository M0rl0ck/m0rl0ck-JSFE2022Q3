import Header from './script/components/header';
import Main from './script/components/main';
import Footer from './script/components/footer';
import Player from "./script/base/player";
import birdsData from "./script/data/constans/dataBird";

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

const header = new Header;
const main = new Main;
const footer = new Footer;
const player = new Player(birdsData[0][1].audio);
main.wrapper.append(player.playerContainer);