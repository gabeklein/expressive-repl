import { Children } from "react";
import { Window } from "./control";
import { flattenChildren } from "./util";

export const Handle = ({ direction }) => do {
  forward: ref, className;
  position: relative;

  css: hover: {
    handle: {
      bg: 0x9cc3ff;
    }
  }

  handle: {
    radius: round;
    transition: "background 0.1s ease-out";
  }

  if(direction == "row"){
    cursor: col-resize;
    handle: {
      absolute: 10, 1;
    }
  }
  else {
    cursor: row-resize;
    handle: {
      absolute: 1, 10;
    }
  }

  <handle />
}

export const Layout = (props) => do {
  const { output, container } = Window.using({
    separator: Handle, ...props, direction: props.as
  });

  forward: className;
  display: grid;

  <this ref={container}>
    {output}
  </this>
}

export const Row = (props) => do {
  <Layout {...props} as="row" />
}

export const Column = (props) => do {
  <Layout {...props} as="column" />
}