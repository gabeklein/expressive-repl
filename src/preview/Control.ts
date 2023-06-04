import Model, { get } from '@expressive/react';

import { Document } from '../editor/Document';
import { renderFactory } from './evaluate';

class Control extends Model {
  document = get(Document);
  error = "";

  Render = get(this, $ => {
    const { source } = $.document;

    try {
      return renderFactory(source);
    }
    catch(error){
      this.error = "Error while building preview.";
      console.error(error);
      return;
    }
  })
}

export default Control;