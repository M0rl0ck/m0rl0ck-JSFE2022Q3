const range: HTMLInputElement = document.querySelector('.payRange');
const sum = document.querySelector('.rangeSum');
const options: NodeListOf<HTMLOptionElement> = sum.querySelectorAll('.option');
const inputNumber: HTMLInputElement = document.querySelector('.input__num'); 


function setRang(e: Event) {
  const el = e.target as HTMLOptionElement;
  
  if (el.classList.contains('option')) {
    range.value = el.value;
    inputNumber.value = el.label.slice(1);
    options.forEach((item) => {
      item.classList.remove('option_active');
    });
    el.classList.add('option_active');
  }
}
  function setLableRang(e: Event) {
    const el = e.target as HTMLElement;
    if (el.classList.contains('payRange')) {
    const value = range.value;
    options.forEach((item) => {
      if (item.value === value) {
        item.classList.add('option_active');
        inputNumber.value = item.label.slice(1);
      } else {
        item.classList.remove('option_active');
      }
    });
  }
  }
  


sum.addEventListener('click', setRang);
range.addEventListener('click', setLableRang )
