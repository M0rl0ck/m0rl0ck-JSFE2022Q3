import {
  hamburger,
  shadowNav,
  openMenu,
} from "../../assets/scripts/base/hamburger";
import { carousel } from "../../assets/scripts/components/carousel";
import testimonials from '../../assets/scripts/components/TestimonialsCarousel';
import { nextCarousel, prevCarousel } from '../../assets/scripts/funcs/initCarousel'


carousel.init();
testimonials.init();

carousel.buttonPrev.addEventListener("click", prevCarousel);
carousel.buttonNext.addEventListener("click", nextCarousel);
hamburger.addEventListener("click", openMenu);
shadowNav.addEventListener("click", openMenu);
