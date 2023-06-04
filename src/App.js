import { Provider } from '@expressive/react';

import { Footer, Header } from './components/common';
import { Interface, REPL } from './editor/Interface';

export const App = () => {
  height: vh(100);
  boxSizing: border-box;
  padding: 0, 10;
  gridRows: min, minmax(0, "1fr"), min;
  overflow: hidden;

  <Provider for={REPL}>
    <Header />
    <Interface />
    <Footer />
  </Provider>
}

export default App;