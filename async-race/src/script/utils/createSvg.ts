import svg from "../../assets/svg/sprite.svg";
import createHtmlElement from "./createElement";

const createSvg = (name: string, styleValue?: string) => {
  const el = createHtmlElement("div");
  let template = styleValue ? `<svg style="fill: ${styleValue}">` : '<svg>';
  template += `<use href="${svg}#${name}"></use>
                 </svg>`;
  el.innerHTML = template;
  return el;
};

export default createSvg;
