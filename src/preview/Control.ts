import Model, { get } from '@expressive/react';

import { REPL } from '../editor';
import { renderFactory } from './evaluate';

class Control extends Model {
  parent = get(REPL);
  error = "";

  Render = get(this, $ => {
    const { source } = $.parent.document;

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