import {SolverPanel} from './task-panel.js'

$(document).ready(() => {

    let page = $('#task-panel')
    page.addClass('mt-3')

    let initial_congif_task_2d = {'dim': 2, 'g': 1, 'mesh': [0, 5, 1000], 'points': [
        {'r': [-1, 0], 'dr': [0, 0], 'm': 5}, 
        {'r': [1, 0], 'dr': [0, 0], 'm': 1},
        {'r': [0, 1], 'dr': [0, 0], 'm': 1}
    ]}

    let initial_congif_task_3d = {'dim': 3, 'g': 1, 'mesh': [0, 5, 10000], 'points': [
            {'r': [-1, 0, 0], 'dr': [0, 0, 0], 'm': 5}, 
            {'r': [1, 0, 1], 'dr': [0, 0, 0], 'm': 1},
            {'r': [0, 1, 1], 'dr': [0, 0, 0], 'm': 1}
        ]}

    let panel = new SolverPanel(page, initial_congif_task_3d)

})
