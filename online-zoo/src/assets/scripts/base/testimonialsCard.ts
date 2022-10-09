import { createHtmlElement } from "../funcs/function";
import ITestimonialsCard from "../infostructure/interfaces/ITestimonialsCard";

export default function createTestimonialsCard(
  data: ITestimonialsCard
): HTMLElement {
  const template = `
  <div class="testimonials__card_content">
    <div class="testimonials__card__header">
      <div class="testimonials__card__ico">
        <img src="../../assets/foto/${data.icon}" alt="${
    data.name.split(" ")[0]
  }" />
      </div>
      <div class="testimonials__card__title">
        <h5>${data.name}</h5>
        <p>Local ${data.location} <span>•</span> ${data.time}</p>
      </div>
    </div>
    <div class="testimonials__card__text">
      <p>
          ${data.text}
      </p>
    </div>
  </div>
  `;
  const card = createHtmlElement('div', 'testimonials__card_border', template);
  card.setAttribute('id', `${data.id}`)
  return card;
}
