import App from './script/components/App';
import Footer from './script/components/Footer';
import Garage from './script/pages/Garage';
import Header from './script/components/Header';
import Winners from './script/pages/Winners';
import Controller from './script/pages/controllers/Controller';

const header = new Header;
const footer = new Footer;
const garage = new Garage;
const winners = new Winners;
const controller = new Controller(garage, winners);
const app = new App(header, footer, garage, winners, controller);

app.start();
