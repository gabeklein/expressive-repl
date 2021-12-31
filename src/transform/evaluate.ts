/** Imports shared with sandbox. */
const Sandbox = {
  "react": require("react"),
  "@expressive/css": require("@expressive/css"),
  "@expressive/mvc": require("@expressive/mvc")
}

/** Evaluate string as a commonJS module. */
export function evaluate(source: string){
  const run = new Function("require", "exports", "module", source);
  const module = { exports: {} };
  const require = (name: string) => Sandbox[name];

  run(require, module.exports, module);

  return module.exports as {};
}