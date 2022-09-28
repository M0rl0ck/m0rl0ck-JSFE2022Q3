const runge: HTMLInputElement = document.querySelector('.payRange');
const sum = document.querySelector('.rangeSum');
const options = document.querySelectorAll('.option');


function setRung(e: Event) {
  const el = e.target as HTMLOptionElement;
  
  if (el.classList.contains('option')) {
    runge.value = el.value;
    options.forEach((item) => {
      item.classList.remove('option_active');
    });
    el.classList.add('option_active');

  }
  
}

sum.addEventListener('click' ,setRung);

console.log(sum);