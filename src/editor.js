import { forwardRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';

import { REPL } from './control';

function sqlSyntax(code){
  return highlight(code, {
    ...languages.jsx,

    'hex': {
      pattern: /shadow/,
      greedy: false,

    },
    'label': {
      pattern: /[A-Za-z_]+:/,
      greedy: true
    }
  });
}

export const EditSource = forwardRef((_, ref) => do {
  const { source, fontSize, set } = REPL.tap();
  const [ code, updateDisplay ] = useState(source);

  + ref;

  Editor, do {
    forward: className;
    fontSize: `${fontSize}px`;
    fontFamily: "Fira Mono"
    outline: none;
    lineHeight: 1.3
    marginH: 10;
    size: fill;

    value = code;
    highlight = sqlSyntax;
    onValueChange = (code) => {
      updateDisplay(code);
      set.source = code;
    }
  }
})

export const Output = () => do {
  const { output, fontSize } = REPL.tap();

  Editor, do {
    forward: className;
    fontSize: `${fontSize}px`;
    fontFamily: "Fira Mono"
    outline: none;
    lineHeight: 1.3
    marginH: 10;
    size: fill;

    value = output;
    highlight = sqlSyntax;
  }
}