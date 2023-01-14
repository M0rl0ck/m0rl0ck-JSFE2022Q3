import createHtmlElement from '../utils/createElement';
import createSvg from '../utils/createSvg';

export default class Footer {
  footer: HTMLElement;

  constructor() {
    this.footer = createHtmlElement('footer', 'footer');
    const footerContainer = createHtmlElement('div', 'footer__container', '', this.footer);
    footerContainer.append(this.createLinkBlock("https://github.com/M0rl0ck", 'github', '<p>Sergey Sergeev</p>'));
    footerContainer.append(this.createLinkBlock("https://rs.school/js/", 'logoRss'));
  }

  private createLinkBlock = (linkName: string, name: string, title = '') => {
    const container = createHtmlElement('div', 'footer__link');
    const link = createHtmlElement('a', '', '', container) as HTMLLinkElement;
    link.href = linkName;
    link.innerHTML = `${title}${createSvg(name)}`;
    return container;
  }

  render = () => this.footer;
}