import * as Babel from '@babel/standalone';
import * as Preset from '@expressive/babel-preset-react';

import * as REACT from 'react';
import * as CSS from '@expressive/css';
import * as MVC from '@expressive/react';

/** Imports shared with sandbox. */
const SANDBOX_MODULES: Record<string, any> = {
  "react": REACT,
  "@expressive/css": CSS,
  "@expressive/react": MVC
}

export function renderFactory(source: string){
  if(!source)
    return;

  const code = build(source);
  const module = evaluate(code as string);
  const exported = Object.values(module)[0];

  if(exported)
    return exported;
}

/** Generate eval-ready code from source. */
function build(source: string){
  const step1 = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Preset, {
        output: "jsx",
        hot: true
      }]
    ]
  });

  const step2 = Babel.transform(step1.code as string, {
    filename: '/REPL.js',
    plugins: [
      "transform-react-jsx",
      "transform-modules-commonjs"
    ]
  });

  return step2.code;
}

/** Evaluate string as a commonJS module. */
function evaluate(source: string){
  const run = new Function("require", "exports", "module", source);
  const require = (name: string) => SANDBOX_MODULES[name];
  const module = { exports: {} };

  try {
    run(require, module.exports, module);
  }
  catch(err){
    debugger
  }

  return module.exports as {};
}