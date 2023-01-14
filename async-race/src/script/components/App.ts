import createHtmlElement from '../utils/createElement';
import Footer from './Footer';
import Header from './Header';
import { PageName } from '../infostructure/types';

export default class App {
  header: Header;

  main: HTMLElement;

  footer: Footer;

  constructor(header: Header, footer: Footer) {
    this.header = header;
    this.main = createHtmlElement('main', 'main');
    this.footer = footer;
    this.header.on('chagePage', (data) => this.changePage(data));
  }

  private changePage = (page: PageName) => {
    this.header.setButton(page);
  }

  start = () => {
    document.body.append(this.header.render(), this.main, this.footer.render())
  }
}