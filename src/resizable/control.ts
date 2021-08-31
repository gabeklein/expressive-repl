import Model, { on, ref } from '@expressive/mvc';
import { cloneElement } from 'react';

import { createSeparator } from './resize';
import { flattenChildren } from './util';

const getAxis = (row: boolean) => {
  const axis = [
    "gridTemplateRows", "gridTemplateColumns"
  ] as const;

  return row ? axis : axis.slice().reverse();
}

export class Window extends Model {
  separator = "div";
  gap = 5;
  direction: "row" | "column" = "row";
  active = 0;
  items = [];
  space = [];
  
  container = ref(e => this.setLayout(e));

  children = on([], x => {
    this.items = flattenChildren(x);
    this.space = this.items.map(() => 1);
  });

  setLayout(e?: HTMLElement){
    const element = e || this.container.current;
    const axis = getAxis(this.direction == "row");

    element.style[axis[0]] = `minmax(0, 1fr)`;
    element.style[axis[1]] = this.space
      .map(value => `minmax(0, ${value}fr)`)
      .join(` ${this.gap}px `);
  }

  get output(){
    const { items, separator: grab, direction } = this;
    const output = [];

    items.forEach((x, i) => {
      const key = i * 2;
      const willContinue = i + 1 in items;

      output.push(
        cloneElement(x, { key }),
        willContinue &&
          createSeparator(grab, this.get, key + 1, direction)
      );
    });

    return output;
  }
}