import * as babel from "@babel/standalone";
import parserBabel from "prettier/parser-babel";
import Prettier from "prettier/standalone";

import * as PresetReact from "@expressive/babel-preset-react";

export function compile(source: string, opts = {}){
  let output = babel.transform(source, {
    // ast: true,  
    filename: '/REPL.js',
    presets: [
      [PresetReact, opts]
    ]
  });

  let code = Prettier.format(output.code, {
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

  const codeFormat = [
    statementLineSpacing,
    jsxReturnSpacing,
    spaceOutBlocks,
    spaceAfterImports,
    removeDoubleLines,
    tabCharactersMustDie,
    compactStylesInclude
  ];

  for(const regex of codeFormat)
    code = regex(code);
  
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
  x.replace(/(from ".+";?)([\t \r]*\n)([^\ni])/g, "$1$2\n$3");

const tabCharactersMustDie = (x: string) =>
  x.replace(/\t/g, "  ");

const compactStylesInclude = (x: string) =>
  x.replace(/Styles\.include\(\n\s+`\n([^`]+)[^;]+;/g, "Styles.include(`\n$1`);")