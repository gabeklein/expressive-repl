import * as Babel from '@babel/standalone';

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

  const { code } = Babel.transform(source, {
    filename: '/REPL.js',
    plugins: [
      "transform-react-jsx",
      "transform-modules-commonjs"
    ]
  });

  const run = new Function("require", "exports", "module", code!);
  const require = (name: string) => SANDBOX_MODULES[name];
  const module = { exports: {} };

  run(require, module.exports, module);

  return Object.values(module.exports)[0];
}