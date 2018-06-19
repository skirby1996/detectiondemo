import * as React from "react";
import Dropzone from "react-dropzone";
// npm install react-dropzone --save

import Meta from './body/Meta';
import SideNav from './body/SideNav';

class Body extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.onImageDrop = this.onImageDrop.bind(this)
    this.resetFiles = this.resetFiles.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.state = {
      currentFile: "",
      currentFileUrl: "",
      files: []
    }
  }

  public onImageDrop(files: any) {
    this.setState({
      files
    });

  }

  public resetFiles() {
    this.setState({
      currentFile: "",
      currentFileUrl: "",
      files: []
    });
  }

  public selectFile(fileName: string) {

    for (const f of this.state.files) {
      if (f.name === fileName) {
        this.setState({
          currentFile: fileName,
          currentFileUrl: URL.createObjectURL(f)
        });
      }
    }
  }

  public render() {
    return (
      <div className="Body">
        <SideNav files={this.state.files}
          parentReset={this.resetFiles} parentSelect={this.selectFile}/>
        <div className="Content">
          <h1>Content pane</h1>
          <Dropzone
            multiple={true}
            accept="image/*"
            onDrop={this.onImageDrop}>
            <p className="dropzone-text">Drop an image or click to select a file to upload.</p>
          </Dropzone>
          <br/>
          <img src={this.state.currentFileUrl}/>
        </div>
        <Meta name={this.state.currentFile}/>
      </div>
    );
  }
}

export default Body;
