import Model, { get, ref, set } from '@expressive/react';
import React from 'react';

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
  separator = "div";
  gap = 5;

  template?: string[];
  parent?: Control = undefined;
  parentOffset?: number = undefined;

  active = 0;
  items = [] as React.ReactNode[];
  space = [] as number[];

  children = set([], value => {
    this.items = flattenChildren(value);
    this.space = this.items.map(() => 1);
  });

  container = ref(this.applyLayout);
  output = get(() => this.getOutput);

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
    const output: React.ReactNode[] = [];

    this.items.forEach((child: any, i, array) => {
      output.push(
        this.createSection(i * 2, child)
      );

      if(i + 1 in array)
        output.push(
          this.createSeparator(i * 2 + 1)
        );
    });

    return output;
  }

  protected createSection(key: number, node: any){
    const props = { key, ...node.props };

    if(Control.managed.has(node.type))
      Object.assign(props, {
        parent: this,
        parentOffset: key,
        separator: this.separator
      });

    return React.cloneElement(node, props);
  }

  protected createSeparator(key: number){
    const events = this.handle(key);
    let pull: ((value: any) => void) | undefined;
    let push: ((value: any) => void) | undefined;

    if(this.parent){
      const also = this.parent;
      const key = this.parentOffset!;

      if(key > 1)
        pull = createRef(events, also.handle(key - 1));

      if(key < this.items.length - 2)
        push = createRef(events, also.handle(key + 1));
    }

    return React.createElement(this.separator, {
      key, pull, push,
      ref: createRef(events),
      type: this.type,
      gap: this.gap
    });
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

function flattenChildren(
  input: React.ReactNode): React.ReactNode[] {

  const array = React.Children.toArray(input);

  return array.reduce((flatChildren: React.ReactNode[], child) => {
    const item = child as React.ReactElement<any>;

    if(item.type === React.Fragment)
      return flatChildren.concat(
        flattenChildren(item.props.children)
      );
      
    flatChildren.push(child);
    return flatChildren;
  }, []);
}