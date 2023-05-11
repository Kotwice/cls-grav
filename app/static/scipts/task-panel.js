class Card {
    constructor(header) {
        this.header = header; this.body = new Array()
        this.card = $('<div></div>').addClass('card mt-2 mb-5')
        this.card_header = $('<h5></h5>').addClass('card-header').append(this.header)
        this.card_body = $('<div></div>').addClass('card-body')
        this.card.append(this.card_header, this.card_body)
    }
    insert(body) {
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
    insert(item) {
        this.item.push(item)
        this.accordion.append(item)
    }
}

class Accordion_Item {
    constructor(header, id, id_parent) {
        this.header = header; this.id = id; this.id_parent = id_parent; this.body = new Array()
        this.accordion_item = $('<div></div>').addClass('accordion-item').attr('id', this.id_parent)
        this.accordion_item_header = $('<h2></h2>').addClass('accordion-header').append(
            $('<button></button>').addClass('accordion-button').attr('type', 'button')
                .attr('data-bs-toggle', 'collapse').attr('data-bs-target', '#' + this.id)
                .attr('aria-expanded', 'true').attr('aria-controls', this.id).append(this.header)
        )
        this.accordion_item_body = $('<div></div>').addClass('accordion-collapse collapse')
            .attr('id', this.id).attr('data-bs-parent', this.id_parent)
        this.div_body = $('<div></div>').addClass('accordion-body')
        this.accordion_item_body.append(this.div_body)
        this.accordion_item.append(this.accordion_item_header, this.accordion_item_body)
    }
    insert(body) {
        this.body.push(body);
        this.div_body.append(this.body)
    }
}

class Radio {
    constructor(header, state) {
        this.header = header; this.state = state;
        this.label = $('<label></label>').addClass('btn btn-primary w-50').attr('for', 'radio-' + this.header).append(this.header)
        this.input = $('<input>').addClass('btn-check').attr('type', 'radio').attr('name', 'options')
            .attr('id', 'radio-' + this.header).attr('autocomplete', 'off')
            .on('change', () => {this.change()})
        this.state ? this.input.prop('checked') : []
        this.radio = [this.label, this.input]
    }
    change () {
        console.log('radio event')
    }
}

class Figure {
    constructor(id) {
        this.id = id
        this.figure = $('<div></div>').addClass('container-fluid').attr('id', this.id)
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
        this.change()
    }

    data() {
        return this.flag ? JSON.parse(this.input.val()) : null
    }

    change () {
        let line = this.input.val()
        if (this.isValidJsonString(line)) {
            let object = JSON.parse(line) 
            if (object.length == this.parameter.dim) {
                for (let index in object) {
                    let value = object[index]
                    this.flag = (!isNaN(value)) ? ((value >= this.parameter.limit[0] && value <= this.parameter.limit[1]) ? true : false) : false
                }
            } else {
                this.flag = false
            }

        } else {
            this.flag = false
        }
        this.flag ? this.input.removeClass('is-invalid').addClass('is-valid') : this.input.removeClass('is-valid').addClass('is-invalid')
    }

    isValidJsonString(jsonString) {    
        if(!(jsonString && typeof jsonString === "string")) {
            return false;
        }    
        try {
            JSON.parse(jsonString);
            return true;
        } catch(error) {
            return false;
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
        console.log(this.items)
        // this.form.update_inputs()
        // this.form.change()
    }
}

class List {
    constructor(parameters) {
        this.parameters = parameters
        this.items = new Object(); this.index = 0;

        this.button_add = $('<button></button>').addClass('btn btn-outline-primary w-100').append('Add').on('click', () => {this.add()})
        this.ul = $('<ul></ul>').addClass('list-group mt-2 mb-2')
        this.list = [this.button_add, this.ul]
    }
    add() {
        this.items[this.index] = new Item(this.ul, this.items, this.index, this.parameters, 'Body')
        console.log(this.items)
        this.index += 1
    }
}

class Panel {
    constructor() {
        this.button_run = $('<button></button>').addClass('btn btn-outline-primary w-100').append('Calculate').prop('disabled', false).on('click', () => {this.run()})
    }
    run () {
        console.log('run')
    }
}

class SolverPanel {
    constructor(parent) {

        this.accordion = new Accordion(parent, 'accordion-task-panel')
    
        this.accordion_setting = new Accordion_Item('Settings', 'accordion-task-panel-item-1', this.accordion.id)
        this.accordion_result = new Accordion_Item('Results', 'accordion-task-panel-item-2', this.accordion.id)
    
        this.card_dimension = new Card('Dimension')
        this.card_condition = new Card('Initial Conditions')
        this.card_solver = new Card('Solver')
    
        this.panel = new Panel()

        this.card_figure_trajectory = new Card('Plot Trajectory')
        this.card_figure_velocity = new Card('Plot Phase Space')
    
        this.radio_2d = new Radio('2D', true)
        this.radio_3d = new Radio('3D', true)
    
        this.figure_trajectory = new Figure('figure-trajectory')
        this.figure_velocity = new Figure('figure-velocity')
    
        this.inputs_parameters = [{'label': 'Initial coordinate vecror', 'limit': [-10, 10], 'dim': 2}, 
            {'label': 'Initial velocity vecror', 'limit': [-10, 10], 'dim': 2},
            {'label': 'Mass', 'limit': [0, 10], 'dim': 1}
        ]
    
        // this.radio_2d.change = () => {
        //     console.log('radio-2d')
        //     // this.inputs_parameters[0].dim = 2;
        //     // this.inputs_parameters[1].dim = 2;
        //     // this.inputs_parameters
        // }
        // this.radio_3d.change = () => {
        //     console.log('radio-3d')
        //     // this.inputs_parameters[0].dim = 3;
        //     // this.inputs_parameters[1].dim = 3;
        //     // this.inputs_parameters
        // }

        this.list_point = new List(this.inputs_parameters)

        this.card_dimension.insert(this.radio_2d.radio)
        this.card_dimension.insert(this.radio_3d.radio)
        this.card_condition.insert(this.list_point.list)
        this.card_solver.insert(this.panel.button_run)
    
        this.card_figure_trajectory.insert(this.figure_trajectory.figure)
        this.card_figure_velocity.insert(this.figure_velocity.figure)
    
        this.accordion_setting.insert(this.card_dimension.card)
        this.accordion_setting.insert(this.card_condition.card)
        this.accordion_setting.insert(this.card_solver.card)
    
        this.accordion_result.insert(this.card_figure_trajectory.card)
        this.accordion_result.insert(this.card_figure_velocity.card)
    
        this.accordion.insert(this.accordion_setting.accordion_item)
        this.accordion.insert(this.accordion_result.accordion_item)

        this.panel.run = () => {console.log('run2')}
    }
}

export {Card, Accordion, Accordion_Item, Radio, Figure, List, Item, Input, SolverPanel}