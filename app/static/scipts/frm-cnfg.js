class Input {
    constructor(item, label) {
        this.item = item; this.label = label; this.flag = false
        this.input = $('<input>').attr('type', 'text').addClass('form-control').attr('placeholder', this.label).on('blur', () => {this.change()})
        this.item.li_div.append(this.input)
        this.change()
    }

    data() {
        return this.flag ? JSON.parse(this.input.val()) : null
    }

    change () {
        let line = this.input.val()
        if (this.isValidJsonString(line)) {
            let object = JSON.parse(line) 
            if (object.length == this.item.form.parameter.length) {
                for (let index in object) {
                    let value = object[index]
                    this.flag = (!isNaN(value)) ? ((value >= this.item.form.parameter.limit[0] && value <= this.item.form.parameter.limit[1]) ? true : false) : false
                }
            } else {
                this.flag = false
            }

        } else {
            this.flag = false
        }
        this.flag ? this.input.removeClass('is-invalid').addClass('is-valid') : this.input.removeClass('is-valid').addClass('is-invalid')
        this.item.form.change()
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
    constructor(form) {
        this.form = form; this.index = this.form.index

        this.li = $('<li></li>').attr('id', 'item-body').addClass('list-group-item')
        this.li_div = $('<div></div>').addClass('input-group')
        this.label = $('<div></div>').addClass('input-group-prepend').append($('<span></span>').addClass('input-group-text').append('Body'))
        this.div_button = $('<div></div>').addClass('input-group-append')
        this.button = $('<button></button>').addClass('btn btn-outline-secondary').attr('type', 'button').on('click', () => {this.destructor()}).append('Delete')

        this.li.append(this.li_div)
        this.div_button.append(this.button)
        this.li_div.append(this.label)

        this.inputs = new Array()
        this.form.inputs_parameters.forEach(element => {
            this.inputs.push(new Input(this, element['label']))
        })

        this.li_div.append(this.div_button)
        this.form.ul.append(this.li)
    }

    destructor() {
        this.li.remove()
        delete this.form.items[this.index]
        this.form.update_inputs()
        this.form.change()
    }
}

class Radio {
    constructor(form, text, value) {
        this.form = form; this.text = text; this.value = value;
        this.label = $('<label></label>').addClass('btn btn-primary w-50').attr('for', 'radio-' + this.text).append(this.text)
        this.radio = $('<input>').addClass('btn-check').attr('type', 'radio').attr('name', 'options').attr('id', 'radio-' + this.text).attr('autocomplete', 'off')
            .on('change', () => {this.change()}).prop('checked', this.form.parameter.length == this.value)
        this.form.li_radio.append(this.radio, this.label)
    }
    change () {
        this.form.parameter.length = this.value
        this.form.update_inputs()
    }
}

class Figure {
    constructor(form, data, id) {
        this.form = form
        this.data = data
        this.id = 'figure-result-' + id

        this.figure = $('<div></div>').addClass('container-fluid').attr('id', this.id )
        this.form.parent.append(this.figure)

        Plotly.newPlot(this.id, this.data)
    }
}

class Form {
    constructor(parent) {
        this.parameter = {'limit': [-10, 10], 'length': 2}
        this.inputs_parameters = [{'label': 'Initial coordinate vecror'}, {'label': 'Initial velocity vecror'}]
        this.radios_parameters = [{'label': '2D', 'value': 2}, {'label': '3D', 'value': 3}]

        this.url = '/run'

        this.items = new Object()
        this.index = 0
        this.parent = parent
        this.ul = $('<ul></ul>').addClass('list-group')
        this.li_radio = $('<li></li>').addClass('list-group-item').append($('<div></div>').addClass('d-flex justify-content-center'))
        
        this.radios = new Array()
        this.radios_parameters.forEach(element => {
            this.radios.push(new Radio(this, element['label'], element['value']))
        })
        
        this.button_run =  $('<button></button>').addClass('btn btn-outline-primary w-100').append('Calculate').prop('disabled', true).on('click', () => {this.run()})
        this.button_add = $('<button></button>').addClass('btn btn-outline-primary w-100').append('Add').on('click', () => {this.add()})

        this.li_button_add = $('<li></li>').addClass('list-group-item').append(this.button_add)
        this.li_button_run = $('<li></li>').addClass('list-group-item').append(this.button_run)

        this.ul.append(this.li_radio, this.li_button_add, this.li_button_run)
        this.parent.append(this.ul)

    }

    data () {
        let data = new Array()
        for (let key in this.items) {
            let body = new Array()
            this.items[key].inputs.forEach(input => {
                body.push(input.data())
            })
            data.push(body)
        }
        return data
    }

    add() {
        this.items[this.index] = new Item(this)
        this.index += 1
        this.change()
    }

    run() {

        let congif_task = {'dim': 2, 'g': 1, 'mesh': [0, 5, 10000], 'point': [
            {'r': [-10, 0], 'dr': [0, 0], 'm': 5}, 
            {'r': [1, 0], 'dr': [0, 0], 'm': 1},
            {'r': [0, 1], 'dr': [0, 0], 'm': 1}
        ]}

        let request = {'method': 'POST', 'headers': {'Content-Type': 'application/json'}, 
            'body': JSON.stringify(congif_task)}

        console.log(JSON.stringify(this.data()))

        fetch(this.url, request).then(response => response.json()).then(json => {
            console.log(json)
            this.figure_result = new Object()
            this.figure_result_index = 0
            for (let data in json) {
                console.log(json[data])
                this.figure_result[this.figure_result_index] = new Figure(this, JSON.parse(json[data]), this.figure_result_index)
                this.figure_result_index = this.figure_result_index + 1
            }
            // this.figure_result = $('<div></div>').addClass('container-fluid').attr('id', 'figure-result')
            // this.parent.append(this.figure_result)
            // Plotly.newPlot('figure-result', json)
        })
    }

    update_inputs() {
        for (let key in this.items) {
            this.items[key].inputs.forEach(input => {
                input.change()
            })
        }
    }

    change() {
        this.flag = !jQuery.isEmptyObject(this.items)
        for (let key in this.items) {
            this.items[key].inputs.forEach(input => {
                this.flag = this.flag && input.flag
            })
        }
        this.flag ? this.button_run.prop('disabled', false) : this.button_run.prop('disabled', true)
    }

}

export {Form};