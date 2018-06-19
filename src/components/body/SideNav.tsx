import * as React from 'react';

class SideNav extends React.Component<any, any> {

  constructor (props: any) {
    super(props)
    this.resetFiles = this.resetFiles.bind(this)
    this.state = {
      files: []
    }
  }

  public componentWillReceiveProps(props: any) {
    this.setState({
      files: props.files
    });
  }

  public resetFiles() {
    this.props.parentReset()
  }

  public selectFile(fileName: string) {
    this.props.parentSelect(fileName)
  }

  public render() {
    return (
      <nav className="SideNav">
        <ul className="nav-vertical">
          <li><h3>Uploaded Images</h3></li>
          <li><hr/></li>
          <li><a href="#" onClick={this.resetFiles}>Reset</a></li>
          {
            this.state.files.map((f: any) =>
              <li key={f.name}>
                <a href="#"
                  onClick={this.selectFile.bind(this, f.name)}>
                  {f.name}
                </a>
              </li>)
          }
        </ul>
      </nav>
    );
  }
}

export default SideNav;
