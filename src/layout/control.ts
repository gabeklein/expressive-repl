import Model, { get, ref, set } from '@expressive/react';
import React, { ReactNode } from 'react';

import { createRef, DragEvents } from './events';

const AXIS = ["gridTemplateRows", "gridTemplateColumns"] as const;
const getAxis = (row: boolean) => row ? AXIS : AXIS.slice().reverse();

enum Direction {
  Row = "columns",
  Column = "rows"
}

export class Control extends Model {
  static managed = new WeakSet();

  type = Direction.Row;
  gap = 5;

  template?: string[];
  index?: number = undefined;

  active = 0;
  items = [] as ReactNode[];
  space = [] as number[];

  parent = get(Control, false);
  output = get(() => this.getOutput);

  container = ref(this.applyLayout);
  separator = set(() => this.parent?.separator || "div");

  children = set([], value => {
    this.items = flattenChildren(value);
    this.space = this.items.map(() => 1);
  });

  protected get isRow(){
    return this.type == Direction.Row;
  }

  public nudge(index: number, offset: [number, number]){
    const diff = offset[this.isRow ? 0 : 1];
    const prior = (index - 1) / 2;
    const after = prior + 1; 

    this.space[prior] += diff;
    this.space[after] -= diff;

    this.applyLayout();
  }
  
  public applyLayout(e?: HTMLElement){
    const element = e || this.container.current!;
    const axis = getAxis(this.isRow);

    element.style[axis[0]] = `minmax(0, 1fr)`;
    element.style[axis[1]] = this.space
      .map(value => `minmax(0, ${value}fr)`)
      .join(` ${this.gap}px `);
  }

  public calibrate(){
    const { isRow, gap, space, container } = this;
    const rect = container.current!.getBoundingClientRect();
    const max = rect[isRow ? "width" : "height"];

    const currentSum = space.reduce((a, n) => a + n, 0);
    const currentMax = max - ((space.length - 1) * gap);

    this.space = space.map(x => (
      Math.round(x * currentMax / currentSum)
    ));
  }

  protected getOutput(){
    const { items, separator } = this;
    const output: ReactNode[] = [];

    items.forEach((child: any, i, array) => {
      let key = i * 2;

      output.push(
        React.cloneElement(child, {
          key,
          index: key,
          ...child.props
        })
      );

      if(i + 1 >= array.length)
        return;

      const { parent } = this;
      const events = this.handle(++key);
      const ref = createRef(events);

      let pull: ((value: any) => void) | undefined;
      let push: ((value: any) => void) | undefined;

      if(parent){
        const key = this.index!;

        if(key > 1)
          pull = createRef(events, parent.handle(key - 1));

        if(key < items.length - 2)
          push = createRef(events, parent.handle(key + 1));
      }

      output.push(
        React.createElement(separator, { key, pull, push, ref })
      );
    });

    return output;
  }

  handle(key: number): DragEvents {
    return {
      start: () => {
        this.calibrate();
        this.active = key;
      },
      stop: () => {
        this.active = 0;
      },
      move: (x, y) => {
        this.nudge(key, [x, y]);
      }
    }
  }
}

function flattenChildren(input: ReactNode): ReactNode[] {
  const array = React.Children.toArray(input);

  return array.reduce((flatChildren: ReactNode[], child) => {
    const item = child as React.ReactElement<any>;

    if(item.type === React.Fragment)
      return flatChildren.concat(
        flattenChildren(item.props.children)
      );
      
    flatChildren.push(child);
    return flatChildren;
  }, []);
}