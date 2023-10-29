import { get } from '@expressive/react';
import { Editor, jsx, readOnly } from 'codemirror/Editor';

import { Document } from './Document';

export class OutputView extends Editor {
  doc = get(Document);

  extends(){
    return [
      jsx,
      readOnly
    ];
  }
  
  onReady(){
    return this.doc.get(current => {
      this.text = current.output_js;
    });
  }
}
