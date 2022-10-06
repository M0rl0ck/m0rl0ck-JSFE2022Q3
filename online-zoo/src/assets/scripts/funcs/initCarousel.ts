import { carousel } from '../components/carousel'

function nextCarousel() {
  carousel.buttonPrev.removeEventListener("click", prevCarousel);
  carousel.buttonNext.removeEventListener("click", nextCarousel);
  carousel.current.classList.add("carousel__container_prev");
  carousel.next.classList.remove("carousel__container_next");
  carousel.current.addEventListener("transitionend", (e) => {
    const el = e.target as HTMLElement;
    if (el.classList.contains("carousel__container")) {
      carousel.createNext();
      carousel.buttonPrev.addEventListener("click", prevCarousel);
      carousel.buttonNext.addEventListener("click", nextCarousel);
    }
  });
}

function prevCarousel() {
  carousel.buttonPrev.removeEventListener("click", prevCarousel);
  carousel.buttonNext.removeEventListener("click", nextCarousel);
  carousel.current.classList.add("carousel__container_next");
  carousel.prev.classList.remove("carousel__container_prev");
  carousel.current.addEventListener("transitionend", (e) => {
    const el = e.target as HTMLElement;
    if (el.classList.contains("carousel__container")) {
      carousel.createPrev();
      carousel.buttonPrev.addEventListener("click", prevCarousel);
      carousel.buttonNext.addEventListener("click", nextCarousel);
    }
  });
}

export { nextCarousel, prevCarousel };