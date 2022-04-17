import { Provider } from '@expressive/mvc';
import { Footer, Header } from './components/common';

import { Interface, REPL } from './editor';

export const App = () => {
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

export default App;