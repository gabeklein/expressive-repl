import Model, { from, tap } from '@expressive/mvc';

import { REPL } from '../editor';
import { renderFactory } from './evaluate';

class Control extends Model {
  parent = tap(REPL);
  error = "";

  Render = from(this, $ => {
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