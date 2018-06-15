import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './stylesheet.css';

import Content from './components/Content'
import Head from './components/Head';
import Meta from './components/Meta';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <div className="header">
          <Head/>
          <TopNav/>
        </div>
        <div className="content-pane">
          <SideNav/>
          <Content/>
          <Meta/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
