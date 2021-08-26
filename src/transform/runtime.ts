import * as Babel from '@babel/standalone';
import Expressive from '@expressive/babel-preset-react';

const Sandbox = {
  "react": require("react"),
  "@expressive/css": require("@expressive/css"),
  "@expressive/mvc": require("@expressive/mvc")
}

export function compile(source: string){
  let compiled = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Expressive, { output: "js", hot: true }],
      "env"
    ]
  });

  return compiled.code;
}

export function evalModule(code: string){
  const module = { exports: {} };
  const evaluate = new Function("require", "exports", "module", code);
  const require = (name: string) => Sandbox[name];

  evaluate(require, module.exports, module);

  return module.exports;
}