import createHtmlElement from '../function/function';

export default class Footer {
  constructor() {
    this.el = createHtmlElement('footer', 'footer', '', document.body);
    const wrapper = createHtmlElement('div', 'wrapper footer__wrapper', '', this.el);
    const git = createHtmlElement('a', 'footer__link git', '', wrapper);
    git.href = 'https://github.com/M0rl0ck';
    const data = createHtmlElement('p', 'data', '2022', wrapper);
    const rss = createHtmlElement('a', 'footer__link rss', '', wrapper);
    rss.href = 'https://rs.school/js/';
  }
}