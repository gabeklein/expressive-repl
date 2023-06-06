import { Provider } from "@expressive/react";
import { Control } from "./Control";
import { forwardRef } from "react";

export const Layout = (props) => {
  const {
    is: control,
    output,
    container
  } = Control.use(props, true);

  display: grid;

  <this ref={container} className={props.className}>
    <Provider for={control}>
      {output}
    </Provider>
  </this>
}

export const Row = (props) => {
  <Layout separator={Handle} {...props} type="columns" />
}

export const Column = (props) => {
  <Layout separator={Handle} {...props} type="rows" />
}

const Handle = ({ pull, push }) => {
  const { type, gap } = Control.get();

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

  if(type == "columns"){
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

  <grab />;

  if(pull)
    <Corner ref={pull} style={{
      top: 0,
      left: -gap
    }}/>

  if(push)
    <Corner ref={push} style={{
      bottom: 0,
      right: -gap
    }}/>
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