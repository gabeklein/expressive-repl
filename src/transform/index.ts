import * as Babel from '@babel/standalone';
import Expressive from '@expressive/babel-preset-react';
import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';

import cleanup from './cleanup';

/** Imports shared with sandbox. */
const Sandbox = {
  "react": require("react"),
  "@expressive/css": require("@expressive/css"),
  "@expressive/mvc": require("@expressive/mvc")
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

/** Evaluate string as a commonJS module. */
export function evaluate(code: string){
  const module = { exports: {} };
  const require = (name: string) => Sandbox[name];

  new Function("require", "exports", "module", code)
    (require, module.exports, module);

  return module.exports as {};
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