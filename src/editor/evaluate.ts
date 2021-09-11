import React from "react";

/** Imports shared with sandbox. */
const Sandbox = {
  "react": require("react"),
  "@expressive/css": require("@expressive/css"),
  "@expressive/mvc": require("@expressive/mvc")
}

/** Evaluate string as a commonJS module. */
export function evaluate(source: string){
  const module = { exports: {} };
  const require = (name: string) => Sandbox[name];

  new Function("require", "exports", "module", source)
    (require, module.exports, module);

  return module.exports as {};
}

export function extractComponent(source: string){
  const module = evaluate(source);
  let FC = Object.values(module)[0];

  if(typeof FC !== "function")
    FC = undefined;

  return FC as React.FC<{}>;
}