import { buttonStart } from "./scrpt/components/header";
import gameField from './scrpt/base/field';

  function start() {
  gameField.start();
}
buttonStart.addEventListener('click', start);
