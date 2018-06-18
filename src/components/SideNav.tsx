import * as React from 'react';

class SideNav extends React.Component {
  public render() {
    return (
      <nav className="SideNav">
        <ul className="nav-vertical">
          <li><h3>Page Content</h3></li>
          <li><a href="#">Link A</a></li>
          <li><a href="#">Link B</a></li>
          <li><a href="#">Link C</a></li>
        </ul>
      </nav>
    );
  }
}

export default SideNav;
