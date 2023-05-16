class Card {
    constructor(header) {
        this.header = header; this.body = new Array()
        this.card = $('<div></div>').addClass('card mt-2 mb-4')
        this.card_header = $('<h5></h5>').addClass('card-header').append(this.header)
        this.card_body = $('<div></div>').addClass('card-body')
        this.card.append(this.card_header, this.card_body)
    }
    append(body) {
        this.body.push(body);
        this.card_body.append(body)
    }
}

class Accordion {
    constructor(parent, id) {
        this.parent = parent; this.id = id; this.item = new Array()
        this.accordion = $('<div></div>').addClass('accordion').attr('id', this.id)
        this.parent.append(this.accordion)
    }
}

class Accordion_Item {
    constructor(Accordion, header, id) {
        this.Accordion = Accordion; this.header = header; this.id = id; this.body = new Array()
        this.accordion_item = $('<div></div>').addClass('accordion-item').attr('id', this.Accordion.id)
        this.accordion_item_header = $('<h2></h2>').addClass('accordion-header').append(
            $('<button></button>').addClass('accordion-button').attr('type', 'button')
                .attr('data-bs-toggle', 'collapse').attr('data-bs-target', '#' + this.id)
                .attr('aria-expanded', 'true').attr('aria-controls', this.id).append(this.header)
        )
        this.accordion_item_body = $('<div></div>').addClass('accordion-collapse collapse')
            .attr('id', this.id).attr('data-bs-parent', this.Accordion.id)
        this.div_body = $('<div></div>').addClass('accordion-body')
        this.accordion_item_body.append(this.div_body)
        this.accordion_item.append(this.accordion_item_header, this.accordion_item_body)
        this.Accordion.accordion.append(this.accordion_item)
    }
    append(body) {
        this.body.push(body);
        this.div_body.append(this.body)
    }
}

class Radios {
    constructor(header, values, value) {
        this.header = header; this.values = values; this.value = value;
        this.div = $('<div></div>').addClass('btn-group').attr('role', 'group')
        this.radios = new Array()
        this.label = new Array(); this.input = new Array();

        for (let i = 0; i < this.header.length; i++) {
            let label = $('<label></label>').addClass('btn btn-primary w-50').attr('for', 'radio-' + this.header[i]).append(this.header[i])
            let input = $('<input>').addClass('btn-check').attr('type', 'radio').attr('name', 'btnradio').attr('autocomplete', 'off')
                .attr('id', 'radio-' + this.header[i])
                .on('change', () => {
                    this.value = this.values[i]
                    this.change(this.values[i])
                })
            this.value == this.values[i] ? input.prop('checked', true) : input.prop('checked', false)
            this.label.push(label)
            this.label.push(input)
            this.radios.push([input, label])
        }
        this.radios = this.radios.flat(1)
    }
    change (value) {}
}


class Figure {
    constructor(id) {
        this.id = id
        this.figure = $('<div></div>').addClass('container-fluid').attr('id', this.id)
    }
    load() {
        this.figure.empty()
        this.spinner = $('<div></div>').addClass('d-flex justify-content-center').append(
            $('<div></div>').addClass('spinner-border text-primary').attr('role', 'status').append(
                $('<span></span>').addClass('visually-hidden')
            )
        )
        this.figure.append(this.spinner)
    }
    clear() {
        this.figure.empty()
    }
    plot(data) {
        this.data = data
        Plotly.newPlot(this.id, this.data)
    }
}

class Input {
    constructor(parent, parameter) {
        this.parent = parent;
        this.parameter = parameter; this.flag = false
        this.input = $('<input>').attr('type', 'text').addClass('form-control').attr('placeholder', this.parameter['label']).on('blur', () => {this.change()})
        this.parent.append(this.input)
        this.initialize()
    }
    initialize() {
        let line = this.input.val()
        if (this.isValidJsonString(line)) {
            let object = JSON.parse(line) 
            if (typeof object == 'number' && this.parameter.dim == 1) {
                this.flag = true
            }
            else {
                if (object.length == this.parameter.dim) {
                    for (let index in object) {
                        let value = object[index]
                        this.flag = (!isNaN(value)) ? ((value >= this.parameter.limit[0] && value <= this.parameter.limit[1]) ? true : false) : false
                    }
                } else {
                    this.flag = false
                }
            }
        } else {
            this.flag = false
        }
        
        this.flag ? this.input.removeClass('is-invalid').addClass('is-valid') : this.input.removeClass('is-valid').addClass('is-invalid')
    }

    data() {
        return this.flag ? JSON.parse(this.input.val()) : []
    }

    put(value) {
        this.input.val(value)
        this.change()
    }

    change () {
        this.initialize()
        this.check()
    }

    check() {}

    isValidJsonString(jsonString) {    
        if(!(jsonString && typeof jsonString === 'string')) {
            return false
        }    
        try {
            JSON.parse(jsonString);
            return true
        } catch(error) {
            return false
        }    
    }
}

