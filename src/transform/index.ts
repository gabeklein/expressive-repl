import * as Babel from '@babel/standalone';
import Expressive from '@expressive/babel-preset-react';
import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';

import cleanup from './cleanup';

/** Generate preview JSX code from source. */
export function transform(source: string, opts = {}){
  let { code } = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Expressive, opts]
    ]
  });

  code = prettify(code);
  code = cleanup(code);

  return code;
}

/** Generate eval-ready code from source. */
export function build(source: string){
  let { code } = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Expressive, { output: "js", hot: true }],
      "react",
      "env"
    ]
  });

  return code;
}

function prettify(source: string){
  return Prettier.format(source, {
    // fake parser! returns AST we have
    // parser: () => output.ast,
    parser: "babel",
    plugins: [ parserBabel ],
    singleQuote: false, 
    trailingComma: "none", 
    jsxBracketSameLine: true,
    tabWidth: 2,
    printWidth: 60
  });
}