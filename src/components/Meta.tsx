import * as React from 'react';

class Meta extends React.Component {
  public render() {
    return (
      <div className="Meta">
        <h1>Detections</h1>
        <hr/>
        <p> 3 detections:</p>
        <ul>
          <li><p>Detection 1 - 0.92%</p></li>
          <li><p>Detection 2 - 0.90%</p></li>
          <li><p>Detection 3 - 0.87%</p></li>
        </ul>
      </div>
    );
  }
}

export default Meta;
