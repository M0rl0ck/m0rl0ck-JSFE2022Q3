import { buttonStart } from "./scrpt/components/header";
import Field from './scrpt/base/field';


  const gameField = new Field(4);
  function start() {
  gameField.start();
}
buttonStart.addEventListener('click', start);
