import * as React from "react";

import Content from './body/Content';
import Meta from './body/Meta';
import SideNav from './body/SideNav';

class Body extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.onImageDrop = this.onImageDrop.bind(this)
    this.resetFiles = this.resetFiles.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.state = {
      currentFile: "",
      currentFileUrl: "",
      files: [],
      response: {}
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
      files: [],
      response: {}
    });
  }

  // TODO: for loop is quick fix, try and find better solution
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

  public uploadFile(fileName: string) {
    for (const f of this.state.files) {
      if (f.name === fileName) {
        // tslint:disable:no-console
        console.log("Uploading " + fileName)
        this.JSONrequest(fileName)
      }
    }
  }

  public deleteFile(fileName: string) {
    if (this.state.currentFile === fileName) {
      this.setState({
        currentFile: "",
        currentFileUrl: ""
      })
    }
    for (const f of this.state.files) {
      if (f.name === fileName) {
        this.setState((prevState: any) => ({
          files: prevState.files.filter((file: any) => file !== f)
        }));
      }
    }
  }

  public JSONrequest(fName: string) {
    // tslint:disable:object-literal-sort-keys
    fetch("http://localhost:5000/get-detections", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fName
      })
    })
      .then(response => response.json())
      .then(parsedJSON => this.setState({response: parsedJSON}))
      .catch(error => console.log("Parsing failed" + error))
  }

  public render() {
    return (
      <div className="Body">
        <SideNav files={this.state.files} container={this}
          resetFiles={this.resetFiles} selectFile={this.selectFile}
          uploadFile={this.uploadFile} deleteFile={this.deleteFile}/>
        <Content currentFileUrl={this.state.currentFileUrl} onImageDrop={this.onImageDrop}/>
        <Meta response={this.state.response}/>
      </div>
    );
  }
}

export default Body;
