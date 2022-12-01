import './sources.css';
import { sources, err, html } from '../../../type/interface';

class Sources {
  public draw(data: sources[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    if (!sourceItemTemp) {
      throw new Error(err.notEllement);
    }

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
if (!(sourceClone instanceof DocumentFragment)) {
  throw new Error(err.notEllement);
}
      const sourceItemName: html = sourceClone.querySelector('.source__item-name');
      if (sourceItemName) {
        sourceItemName.textContent = item.name;
      } else {
        throw new Error(err.notEllement);
      }
      
      const sourceItem: html = sourceClone.querySelector('.source__item');
      if (sourceItem) {
        sourceItem.setAttribute('data-source-id', item.id);
      } else {
        throw new Error(err.notEllement);
      }
      

      fragment.append(sourceClone);
    });

    const sourcesDoc = document.querySelector('.sources');
    if (sourcesDoc) sourcesDoc.append(fragment);
    else {
      throw new Error(err.notEllement);
    }
    
  }
}

export default Sources;
