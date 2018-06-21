import * as React from 'react';

// tslint:disable
function Meta(props: any) {
  if (typeof props.response['detections'] === "undefined") {
    return (
      <div className="Meta">
        <h1>Detections</h1>
        <hr/>
        <p>Upload an image!</p>
      </div>
    )
  } else {
    return (
      <div className="Meta">
        <h1>Detections</h1>
        <hr/>
        <p>{props.response['fileName']}</p>
        {
        Object.keys(props.response['detections']).map((ind: any) =>
          <ul>
            <li><p>Class: {props.response['detections'][ind]['class']}</p></li>
            <ul>
              <li><p>Score: {props.response['detections'][ind]['score'].toFixed(3)}</p></li>
              <li><p>
                BBOX: ({props.response['detections'][ind]['bbox_x']},
                       {' ' + props.response['detections'][ind]['bbox_y']}) +
                      ({props.response['detections'][ind]['bbox_w']},
                       {' ' + props.response['detections'][ind]['bbox_h']})
              </p></li>
            </ul>
          </ul>
        )}
      </div>
    );
  }
}

export default Meta;
