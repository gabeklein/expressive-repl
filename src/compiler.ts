import { transform } from "@babel/standalone"
import parserBabel from "prettier/parser-babel";
import Prettier from "prettier/standalone"

import { Singleton, ref } from "deep-state";

const ExpressivePresetReact = require("@expressive/babel-preset-react");

export class Compiler extends Singleton { 
  source = "const Hello = () => 'Hello World'";
  output = "";
  fontSize = 12;
  err = "";

  sourceContainer = ref(elem => {
    const handle = this.keyPress;
    elem.addEventListener("keydown", handle);
    () => elem.removeEventListener("keydown", handle);
  });

  keyPress = (e: KeyboardEvent) => {
    const { metaKey, code, key } = e;

    if(key == "Meta" || !metaKey)
      return;

    let prevent = true;

    switch(key){
      case "s":
        this.tryToCompile();
      break;

      case "=":
        this.fontSize++;
      break;

      case "-":
        this.fontSize--;
      break;
      
      default:
        prevent = false;
    }

    if(prevent)
      e.preventDefault();
  }

  tryToCompile = () => {
    try {
      this.output = this.compile();
      this.err = "";
    } catch (e) {
      console.error(e.message)
      this.err = e.message;
      throw e;
    }
  }

  compile(){
    return compile(this.source, {
      output: "jsx",
      printStyle: "pretty",
      // styleMode: "compile",
      // useImport: false
    });
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
  let output = transform(source, {
    // ast: true,  
    filename: '/REPL.js',
    presets: [
      [ExpressivePresetReact, opts]
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