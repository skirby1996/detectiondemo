# NOTE: Server currently just receives a JSON request and returns a json
# response containing random dummy detections
#
# TODO: Reqests will send an image, server should take that image,
# apply necessary transformations (Scaling/Clipping) to prep it for the net
# before allowing the network (should be loaded in and idling while waiting for
# a new request, or processing another image in which case add the sent
# image to the back of a queue.) Server should respond to request with real
# detections.
#
# IDEA: Split requests into two parts so that server can verify image is valid
# before receiving it (i.e. make sure image is not too large before downloading)

from flask import Flask, request
from flask_cors import CORS
import json
import random as rand

app = Flask(__name__)
CORS(app)

def get_dummy_detections():
    detections = {}
    for i in range(rand.randrange(5)):
        detection = {}
        detection['class'] = "dummy"
        detection['score'] = rand.random()
        detection['bbox_x'] = rand.randrange(100)
        detection['bbox_y'] = rand.randrange(100)
        detection['bbox_w'] = rand.randrange(300)
        detection['bbox_h'] = rand.randrange(300)
        detections[i] = detection

    return detections

@app.route('/get-detections', methods=['POST'])
def json_simple():
    req_data = request.get_json()

    response = {}

    if req_data is None:
        return (json.dumps({ results: "Error! Bad request" }))
    if not 'fileName' in req_data:
        return (json.dumps({ results: "Error! Missing key" }))
    response['fileName'] = req_data['fileName']
    response['detections'] = get_dummy_detections()

    return (json.dumps(response))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
