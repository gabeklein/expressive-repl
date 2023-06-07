import { Provider } from "@expressive/react";
import { Control } from "./Control";
import { forwardRef } from "react";

export const Layout = (props) => {
  const {
    is: control,
    output,
    container
  } = Control.use(props, true);

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
  <Layout separator={Handle} {...props} type="columns" />
}

export const Column = (props) => {
  <Layout separator={Handle} {...props} type="rows" />
}

const Handle = ({ pull, push }) => {
  const { type, gap } = Control.get();

  Grab: {
    forward: className, ref;
  }
  
  <Grab vertical={type == "columns"}>
    {pull && (
      <Corner ref={pull} style={{ top: 0, left: -gap }} />
    )}
    {push && (
      <Corner ref={push} style={{ bottom: 0, right: -gap }} />
    )}
  </Grab>
}

const Grab = ({ vertical, children }) => {
  forward: ref, className;
  position: relative;

  css: hover: {
    grab: {
      bg: 0x9cc3ff;
    }
  }

  grab: {
    position: absolute;
    radius: round;
    transition: "background 0.1s ease-out";
  }

  if(vertical){
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

  <this>
    <grab />
    {children}
  </this>
}

const Corner = forwardRef((props, ref) => {
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
  
  <this ref={ref} {...props} />
})