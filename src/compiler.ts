import { transform } from "@babel/standalone"
import Controller from "deep-state";

// const BabelPresetReact = require("@babel/preset-react");
const ExpressivePresetReact = require("@expressive/babel-preset-react");

const source = `const EditInfo = () => do {
  const { source, set } = Compiler.use();

  padding: 20, 30;
  bg: white;
  shadow: 0x06, 5, 2;
  border: 0x1;
  margin: 10;
  radius: 20;

  EditSource, do {
    value = source
    onChanged = v => set.source = v

    padding: 24, 30;
    radius: 10;
    bg: 0x07;
    font: 16;
    border: 0x1;
  }
}
`

// const source = `
// function hello(){
//   return (
//     <div>
//       HELLO WORLD
//     </div>
//   );
// }
// `

export class Compiler extends Controller { 
  fontSize = 12;
  source = source;
  output="";
  err = "";

  tryToCompile = () => {
    try {
      const result = transform(this.source, {
        presets: [
          // "env",
          "react",
          ExpressivePresetReact
        ],
        filename: '/REPL.js'
      }).code;
      this.err = "";
      this.output = result;
      return result;
    } catch (e) {
      console.error(e.message)
      this.err = e.message;
    }
  }
}