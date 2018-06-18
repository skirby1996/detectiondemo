import * as React from "react";

class Content extends React.Component {
  public render() {
    return (
      <div className="Content">
        <h1>Content pane</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a libero vel sem sollicitudin tempor.
          Aenean a purus porttitor, pharetra dui ac, iaculis odio. Sed maximus a quam sed placerat.
          Nullam quis eros hendrerit, dapibus erat vitae, vestibulum enim. Vivamus sed volutpat nunc, placerat
          ultrices ipsum. Quisque non magna nec diam ullamcorper vehicula vitae a lectus. Donec tempor ultrices
          sapien eu tempor. In aliquet dui vitae magna pharetra molestie. Duis et finibus felis. Cras ut nisl
          aliquam, sollicitudin leo ac, ullamcorper neque. Vivamus dapibus commodo urna, sit amet lobortis dui
          pellentesque sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac libero sit
          amet nisl porttitor faucibus ut eu odio. Vivamus sit amet faucibus lectus.
        </p>
{ /*       <input type="file" onChange={this.fileChangedHandler}>
<button onClick={this.uploadHandler}>Upload</button> */}
      </div>
    );
  }
}

export default Content;
