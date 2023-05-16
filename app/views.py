from app import app
from flask import render_template, request
from app.src.solver import task
import plotly.graph_objects as go  
import numpy as np
import json

@app.route('/')
def index():
    return app.send_static_file('./pages/main.html')

@app.route('/<path:path>')
def send_static_file(path):
    print(path)
    return app.send_static_file(path)

@app.route('/process', methods = ['GET', 'POST'])
def process():
    data = request.get_json()
    mesh = np.linspace(data['mesh'][0], data['mesh'][1], num = data['mesh'][2])
    
    initial_value = np.zeros((len(data['points']), 2 * data['dim']))
    m = np.zeros((len(data['points'])))
    for i in np.arange(initial_value.shape[0]):
        initial_value[i, ::2] = data['points'][i]['r']
        initial_value[i, 1::2] = data['points'][i]['dr']
        m[i] = data['points'][i]['m']
        
    initial_value = initial_value.flatten()
    parameters = tuple(list(m)) + (data['g'], len(data['points']), data['dim'])
    
    ts = task(initial_value, mesh, parameters)

    ts.solve()
    ts.plot_trajectory(False)
    ts.plot_velocity(False)
    
    return [ts.figure_trajectory, ts.figure_velocity]

@app.route('/preview', methods = ['GET', 'POST'])
def preview():
    points = request.get_json()

    data = list()
    for point in points:
        if (point['r'] != []):
            data.append(go.Scatter(x = [point['r'][0]], y = [point['r'][1]], mode = 'markers'))
    
    figure = go.Figure(data)

    return figure.to_json()
    