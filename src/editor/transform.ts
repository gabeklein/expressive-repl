import * as Babel from '@babel/standalone';
import * as Preset from '@expressive/babel-preset-react';
import * as CSS from '@expressive/css';
import * as MVC from '@expressive/react';
import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';
import React, * as REACT from 'react';

/** Imports shared with sandbox. */
const SANDBOX_MODULES: Record<string, any> = {
  "react": REACT,
  "@expressive/css": CSS,
  "@expressive/react": MVC
}

export function evaluate(output_jsx: string){
  if(!output_jsx)
    return;

  const { code } = Babel.transform(output_jsx, {
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

  return Object.values(module.exports)[0] as React.FC;
}

/** Generate preview JSX code from source. */
export function transform(input_jsx: string){
  let css = "";

  let { code } = Babel.transform(input_jsx, {
    filename: '/REPL.js',
    presets: [
      [Preset, {
        hot: false,
        output: "jsx",
        cssModule: false,
        printStyle: "pretty",
        extractCss: (text: string) => {
          css = text;
        }
      }]
    ]
  });

  if(!code)  
    throw new Error("Failed to transform source.");

  return {
    jsx: code,
    css
  };
}

export function prettify(output_jsx: string){
  try {
    output_jsx = Prettier.format(output_jsx, {
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

    return Object
      .values(transforms)
      .reduce((x, fx) => fx(x), output_jsx);
  }
  catch(err){
    throw new Error("Failed to prettify source.");
  }
}

const transforms: Record<string, (x: string) => string> = {
  statementLineSpacing: (x: string) =>
    x.replace(/^(.+?)\n(export|const|let)/gm, "$1\n\n$2"),

  jsxReturnSpacing: (x: string) =>
    x.replace(/^(.+?[^{])\n(\s+return (?=\(|<))/gm, "$1\n\n$2"),

  removeDoubleLines: (x: string) =>
    x.replace(/\n{3,}/g, "\n\n"),

  spaceOutBlocks: (x: string) =>
    x.replace(/([\t \r]*\n)([\)\}\]]+;?)([\t \r]*\n{1})(\s*[^\ni])/g, "$1$2$3\n$4"),

  spaceAfterImports: (x: string) =>
    x.replace(/(from ".+";?)([\t \r]*\n)([^\ni])/g, "$1$2\n$3"),

  tabCharactersMustDie: (x: string) =>
    x.replace(/\t/g, "  "),

  compactStylesInclude: (x: string) =>
    x.replace(/Styles\.include\(\n\s+`\n([^`]+)[^;]+;/g, "Styles.include(`\n$1`);"),

  ensureSpaceBeforeCSS: (x: string) =>
    x.replace(/(\n[\S\t ]+\n)(CSS\.put)/, "$1\n$2"),

  removeTrailingline: (x: string) =>
    x.replace(/\n$/, "")
};

export function hash(from: string){
  let hash = 0;
  for(let i = 0; i < from.length; i++)
    hash = ((hash << 5) - hash) + from.charCodeAt(i);
  return hash;
}
