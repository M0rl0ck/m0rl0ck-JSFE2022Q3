import { hamburger,shadowNav, openMenu } from '../../assets/scripts/base/hamburger';
import {editeRang} from '../../assets/scripts/funcs/initeDonateRang'

editeRang();
hamburger.addEventListener('click', openMenu);
shadowNav.addEventListener('click', openMenu);

