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

const transforms = [
  statementLineSpacing,
  jsxReturnSpacing,
  spaceOutBlocks,
  spaceAfterImports,
  removeDoubleLines,
  tabCharactersMustDie,
  compactStylesInclude
];

function reformat(code: string){
  for(const op of transforms)
    code = op(code);
  
  return code;
}

export default reformat;