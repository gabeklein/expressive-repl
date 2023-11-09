import * as Babel from '@babel/standalone';
import * as Preset from '@expressive/babel-preset-react';
import * as CSS from '@expressive/css';
import * as MVC from '@expressive/react';
import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';
import * as REACT from 'react';

/** Imports shared with sandbox. */
const SANDBOX_MODULES: Record<string, any> = {
  "react": REACT,
  "@expressive/css": CSS,
  "@expressive/react": MVC
}

export function evaluate(source: string){
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

/** Generate preview JSX code from source. */
export function transform(input: string){
  let css = "";

  let { code } = Babel.transform(input, {
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

export function hash(from: string){
  let hash = 0;
  for(let i = 0; i < from.length; i++)
    hash = ((hash << 5) - hash) + from.charCodeAt(i);
  return hash;
}

export function prettify(code: string){
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

  for(const fix of transforms)
    code = fix(code);

  return code;
}

const statementLineSpacing = (x: string) =>
  x.replace(/^(.+?)\n(export|const|let)/gm, "$1\n\n$2")

const jsxReturnSpacing = (x: string) =>
  x.replace(/^(.+?[^{])\n(\s+return (?=\(|<))/gm, "$1\n\n$2")

const removeDoubleLines = (x: string) =>
  x.replace(/\n{3,}/g, "\n\n")

const spaceOutBlocks = (x: string) =>
  x.replace(/([\t \r]*\n)([\)\}\]]+;?)([\t \r]*\n{1})(\s*[^\ni])/g, "$1$2$3\n$4")

const spaceAfterImports = (x: string) =>
  x.replace(/(from ".+";?)([\t \r]*\n)([^\ni])/g, "$1$2\n$3")

const tabCharactersMustDie = (x: string) =>
  x.replace(/\t/g, "  ")

const compactStylesInclude = (x: string) =>
  x.replace(/Styles\.include\(\n\s+`\n([^`]+)[^;]+;/g, "Styles.include(`\n$1`);")

const ensureSpaceBeforeCSS = (x: string) =>
  x.replace(/(\n[\S\t ]+\n)(CSS\.put)/, "$1\n$2")

const removeTrailingline = (x: string) =>
  x.replace(/\n$/, "")

const transforms = [
  statementLineSpacing,
  jsxReturnSpacing,
  spaceOutBlocks,
  spaceAfterImports,
  removeDoubleLines,
  tabCharactersMustDie,
  compactStylesInclude,
  ensureSpaceBeforeCSS,
  removeTrailingline
];