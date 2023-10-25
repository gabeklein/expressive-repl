import { Provider } from "@expressive/react";
import { Control } from "./Control";
import { forwardRef } from "react";

export const Layout = (props) => {
  const {
    is: control,
    output,
    container
  } = Control.using(props);

  grid: {
    forward: className;
    display: grid;
  }

  <Provider for={control}>
    <grid ref={container}>
      {output}
    </grid>
  </Provider>
}

export const Row = (props) => {
  <Layout separator={Handle} {...props} row />
}

export const Column = (props) => {
  <Layout separator={Handle} {...props} />
}

const Handle = forwardRef(({ pull, push }, ref) => {
  const { row, gap } = Control.get();

  forward: className;
  position: relative;

  css: hover: {
    grab: {
      bg: 0x9cc3ff;
    }
  }

  if(row){
    cursor: col-resize;
    grab: {
      top: 10;
      bottom: 10;
      right: 3;
      left: 3;
    }
  }
  else {
    cursor: row-resize;
    grab: {
      top: 3;
      bottom: 3;
      right: 10;
      left: 10;
    }
  }

  grab: {
    position: absolute;
    radius: round;
    transition: "background 0.1s ease-out";
  }

  corner: {
    position: absolute;
    cursor: move;
    radius: round;
    size: 9;
    borderColor: transparent;
    borderStyle: solid;
    borderWidth: 3;

    css: hover: {
      borderColor: 0x9cc3ff;
    }
  }
  
  <this ref={ref}>
    <grab />
    {pull && (
      <corner ref={pull} style={{ top: 0, left: -gap }} />
    )}
    {push && (
      <corner ref={push} style={{ bottom: 0, right: -gap }} />
    )}
  </this>
})