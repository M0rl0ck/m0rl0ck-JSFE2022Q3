import { createHtmlElement } from "../funcs/function";
import IPetCard from "../infostructure/interfaces/IPetCard";

export default function createPetCard(pet: IPetCard): HTMLElement {
  const template = `
    <div class="container__cart">
      <div class="pet__foto">
        <img src="${pet.image}" alt="${pet.name}" />
        <div class="pet__foto__title">
          <div class="pet__text">
            <h4>${pet.name}</h4>
            <p>${pet.location}</p>
          </div>
        </div>
      </div>
      <div class="pet__title">
        <div class="pet__text">
          <h4>${pet.name}</h4>
          <p>${pet.location}</p>
        </div>
        <div class="pet__food__ico">
          <svg class="${pet.iconClass}">
            <use
              href="${pet.icon}"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
      `;
  const petCard = createHtmlElement("div", "cart__border", template);
  return petCard;
}
