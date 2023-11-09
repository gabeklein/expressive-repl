import Model, { get } from '@expressive/react';
import { Document } from 'editor/Document';

class Control extends Model {
  doc = get(Document);
  key = get(this, $ => simpleHash($.doc.input));
  error = "";

  onError = (error: Error) => {
    this.error = error.toString();
    console.error(error);
  }
}

function simpleHash(from: string){
  let hash = 0;
  for(let i = 0; i < from.length; i++)
    hash = ((hash << 5) - hash) + from.charCodeAt(i);
  return hash;
}

export default Control;