import { Provider } from '@expressive/mvc';

import { Interface, REPL } from './editor';

export const App = () => do {
  const { get, layout } = REPL.use();

  window: {
    height: "100vh";
    boxSizing: border-box;
    padding: 0, 10;
    gridRows: min, "minmax(0, 1fr)", min;
    overflow: hidden;
  }

  <Provider of={get}>
    <window>
      <Header />
      <Interface layout={layout} />
      <Footer />
    </window>
  </Provider>
}

const Header = () => do {
  height: 50;
  display: flex;
  alignItems: center;
  padding: 0, 20;

  img: {
    size: 30;
    marginR: 10;
    marginT: 2;
  }
  
  <this>
    <img src="./icon/Logo.svg" />
    Expressive REPL
  </this>
}

const Footer = () => do {
  height: 40;
  marginB: 5;
  color: 0x888;
  flexAlign: center;
  font: 12;

  <this>
    Gabe Klein - MIT - 2021
  </this>
}

export default App;