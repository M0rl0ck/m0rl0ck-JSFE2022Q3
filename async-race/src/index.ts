import App from './script/components/App';
import Footer from './script/components/Footer';
import Header from './script/components/Header';

const header = new Header;
const footer = new Footer;
const app = new App(header, footer);

app.start();
