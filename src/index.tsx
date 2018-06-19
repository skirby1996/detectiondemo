import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './stylesheet.css';

import Body from './components/Body'
import Head from './components/Head';
import TopNav from './components/TopNav';

class App extends React.Component {

  public render() {
    return (
      <div className="app">
        <div className="header">
          <Head/>
          <TopNav/>
        </div>
        <Body/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