class Item {
    constructor(parent, items, index, parameters, header) {
        this.parent = parent; this.items = items; this.parameters = parameters; this.header = header; this.inputs = new Array()
        this.index = index;
        this.li = $('<li></li>').attr('id', 'item-body').addClass('list-group-item')
        this.li_div = $('<div></div>').addClass('input-group')
        this.li.append(this.li_div)

        this.label = $('<div></div>').addClass('input-group-prepend').append($('<span></span>').addClass('input-group-text').append(this.header))
        this.li_div.append(this.label)

        this.parameters.forEach(element => {this.inputs.push(new Input(this.li_div, element))})

        this.div_button = $('<div></div>').addClass('input-group-append')
        this.button_delete = $('<button></button>').addClass('btn btn-outline-secondary').attr('type', 'button').on('click', () => {this.clear()}).append('Delete')
        this.div_button.append(this.button_delete)
        this.li_div.append(this.div_button)

        this.parent.append(this.li)
    }

    clear() {
        this.li.remove()
        delete this.items[this.index]
        this.check()
    }
    check() {}
}

class List {
    constructor(parameters) {
        this.parameters = parameters
        this.items = new Object(); this.index = 0;

        this.button_add = $('<button></button>').addClass('btn btn-outline-primary w-100').append('Add').on('click', () => {this.add()})
        this.ul = $('<ul></ul>').addClass('list-group mt-2 mb-2')

        this.fiugre_preview = new Figure('figure-preview')
        this.card_preview = new Card('Preview')
        this.card_preview.append(this.fiugre_preview.figure)
        // this.card_preview.card.css('display', 'none')
        this.card_preview.card.hide()
        this.list = [this.button_add, this.ul, this.card_preview.card]
    }
    add() {
        this.items[this.index] = new Item(this.ul, this.items, this.index, this.parameters, 'Body')
        this.index += 1
        this.check()
        if (this.card_preview.card.css('display') == 'none') {
            this.card_preview.card.show()
            this.fiugre_preview.load()
        }
    }
    check() {}
}

class Panel {
    constructor(header, parameters) {
        this.parameters = parameters; this.header = header; this.inputs = new Array();
        this.div = $('<div></div>').addClass('input-group mt-2 mb-4')
        this.label = $('<div></div>').addClass('input-group-prepend').append($('<span></span>').addClass('input-group-text').append(this.header))
        this.div.append(this.label)
        this.parameters.forEach(element => {this.inputs.push(new Input(this.div, element))})
        this.button_run = $('<button></button>').addClass('btn btn-outline-primary w-100').append('Calculate').prop('disabled', true).on('click', () => {this.run()})
        this.panel = [this.div, this.button_run]
    }
    run () {}
    load() {
        this.button_run.empty()
        this.button_run.append([
            $('<span></span>').addClass('spinner-border spinner-border-sm').attr('role', 'status').attr('aria-hidden', true),
            ' Calculating...'
        ])
        this.button_run.prop('disabled', true)
    }
    clear() {
        this.button_run.empty()
        this.button_run.append('Calculate')
        this.button_run.prop('disabled', true)
    }
}

class SolverPanel {
    constructor(parent) {
        this.parent = parent

        this.inputs_parameters = [{'label': 'Initial coordinate vecror', 'limit': [-10, 10], 'dim': 2, 'var': 'r'}, 
            {'label': 'Initial velocity vecror', 'limit': [-10, 10], 'dim': 2, 'var': 'dr'},
            {'label': 'Mass', 'limit': [0, 10], 'dim': 1, 'var': 'm'}
        ]

        this.config_parameters = [{'label': 'Gravitational constant', 'limit': [0, 10], 'dim': 1, 'var': 'g'}, 
            {'label': 'Mesh', 'limit': [0, 1000000], 'dim': 3, 'var': 'mesh'}
        ]

        this.initial_congif_task = {'dim': 2, 'g': 1, 'mesh': [0, 5, 1000], 'points': [
            {'r': [-1, 0], 'dr': [0, 0], 'm': 5}, 
            {'r': [1, 0], 'dr': [0, 0], 'm': 1},
            {'r': [0, 1], 'dr': [0, 0], 'm': 1}
        ]}

        // this.initial_congif_task = {'dim': 3, 'g': 1, 'mesh': [0, 5, 10000], 'points': [
        //     {'r': [-1, 0, 0], 'dr': [0, 0, 0], 'm': 5}, 
        //     {'r': [1, 0, 1], 'dr': [0, 0, 0], 'm': 1},
        //     {'r': [0, 1, 1], 'dr': [0, 0, 0], 'm': 1}
        // ]}

        this.url_run = '/process'
        this.url_preview = '/preview'

        this.create_elements()
        this.initialize()
        this.create_callbacks()

    }

