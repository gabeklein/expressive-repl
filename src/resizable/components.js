import { Children } from "react";
import { Window } from "./control";
import { flattenChildren } from "./util";

export const Handle = ({ direction }) => do {
  forward: ref, className;
  position: relative;

  $hover: {
    handle: {
      bg: 0x9cc3ff;
    }
  }

  handle: {
    radius: round;
    transition: "background 0.1s ease-out"
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

  <this>
    <handle />
  </this>
}

export const Row = (props) => do {
  const { output, container } = Window.using({
    separator: Handle,
    ...props,
    direction: "row"
  });

  forward: className;
  display: grid;

  <this ref={container}>
    {output}
  </this>
}

export const Column = (props) => do {
  const { output, container } = Window.using({
    separator: Handle,
    ...props,
    direction: "column"
  });

  forward: className;
  display: grid;

  <this ref={container}>
    {output}
  </this>
}