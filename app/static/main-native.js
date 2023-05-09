document.addEventListener('DOMContentLoaded', event => {
    console.log(event)

    fetch('./sidebar-menu.html').then(response => {
        console.log(response)
        document.getElementById('main').innerHTML = response.text()
    })


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