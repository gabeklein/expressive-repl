import Model, { get } from '@expressive/react';
import { Document } from 'editor/Document';

import { renderFactory } from './evaluate';

class Control extends Model {
  document = get(Document);
  error = "";
  key = get(this, $ => {
    return simpleHash($.document.source);
  });

  onError = (error: Error, info: any) => {
    this.error = error.toString();
    console.error(error);
  }

  Render = get(this, $ => {
    const { source } = $.document;

    try {
      this.error = "";
      return renderFactory(source);
    }
    catch(error){
      this.error = "Error while building preview.";
      console.error(error);
      return;
    }
  })
}

function simpleHash(from: string){
  let hash = 0;
  for(let i = 0; i < from.length; i++)
    hash = ((hash << 5) - hash) + from.charCodeAt(i);
  return hash;
}

export default Control;