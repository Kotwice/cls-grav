import {Form} from './frm-cnfg.js'

$(document).ready(() => {
    console.log('start')

    // $('#frm-cnfg').load('../pages/frm-cnfg.html', (response, error, xhr) => {
    //     console.log(response)
    //     console.log(error)
    //     console.log(xhr)
    // })

    let congif_task = {'dim': 2, 'point': [{'r': [0, 0], 'dr': [0, 0], 'm': 1}, {'r': [0, 10], 'dr': [1, 1], 'm': 1}]}

    let fr = new Form($('#frm-cnfg'))

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
