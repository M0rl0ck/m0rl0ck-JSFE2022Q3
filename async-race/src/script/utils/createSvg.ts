import svg from '../../assets/svg/sprite.svg';

const createSvg = (name: string) => `
  <svg> 
     <use xlink:href="${svg}#${name}"></use>
  </svg>`

export default createSvg;