from flask import Flask, request
from flask_cors import CORS

import keras
from keras_retinanet import models
from keras_retinanet.utils.image import read_image_bgr, preprocess_image, resize_image
import tensorflow as tf

import cv2
import json
import os
import base64
import random as rand
import numpy as np

app = Flask(__name__)
CORS(app)

model = None
graph = None
labels_to_names = { 0: 'chair',
                    1: 'table',
                    2: 'cabinet',
                    3: 'shelf',
                    4: 'monitor',
                    5: 'door',
                    6: 'window'}

def get_dummy_detections():
    print ("Generating dummy detections...")
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

def get_session():
    config = tf.ConfigProto()
    config.gpu_options.allow_growth = True
    return tf.Session(config=config)

def init_model():
    model_path = os.path.join('model', 'resnet50_inf_07.h5')
    return models.load_model(model_path, backbone_name='resnet50')

def get_detections(filename):
    image = read_image_bgr(filename)
    image = preprocess_image(image)
    image, scale = resize_image(image)

    with graph.as_default():
        boxes, scores, labels = model.predict_on_batch(np.expand_dims(image, axis=0))
    boxes /= scale

    detections = {}
    i = 0
    for box, score, label in zip(boxes[0], scores[0], labels[0]):
        if score < 0.5:
            # Sorted by score so once here break to skip low scores
            break

        detection = {}
        detection['class'] = labels_to_names[label]
        detection['score'] = score.item()
        detection['bbox_x'] = box[0].item()
        detection['bbox_y'] = box[1].item()
        detection['bbox_w'] = box[2].item() - box[0].item()
        detection['bbox_h'] = box[3].item() - box[1].item()

        detections[i] = detection
        i += 1

    return (detections)

@app.route('/get-detections', methods=['POST'])
def detection_page():
    req_data = request.get_json()

    if model is not None:
        response = {}
        if req_data is None:
            return (json.dumps({ 'results': "Error! Bad request" }))
        if not 'fileName' in req_data:
            return (json.dumps({ 'results': "Error! Missing key" }))
        filename = req_data['fileName']

        if 'data' in req_data.keys():
            data = req_data['data']
            data = data[(data.find(',') + 1):]
            with open(filename, 'wb') as f:
                f.write(base64.decodebytes(bytes(data, 'ascii')))
        else:
            print("Request contained no data")

        response['fileName'] = filename
        response['detections'] = get_detections(filename)
        os.remove(filename)

        return (json.dumps(response))

    else:
        return (json.dumps({ 'results': "Error! Image request sent before \
                                       model was initialized"}))

if __name__ == '__main__':
    #keras.backend.tensorflow_backend.set_session(get_session())
    model = init_model()
    model._make_predict_function()
    graph = tf.get_default_graph()
    app.run(debug=False, port=5000)