    create_elements() {
        this.accordion = new Accordion(this.parent, 'accordion-task-panel')
    
        this.accordion_setting = new Accordion_Item(this.accordion, 'Settings', 'accordion-task-panel-item-1')
        this.accordion_result = new Accordion_Item(this.accordion, 'Results', 'accordion-task-panel-item-2')

        this.card_dimension = new Card('Dimension')
        this.card_condition = new Card('Initial Conditions')
        this.card_solver = new Card('Solver')
    
        this.panel = new Panel('Options', this.config_parameters)
        this.list = new List(this.inputs_parameters)

        this.card_figure_trajectory = new Card('Plot Trajectory')
        this.card_figure_velocity = new Card('Plot Phase Space')

        this.radios = new Radios(['2D', '3D'], [2, 3], this.initial_congif_task.dim)

        this.figure_trajectory = new Figure('figure-trajectory')
        this.figure_velocity = new Figure('figure-velocity')

        this.card_dimension.append(this.radios.radios)
        this.accordion_setting.append(this.card_dimension.card)  

        this.card_condition.append(this.list.list)
        this.card_solver.append(this.panel.panel)
    
        this.card_figure_trajectory.append(this.figure_trajectory.figure)
        this.card_figure_velocity.append(this.figure_velocity.figure)
    
        this.accordion_setting.append(this.card_dimension.card)
        this.accordion_setting.append(this.card_condition.card)
        this.accordion_setting.append(this.card_solver.card)
    
        this.accordion_result.append(this.card_figure_trajectory.card)
        this.accordion_result.append(this.card_figure_velocity.card)
    }

    check () {
        let flag = true
        Object.entries(this.list.items).forEach(
            ([key, item]) => {
                item.inputs.forEach(input => {
                    flag = input.flag && flag 
                })
            }
        )
        
        this.panel.inputs.forEach(input => {
            flag = input.flag && flag 
        })
            
        this.panel.button_run.prop('disabled', !(flag && !(Object.keys(this.list.items).length === 0 && this.list.items.constructor === Object)))

        this.plot_preview()

    }

    create_callbacks() {

        Radios.prototype.change = (value) => {
            this.inputs_parameters[0].dim = value
            this.inputs_parameters[1].dim = value
            Object.entries(this.list.items).forEach(
                ([key, item]) => {
                    item.inputs.forEach(input => {
                        input.change()
                    })
                }
            )
        }

        Input.prototype.check = () => {this.check()}
        Item.prototype.check = () => {this.check()}
        List.prototype.check = () => {this.check()}

        Panel.prototype.run = () => {

            let request = {'method': 'POST', 'headers': {'Content-Type': 'application/json'}, 
                'body': JSON.stringify(this.get_data())}

            this.accordion_setting.accordion_item_body.collapse('hide')
            this.accordion_result.accordion_item_body.collapse('show')

            this.panel.load()

            this.figure_trajectory.load()
            this.figure_velocity.load()

            fetch(this.url_run, request).then(response => response.json()).then(json => {
                this.figure_trajectory.clear()
                this.figure_trajectory.plot(JSON.parse(json[0]))
                
                this.figure_velocity.clear()
                this.figure_velocity.plot(JSON.parse(json[1])) 

                this.panel.clear()
                this.check()
            })

        }

    }

    get_data() {
        let data = {'points': new Array(), 'dim': this.radios.value}
        Object.entries(this.list.items).forEach(
            ([key, item]) => {
                let temporary = new Object()
                item.inputs.forEach(input => {
                    temporary[input.parameter.var] = input.data()
                })
                data['points'].push(temporary)
            }
        )
        this.panel.inputs.forEach(input => {
            data[input.parameter.var] = input.data()
        })
        return data
    }

    plot_preview() {
        
        if (Object.keys(this.list.items).length === 0 && this.list.items.constructor === Object) {
            this.list.card_preview.card.hide()
        }
        else {
            let points = this.get_data()['points']
            if (!(points.length == 1 && points[0].r.length == 0)) {
                let request = {'method': 'POST', 'headers': {'Content-Type': 'application/json'}, 
                    'body': JSON.stringify(points)}

                fetch(this.url_preview, request).then(response => response.json()).then(json => {
                    this.list.fiugre_preview.clear()
                    this.list.fiugre_preview.plot(json)
                })
            }

        }

    }

    initialize() {
        this.radios.change(this.initial_congif_task.dim)
        this.panel.inputs.forEach(input => {
            input.put(JSON.stringify(this.initial_congif_task[input.parameter.var]))
        })
        for (let i = 0; i < this.initial_congif_task.points.length; i++) {
            this.list.add()
            this.list.items[i].inputs.forEach(input => {
                input.put(JSON.stringify(this.initial_congif_task.points[i][input.parameter.var]))
            })
        }
        this.check()
        this.accordion_setting.accordion_item_body.collapse('show')
    }

}

export {SolverPanel}