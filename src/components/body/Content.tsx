/*
NOTE: Not currently in use
TODO: Replace upload spot with image when images are selected
*/

import * as React from 'react';

function ContentPane(props: any) {
  if (props.currentFileUrl === "") {
    return (
      <img src={props.currentFileUrl}/>
    );
  } else {
    return (
      <Dropzone
        multiple={true}
        accept="image/*"
        onDrop={this.onImageDrop}>
        <p className="dropzone-text">Drop an image or click to select a file to upload.</p>
      </Dropzone>
    );
  }
}

export default ContentPane;
