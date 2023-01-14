import createHtmlElement from '../utils/createElement';
import Footer from './Footer';
import Header from './Header';
import { PageName } from '../infostructure/types';
import Garage from '../pages/Garage';
import Winners from '../pages/Winners';

type HeaderType = InstanceType<typeof Header>;
type FooterType = InstanceType<typeof Footer>;
type GarageType = InstanceType<typeof Garage>;
type WinnersType = InstanceType<typeof Winners>;

export default class App {
  header: Header;

  main: HTMLElement;

  footer: Footer;

  garage: Garage;

  winners: Winners;

  constructor(header: HeaderType, footer: FooterType, garage: GarageType, winners: WinnersType) {
    this.header = header;
    this.main = createHtmlElement('main', 'main');
    this.footer = footer;
    this.header.on('chagePage', (data) => this.changePage(data));
    this.garage = garage;
    this.winners = winners;
    this.main.appendChild(this.garage.render());
  }

  private changePage = (page: PageName) => {
    this.header.setButton(page);
    this.main.innerHTML = '';
    this.main.appendChild(page === 'garage' ? this.garage.render() : this.winners.render());
  }

  start = () => {
    document.body.append(this.header.render(), this.main, this.footer.render())
  }
}