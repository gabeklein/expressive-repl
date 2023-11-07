import * as Babel from '@babel/standalone';
import * as Preset from '@expressive/babel-preset-react';
import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';

/** Generate preview JSX code from source. */
export function transform(source: string, opts = {}){
  let { code } = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Preset, {
        ...opts,
        hot: false
      }]
    ]
  });

  if(!code)  
    throw new Error("Failed to transform source.");

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

export function transformPretty(input: string){
  let css = "";
  const jsx = transform(input, {
    output: "jsx",
    cssModule: false,
    printStyle: "pretty",
    extractCss: (text: string) => {
      css = text;
    }
  });

  return { jsx, css };
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