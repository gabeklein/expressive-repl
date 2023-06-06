import Model, { get, ref, set } from '@expressive/react';
import React, { ReactNode } from 'react';

import { createRef } from './events';

const AXIS = ["gridTemplateRows", "gridTemplateColumns"] as const;

enum Direction {
  Row = "columns",
  Column = "rows"
}

export class Control extends Model {
  static managed = new WeakSet();

  index?: number = undefined;
  parent = get(Control, false);

  type = Direction.Row;
  gap = 9;

  items = [] as ReactNode[];
  space = [] as number[];

  output = get(() => this.getOutput);

  container = ref(this.applyLayout);
  separator = set(() => this.parent?.separator || "div") as any;

  children = set([], value => {
    this.items = flattenChildren(value);
    this.space = this.items.map(() => 1);
  });

  protected get isRow(){
    return this.type == Direction.Row;
  }
  
  public applyLayout(element: HTMLElement){
    const { gap } = this;
    const [x, y] = this.isRow ? AXIS : AXIS.slice().reverse();

    element.style[x] = `minmax(0, 1fr)`;

    return this.get(({ space }) => {
      element.style[y] = space
        .map(value => `minmax(0, ${value}fr)`)
        .join(` ${gap}px `);
    })
  }

  protected getOutput(){
    const { items } = this;
    const output: ReactNode[] = [];

    items.forEach((child: any, i, array) => {
      const key = i * 2;

      output.push(
        React.cloneElement(child, {
          index: key, key, ...child.props
        })
      );

      if(i + 1 < array.length)
        output.push(this.createHandle(key + 1));
    });

    return output;
  }

  protected createHandle(key: number){
    const { items, parent, separator } = this;
    const events = this.watch(key);
    const ref = createRef(events);

    let pull: ((value: any) => void) | undefined;
    let push: ((value: any) => void) | undefined;

    if(parent){
      const key = this.index!;

      if(key > 1)
        pull = createRef(events, parent.watch(key - 1));

      if(key < items.length - 2)
        push = createRef(events, parent.watch(key + 1));
    }

    return React.createElement(separator, {
      key,
      index: key,
      pull,
      push,
      ref
    })
  }

  public watch(index: number){
    const { isRow, gap } = this;

    return () => {
      const { space, container } = this;

      const rect = container.current!.getBoundingClientRect();
      const max = rect[isRow ? "width" : "height"];

      const currentSum = space.reduce((a, n) => a + n, 0);
      const currentMax = max - ((space.length - 1) * gap);

      this.space = space.map(x => (
        Math.round(x * currentMax / currentSum)
      ));

      return (x: number, y: number) => {
        const diff = this.isRow ? x : y;
        const prior = (index - 1) / 2;
        const after = prior + 1; 
    
        this.space[prior] += diff;
        this.space[after] -= diff;
        this.set("space");
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