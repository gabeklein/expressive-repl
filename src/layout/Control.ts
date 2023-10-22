import Model, { get, ref } from '@expressive/react';
import React, { ReactNode } from 'react';

import { createRef } from './events';

const AXIS = ["gridTemplateRows", "gridTemplateColumns"] as const;

export class Control extends Model {
  static managed = new WeakSet();

  static using(props: any){
    return this.use($ => {
      $.row = props.row;
      $.index = props.index;
      $.separator = props.separator;
      $.items = flatten(props.children);
      $.space = $.items.map(() => 1);
    }, true);
  }

  index?: number = undefined;

  row = false;
  gap = 9;

  separator = "div";

  items = [] as ReactNode[];
  space = [] as number[];

  parent = get(Control, false);
  output = get(() => this.getOutput);
  container = ref(this.applyLayout);

  constructor(){
    super();
    this.get(() => {
      if(this.parent)
        this.separator = this.parent.separator;
    })
  }
  
  public applyLayout(element: HTMLElement){
    const { gap } = this;
    const [ x, y ] = this.row ? AXIS : AXIS.slice().reverse();

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
      let index = i * 2;

      output.push(
        React.cloneElement(child, { ...child.props, key: index, index })
      );

      if(i + 1 < array.length){
        index++;
        output.push(
          React.createElement(Separate, { key: index, index })
        );
      }
    });

    return output;
  }

  public watch(index: number){
    const { row, gap } = this;

    return () => {
      const { space, container } = this;

      const rect = container.current!.getBoundingClientRect();
      const max = rect[row ? "width" : "height"];

      const currentSum = space.reduce((a, n) => a + n, 0);
      const currentMax = max - ((space.length - 1) * gap);

      this.space = space.map(x => (
        Math.round(x * currentMax / currentSum)
      ));

      return (x: number, y: number) => {
        const diff = this.row ? x : y;
        const prior = (index - 1) / 2;
        const after = prior + 1; 
    
        this.space[prior] += diff;
        this.space[after] -= diff;
        this.set("space");
      }
    }
  }
}

const Separate: React.FC<{ index: number }> = (props) => {
  return Control.get($ => {
    const { separator, parent, items } = $;
    const events = $.watch(props.index);
    const ref = createRef(events);

    let pull: ((value: any) => void) | undefined;
    let push: ((value: any) => void) | undefined;

    if(parent){
      const key = $.index!;

      if(key > 1)
        pull = createRef(events, parent.watch(key - 1));

      if(key < items.length - 2)
        push = createRef(events, parent.watch(key + 1));
    }

    return React.createElement(separator, { pull, push, ref });
  });
}

function flatten(input: ReactNode): ReactNode[] {
  const array = React.Children.toArray(input);

  return array.reduce((flatChildren: ReactNode[], child) => {
    const item = child as React.ReactElement<any>;

    if(item.type === React.Fragment)
      return flatChildren.concat(
        flatten(item.props.children)
      );
      
    flatChildren.push(child);
    return flatChildren;
  }, []);
}