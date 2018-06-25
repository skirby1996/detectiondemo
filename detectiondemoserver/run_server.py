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

import keras
from keras_retinanet import models
from keras_retinanet.utils.image import read_image_bgr, preprocess_image, resize_image
import tensorflow as tf

import cv2
import json
import base64
import random as rand
import numpy as np

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

def init_model():
    # TODO: Should load model so that each time get_detections() is called
    # it returns detections from the model, without having to load the model
    # each time
    print("Initializing inference model")

    model_path = os.path.join('..', 'path', 'to', 'model')
    return models.load_model(model_path, backbone_name='resnet50')

def get_detections(image):
    # TODO: Should take an image (batch) as an argument, then run the image
    # through the model and return the detections in a JSON string. See
    # get_dummy_detections() for JSON formatting

    boxes, scores, labels = model.predict_on_batch(np.expand_dims(image, axis=0))

    detections = {}
    for i, box, score, label in enumerate(zip(boxes[0], scores[0], labels[0])):
        if score < (threshold = 0.5):
            # Sorted by score so once here break to skip low scores
            break

        detection = {}
        detection['class'] = label
        detection['score'] = score
        detection['bbox_x'] = -1 # TODO
        detection['bbox_y'] = -1 # TODO
        detection['bbox_w'] = -1 # TODO
        detection['bbox_h'] = -1 # TODO

        detections[i] = detection

    return (detections)


@app.route('/get-detections', methods=['POST'])
def json_simple():
    req_data = request.get_json()

    response = {}

    if req_data is None:
        return (json.dumps({ results: "Error! Bad request" }))
    if not 'fileName' in req_data:
        return (json.dumps({ results: "Error! Missing key" }))

    if 'data' in req_data.keys():
        data = req_data['data']
        data = data[(data.find(',') + 1):]
        with open(req_data['fileName'], 'wb') as f:
            f.write(base64.decodebytes(bytes(data, 'ascii')))
    else:
        print("Request contained no data")

    response['fileName'] = req_data['fileName']

    image = read_image_bgr(req_data['fileName'])
    image = preprocess_image(image)
    image, _ = resize_image(image)

    response['detections'] = get_detections(image)

    return (json.dumps(response))

if __name__ == '__main__':
    model = init_model()
    app.run(debug=True, port=5000)
