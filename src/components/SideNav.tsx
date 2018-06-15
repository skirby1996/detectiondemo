import * as React from 'react';

class SideNav extends React.Component {
  public render() {
    return (
      <nav className="SideNav">
        <ul className="nav-vertical">
          <li><h3>Side Nav</h3></li>
          <li><a href="#">Page A</a></li>
          <li><a href="#">Page B</a></li>
          <li><a href="#">Page C</a></li>
        </ul>
      </nav>
    );
  }
}

export default SideNav;
