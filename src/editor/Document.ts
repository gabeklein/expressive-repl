import Model, { set } from '@expressive/react';

const DEFAULT_CODE =
`export const Hi = () => {
  <this>Hello World!</this>
}`

export class Document extends Model {
  source = set(() => {
    const saved = localStorage.getItem("REPL:file");
    return saved || DEFAULT_CODE;
  });

  stale = false;
  error = "";
}