from app import app
from flask import render_template, request
from app.src.solver import task
import numpy as np
import json


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template("index.html")

@app.route('/')
def index():
    return app.send_static_file('./pages/main.html')

@app.route('/<path:path>')
def send_static_file(path):
    print(path)
    return app.send_static_file(path)

@app.route('/run', methods = ['GET', 'POST'])
def calc():
    data = request.get_json()
    mesh = np.linspace(data['mesh'][0], data['mesh'][1], num = data['mesh'][2])
    
    initial_value = np.zeros((len(data['point']), 2 * data['dim']))
    m = np.zeros((len(data['point'])))
    for i in np.arange(initial_value.shape[0]):
        initial_value[i, ::2] = data['point'][i]['r']
        initial_value[i, 1::2] = data['point'][i]['dr']
        m[i] = data['point'][i]['m']
        
    initial_value = initial_value.flatten()
    parameters = tuple(list(m)) + (data['g'], len(data['point']), data['dim'])
    
    ts = task(initial_value, mesh, parameters)

    ts.solve()
    ts.plot_trajectory(False)
    ts.plot_velocity(False)
    
    return [ts.figure_trajectory, ts.figure_velocity]