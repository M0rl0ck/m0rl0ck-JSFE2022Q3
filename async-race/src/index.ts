import App from './script/components/App';
import Footer from './script/components/Footer';
import Garage from './script/pages/Garage';
import Header from './script/components/Header';
import Winners from './script/pages/Winners';

const header = new Header;
const footer = new Footer;
const garage = new Garage;
const winners = new Winners;
const app = new App(header, footer, garage, winners);

app.start();
