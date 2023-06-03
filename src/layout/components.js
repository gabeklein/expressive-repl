import { Control } from "./control";

export const Layout = (props) => {
  const { output, container } = Control.use({ separator: Handle, ...props }, true);

  forward: className;
  display: grid;

  <this ref={container}>
    {output}
  </this>
}

export const Row = (props) => {
  <Layout {...props} type="columns" />
}

export const Column = (props) => {
  <Layout {...props} type="rows" />
}

for(const Component of [Layout, Row, Column])
  Control.managed.add(Component);

const Handle = ({ type, gap, pull, push }) => {
  forward: ref, className;
  position: relative;

  css: hover: {
    grabBar: {
      bg: 0x9cc3ff;
    }
  }

  grabBar: {
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

  if(type == "columns"){
    cursor: col-resize;
    grabBar: {
      top: 10;
      bottom: 10;
      right: 1;
      left: 1;
    }
  }
  else {
    cursor: row-resize;
    grabBar: {
      top: 1;
      bottom: 1;
      right: 10;
      left: 10;
    }
  }

  <grabBar />;

  if(pull)
    <corner ref={pull} style={{
      top: -gap,
      left: -gap*2
    }}/>

  if(push)
    <corner ref={push} style={{
      bottom: -gap,
      right: -gap*2
    }}/>
}