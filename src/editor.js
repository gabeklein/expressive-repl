import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';

import { Compiler } from './compiler';

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

export const EditSource = () => do {
  const { source, update, fontSize } = Compiler.tap();
  const [ code, setCode ] = useState(source);

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
      setCode(code);
      update('source', code);
    }
  }
}

export const Output = () => do {
  const { output, fontSize } = Compiler.tap();

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