import { curentWithType } from "../../scripts/infostructure/type";
import {
  DESKTOPWITH,
  TABLETWITH,
} from "../../scripts/infostructure/constans";

const range: HTMLInputElement = document.querySelector(".payRange") as HTMLInputElement;
const sum = document.querySelector(".rangeSum") as HTMLElement;
const options: NodeListOf<HTMLOptionElement> = sum.querySelectorAll(".option");
const inputNumber: HTMLInputElement = document.querySelector(".input__num") as HTMLInputElement;

let curentWith: curentWithType = "max";

function setActiveLable(value: string) {
  options.forEach((item) => {
    if (item.value === value) {
      item.classList.add("option_active");
      inputNumber.value = item.label.slice(1);
    } else {
      item.classList.remove("option_active");
    }
  });
}

function editeRang(): void {
  let screnWith = window.innerWidth;
  if (screnWith > DESKTOPWITH && curentWith != "max") {
    range.setAttribute("min", "1");
    curentWith = "max";
  } else if (screnWith <= TABLETWITH && curentWith != "min") {
    if (range.value < '4') {
      range.value = '4';
      inputNumber.value = Array.from(options).find(el => el.value === range.value).label.slice(1)
      setActiveLable(range.value);
    }
    range.setAttribute("min", "4");
    curentWith = "min";
  } else if (
    screnWith > TABLETWITH &&
    screnWith <= DESKTOPWITH &&
    curentWith != "medium"
  ) {
    if (range.value === '1') {
      range.value = '2';
      inputNumber.value = Array.from(options).find(el => el.value === range.value).label.slice(1);
      setActiveLable(range.value);
    }
    range.setAttribute("min", "2");
    curentWith = "medium";
  }
}

function setRang(e: Event): void {
  const el = e.target as HTMLOptionElement;

  if (el.classList.contains("option")) {
    range.value = el.value;
    inputNumber.value = el.label.slice(1);
    options.forEach((item) => {
      item.classList.remove("option_active");
    });
    el.classList.add("option_active");
  }
}

function setLableRang(e: Event): void {
  const el = e.target as HTMLElement;
  if (el.classList.contains("payRange")) {
    const value = range.value;
    setActiveLable(value);
  }
}

function changeInputNumber(e: Event) {
  const el = e.target as HTMLInputElement;
  options.forEach((input) => {
    if (input.label.slice(1) === el.value) {
      options.forEach((item) => {
        item.classList.remove("option_active");
      });
      input.classList.add("option_active");
      range.value = input.value;
    }
  });
}

window.addEventListener(`resize`, editeRang);
inputNumber.addEventListener('input', changeInputNumber)
sum.addEventListener('click', setRang);
range.addEventListener('input', setLableRang);

export {editeRang}