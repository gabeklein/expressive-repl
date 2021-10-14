import { Provider } from '@expressive/mvc';

import { Interface, REPL } from './editor';

export const App = () => do {
  const { get, layout } = REPL.use();

  window: {
    height: "100vh";
    boxSizing: border-box;
    padding: 10;
    gridRows: "minmax(0, 1fr)";
    overflow: hidden;
  }

  <Provider of={get}>
    <window>
      {/* <Header /> */}
      <Interface layout={layout} />
      {/* <Footer /> */}
    </window>
  </Provider>
}

const Footer = () => do {
  height: 60;
  flexAlign: center;
  font: 14;
  color: 0x333;

  <this>
    Gabe Klein - MIT - 2021
  </this>
}

const Header = () => do {
  height: 80;
  
  <this>
  </this>
}

export default App;