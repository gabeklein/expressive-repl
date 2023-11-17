import { Provider } from "@expressive/react";
import { Layout as Control } from "./Control";
import { forwardRef } from "react";

export const Layout = (props) => {
  const {
    is: control,
    output,
    container
  } = Control.use(props);

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

export { Column as Col };

const Handle = (props) => {
  const {
    grab,
    pull,
    push,
    vertical,
    width,
  } = props;

  forward: className;
  position: relative;

  bar: {
    position: absolute;
    radius: round;
    transition: "background 0.1s ease-out";
  }

  css: hover: {
    bar: {
      bg: 0x9cc3ff;
    }
  }

  if(vertical){
    cursor: col-resize;
    bar: {
      top: 10;
      bottom: 10;
      right: 3;
      left: 3;
    }
  }
  else {
    cursor: row-resize;
    bar: {
      top: 3;
      bottom: 3;
      right: 10;
      left: 10;
    }
  }
  
  <this onMouseDown={grab}>
    <bar />
    {pull && (
      <Corner onMouseDown={pull} style={{ left: -width, top: 0 }} />
    )}
    {push && (
      <Corner onMouseDown={push} style={{ right: -width, bottom: 0 }} />
    )}
  </this>
}

const Corner = (props) => {
  position: absolute;
  cursor: move;
  radius: round;
  size: 9;
  borderColor: transparent;
  borderStyle: solid;

  css: hover: {
    borderColor: 0x9cc3ff;
  }
  
  <this {...props} />
}