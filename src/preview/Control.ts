import Model, { get } from '@expressive/react';
import { Document } from 'editor/Document';

import { renderFactory } from './evaluate';

class Control extends Model {
  doc = get(Document);
  error = "";
  key = get(this, $ => {
    return simpleHash($.doc.input_jsx);
  });

  onError = (error: Error, info: any) => {
    this.error = error.toString();
    console.error(error);
  }

  component = get(this, $ => {
    const { output_js } = $.doc;

    try {
      this.error = "";
      return renderFactory(output_js);
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