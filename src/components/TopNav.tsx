import * as React from "react";

class TopNav extends React.Component {
  public render() {
    return (
      <nav className="TopNav">
        <ul className="nav-horizontal">
          <li><a href="#">LinkA</a></li>
          <li><a href="#">LinkB</a></li>
          <li><a href="#">LinkC</a></li>
        </ul>
      </nav>
    );
  }
}

export default TopNav;
