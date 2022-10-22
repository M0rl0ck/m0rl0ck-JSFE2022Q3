import { buttonStart } from "./scrpt/components/header";
import Field from './scrpt/base/field';


  const gameField = new Field(3);
  function start() {
  gameField.start();
}
buttonStart.addEventListener('click', start);
