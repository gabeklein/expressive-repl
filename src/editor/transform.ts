import * as Babel from '@babel/standalone';
import Expressive from '@expressive/babel-preset-react';
import parserBabel from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';

/** Generate preview JSX code from source. */
export function transform(source: string, opts = {}){
  const result = Babel.transform(source, {
    filename: '/REPL.js',
    presets: [
      [Expressive, {
        ...opts,
        hot: false 
      }]
    ]
  });

  return transforms.reduce(
    (code, fix) => fix(code),
    result.code!
  );
}

function applyPrettier(source: string){
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
  applyPrettier,
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