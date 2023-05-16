import {SolverPanel} from './task-panel.js'

$(document).ready(() => {

    let page = $('#task-panel')
    page.addClass('mt-3')

    let panel = new SolverPanel(page)

})
