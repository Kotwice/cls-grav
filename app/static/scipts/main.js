// import {Form} from './frm-cnfg.js'
import {SolverPanel} from './task-panel.js'

$(document).ready(() => {
    console.log('start')

    // $('#frm-cnfg').load('../pages/frm-cnfg.html', (response, error, xhr) => {
    //     console.log(response)
    //     console.log(error)
    //     console.log(xhr)
    // })

    let congif_task = {'dim': 2, 'point': [{'r': [0, 0], 'dr': [0, 0], 'm': 1}, {'r': [0, 10], 'dr': [1, 1], 'm': 1}]}

    // let fr = new Form($('#frm-cnfg'))

    let page = $('#task-panel')

    let panel = new SolverPanel(page)

    // let accordion = new Accordion(page, 'accordion-task-panel')

    // let accordion_setting = new Accordion_Item('Settings', 'accordion-task-panel-item-1', accordion.id)
    // let accordion_result = new Accordion_Item('Results', 'accordion-task-panel-item-2', accordion.id)

    // let card_dimension = new Card('Dimension')
    // let card_condition = new Card('Initial Conditions')

    // let card_figure_trajectory = new Card('Plot Trajectory')
    // let card_figure_velocity = new Card('Plot Phase Space')

    // let radios = [new Radio('2D', true), new Radio('3D', false)]

    // radios[0].change = () => {console.log('tem')}

    // let figure_trajectory = new Figure('figure-trajectory')
    // let figure_velocity = new Figure('figure-velocity')

    // let inputs_parameters = [{'label': 'Initial coordinate vecror', 'limit': [-10, 10], 'dim': 2}, 
    //     {'label': 'Initial velocity vecror', 'limit': [-10, 10], 'dim': 2},
    //     {'label': 'Mass', 'limit': [0, 10], 'dim': 1}
    // ]

    // // let inputs = [new Input('Initial coordinate vecror'), new Input('Initial velocity vecror')]

    // let list_point = new List(inputs_parameters)


    // card_dimension.insert([radios[0].radio, radios[1].radio].flat(1))
    // card_condition.insert(list_point.list)

    // card_figure_trajectory.insert(figure_trajectory.figure)
    // card_figure_velocity.insert(figure_velocity.figure)

    // accordion_setting.insert(card_dimension.card)
    // accordion_setting.insert(card_condition.card)

    // accordion_result.insert(card_figure_trajectory.card)
    // accordion_result.insert(card_figure_velocity.card)

    // accordion.insert(accordion_setting.accordion_item)
    // accordion.insert(accordion_result.accordion_item)

        // document.getElementById('btn-calc').addEventListener('click', () => {
    //     console.log('button')

    //     fetch('/bnt-calc').then(data => {
    //         console.log(data)

    //         Plotly.newPlot('figure', data)

    //     }).catch(error => {
    //         console.log(error)
    //     })

    // })

})
