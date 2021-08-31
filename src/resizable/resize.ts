import { createElement } from "react";
import { Window } from "./control";

export function createSeparator(
  component: any,
  target: Window,
  key: number,
  direction: "row" | "column"){

  let unSet: () => void;

  function ref(value: any){
    if(typeof unSet == "function")
      unSet();
    if(value)
      unSet = manageResize.call(target, key, value);
  }

  return createElement(component, { direction, ref, key });
}

function manageResize(
  this: Window, index: number, e: HTMLElement){

  let cursor: readonly [number, number];
  const row = this.direction == "row";

  const diff = (current: typeof cursor) =>
    current.map((n, i) => n - cursor[i]);

  const resize = is((e: any) => {
    const current = [e.x, e.y] as const;
    const offset = diff(current)[row ? 0 : 1];

    const prior = (index - 1) / 2;
    const after = prior + 1; 

    this.space[prior] += offset;
    this.space[after] -= offset;

    this.setLayout();
    cursor = current;
  })
  
  const beginResize = is((e: any) => {
    if(e.button !== 0)
      return;

    const { space, container } = this;
    const rect = container.current!.getBoundingClientRect();
    const max = rect[row ? "width" : "height"];

    const currentSum = space.reduce((a, n) => a + n, 0);
    const currentMax = max - ((space.length - 1) * this.gap);

    // reset grid-layout to be 1:1 with pixels
    this.space = space.map(x => (
      Math.round(x * currentMax / currentSum)
    ));
    this.active = index;
    cursor = [e.x, e.y];

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", endResize);
  })

  const endResize = is((e: any) => {
    this.active = 0;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", endResize);
  })

  e.addEventListener("mousedown", beginResize);

  return () => {
    e.removeEventListener("mousedown", beginResize);
  }
}

function is(handle: (e: any) => void){
  return (e: any) => {
    handle(e);
    e.stopPropagation();
    e.preventDefault();
  }
}