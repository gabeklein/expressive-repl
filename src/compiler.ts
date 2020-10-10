import { transform } from "@babel/standalone"
import parserBabel from "prettier/parser-babel";
import Prettier from "prettier/standalone"

import Controller from "deep-state";

const ExpressivePresetReact = require("@expressive/babel-preset-react");

export class Compiler extends Controller { 
  fontSize = 12;
  source = "";
  output = "";
  err = "";

  tryToCompile = () => {
    try {
      this.output = compile(this.source, {
        output: "jsx",
        printStyle: "pretty",
        // styleMode: "compile",
        // useImport: false
      });
      this.err = "";
    } catch (e) {
      console.error(e.message)
      this.err = e.message;
      throw e;
    }
  }
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

function compile(source: string, opts = {}){
  let { code } = transform(source, {
    filename: '/REPL.js',
    presets: [
      [ExpressivePresetReact, opts]
    ]
  });

  code = Prettier.format(code, { 
    parser: "babel",
    plugins: [ parserBabel ],
    singleQuote: false, 
    trailingComma: "none", 
    jsxBracketSameLine: true,
    tabWidth: 2,
    printWidth: 60
  });

  for(const mod of [
    statementLineSpacing,
    jsxReturnSpacing,
    spaceOutBlocks,
    spaceAfterImports,
    removeDoubleLines,
    tabCharactersMustDie,
    compactStylesInclude
  ])
    code = mod(code);
  
  return code;
}