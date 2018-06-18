import * as React from "react";
import Dropzone from "react-dropzone";
// npm install react-dropzone --save

class Content extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.onImageDrop = this.onImageDrop.bind(this)
    this.state = {
      files: []
    }
  }

  public onImageDrop(files: any) {
    this.setState({
      files
    });
  }

  public render() {
    return (
      <div className="Content">
        <h1>Content pane</h1>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        <ul>
          {
            this.state.files.map((f: any) => <li key={f.name}>{f.name} - {f.size} bytes</li>)
          }
        </ul>
      </div>
    );
  }
}

export default Content;
