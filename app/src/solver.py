import numpy as np
from scipy.integrate import odeint
import plotly.graph_objects as go  

class except_initiate(Exception):
    def __str__(self):
        return 'initial value is incorrect'

class Solver():
    def __init__(self) -> None:
        pass
    def solve(self):
        self.solution = odeint(self.build_system_equations, self.initian_value, self.mesh, args = self.parameters)
        self.r = self.solution[:, ::2]
        self.dr = self.solution[:, 1::2]
        
    def build_system_equations (self, argument, t, *parameters):

        m = parameters[:-3]
        g = parameters[-3]
        order = parameters[-2]
        dimension = parameters[-1]

        r = np.reshape(argument[::2], (-1, dimension))
        dr = argument[1::2]    
        ddr = np.zeros((order, dimension))
        R = np.zeros((order, order))
        temp = np.zeros((order, dimension))

        for i in range(0, order):
            for j in range(0, order):
                R[i, j] = np.sqrt(np.sum((r[i, :] - r[j, :]) ** 2))

        for i in range(0, order):
            for j in range(0, order):        
                if (j != i):
                    temp[j] = g * m[j] * (r[j, :] - r[i, :]) / R[i, j] ** 3
                else:
                    temp[j] = np.zeros(dimension)
            ddr[i, :] = np.sum(temp, 0)

        ddr = np.reshape(ddr, -1)

        vector = np.zeros(2 * order * dimension)
        k = 0

        for i in range(0, order * dimension):
            vector[k] = dr[i]
            vector[k + 1] = ddr[i]
            k = k + 2

        return vector
class Plotter():
    def __init__(self, layout: dict) -> None:
        self.layout = layout
        
    def plot_trajectory(self, show = True) -> None:
        try:
            indexes = np.arange(self.r.shape[1]).reshape(self.order, -1)
            match self.dimension:
                case 2:
                    data = [go.Scatter(x = self.r[:, index[0]], y = self.r[:, index[1]], mode = 'lines', name = str(body + 1))
                            for index, body in zip(indexes, np.arange(self.order))]
                case 3:
                    data = [go.Scatter3d(x = self.r[:, index[0]], y = self.r[:, index[1]], z = self.r[:, index[2]], mode = 'lines', name = str(body + 1))
                            for index, body in zip(indexes, np.arange(self.order))]

            figure = go.Figure(data = data, layout = self.layout)
            if show:
                figure.show()   
            self.figure_trajectory = figure.to_json()    
        except AttributeError as error:
            print(error)
        
    def plot_velocity(self, show = True) -> None:
        try:
            indexes = np.arange(self.dr.shape[1]).reshape(self.order, -1)
            match self.dimension:
                case 2:
                    data = [go.Scatter(x = self.dr[:, index[0]], y = self.dr[:, index[1]], mode = 'lines', name = str(body + 1))
                            for index, body in zip(indexes, np.arange(self.order))]
                case 3:
                    data = [go.Scatter3d(x = self.dr[:, index[0]], y = self.dr[:, index[1]], z = self.dr[:, index[2]], mode = 'lines', name = str(body + 1))
                            for index, body in zip(indexes, np.arange(self.order))]

            figure = go.Figure(data = data, layout = self.layout)
            if show:
                figure.show()   
            self.figure_velocity = figure.to_json()
        except AttributeError as error:
            print(error)
        
    def plot_preview(self, points: dict, show = False) -> None:
        data = list()
        scale = 5
        for point, i in zip(points, range(len(points))):
            if (len(point['r']) == 2):
                data.append(go.Scatter(x = [point['r'][0]], y = [point['r'][1]], mode = 'markers', marker = dict(size = point['m'] * scale), 
                    name = str(i + 1)))
            if (len(point['r']) == 3):
                data.append(go.Scatter3d(x = [point['r'][0]], y = [point['r'][1]], z = [point['r'][2]], mode = 'markers', 
                    marker = dict(size = point['m'] * scale), name = str(i + 1)))
        figure = go.Figure(data = data, layout = self.layout)
        if show:
            figure.show()   
        self.figure_preview = figure.to_json()
        
class Task(Solver, Plotter):
    def __init__(self, initian_value: np.ndarray, mesh: np.ndarray, parameters: tuple, layout: dict) -> None:
        try:
            if (initian_value.shape[0] != 2*parameters[-1]*parameters[-2]):
                raise except_initiate()
        except except_initiate as error:
            print(error)
        else:
            self.initian_value = initian_value
            self.mesh = mesh
            self.parameters = parameters

            self.m = parameters[:-3] # mass vector
            self.g = parameters[-3] # gravitation
            self.order = parameters[-2] # bodies number
            self.dimension = parameters[-1] # task dimension    
            self.layout = layout # layout for plotter plotly
            Plotter.__init__(self, self.layout)