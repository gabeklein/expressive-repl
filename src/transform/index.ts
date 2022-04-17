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
      [Expressive, {
        ...opts,
        hot: false
      }]
    ]
  });

  code = prettify(code);
  code = cleanup(code);

  return code;
}

/** Generate eval-ready code from source. */
export function build(source: string){
  let step1 = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Expressive, {
        output: "jsx",
        hot: true
      }]
    ]
  });

  const step2 = Babel.transform(step1.code, {
    filename: '/REPL.js',
    plugins: [
      "transform-react-jsx",
      "transform-modules-commonjs"
    ]
  });

  return step2.code;
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