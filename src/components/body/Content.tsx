import * as React from 'react';
import Dropzone from "react-dropzone";

function Content(props: any) {
  if (props.currentFileUrl === "") {
    return (
      <div className="Content">
        <h1>Content pane</h1>
        <Dropzone
          multiple={true}
          accept="image/*"
          onDrop={props.onImageDrop}>
          <p className="dropzone-text">
            Drop an image or click to select a file to upload.
          </p>
        </Dropzone>
      </div>
    );
  } else {
    return (
      <div className="Content">
        <h1>Content pane</h1>
        <img src={props.currentFileUrl}/>
      </div>
    );
  }
}

export default Content;
