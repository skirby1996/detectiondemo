import * as React from "react";

class TopNav extends React.Component {
  public render() {
    return (
      <div className="TopNav">
        <nav className="TopNav-nav">
          <ul className="nav-horizontal">
            <li><a href="#">Page A</a></li>
            <li><a href="#">Page B</a></li>
            <li><a href="#">Page C</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopNav;
