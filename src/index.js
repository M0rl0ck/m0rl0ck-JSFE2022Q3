import { buttonStart } from "./scrpt/components/header";
import { timer } from './scrpt/components/main';

buttonStart.addEventListener('click', () => {timer.textContent = '10:20'});
