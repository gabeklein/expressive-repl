import * as Babel from '@babel/standalone';
import Expressive from '@expressive/babel-preset-react';

import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';

import cleanup from './cleanup';

export { compile as runtime, evalModule } from "./runtime";

export function compile(source: string, opts: any){
  let { code } = Babel.transform(source, {
    // ast: true,  
    filename: '/REPL.js',
    presets: [
      [Expressive, opts || {}]
    ]
  });

  code = Prettier.format(code, {
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

  code = cleanup(code);

  return code;
}