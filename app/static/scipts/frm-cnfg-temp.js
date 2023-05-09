// class Input {
//     constructor(parent, label, parameter, checkForm) {
//         this.parent = parent; this.label = label; this.parameter = parameter; this.checkForm = checkForm; this.flag
//         this.input = $('<input>').attr('type', 'text').addClass('form-control is-invalid').attr('placeholder', this.label).on('blur', () => {this.isValid()})
//         this.isValid()
//         this.parent.append(this.input)
//     }

//     data() {
//         return this.flag ? JSON.parse(this.input.val()) : null
//     }

//     isValid () {
//         let line = this.input.val()
//         if (this.isValidJsonString(line)) {
//             let object = JSON.parse(line) 
//             if (object.length == this.parameter.length) {
//                 for (let index in object) {
//                     let value = object[index]
//                     this.flag = (!isNaN(value)) ? ((value >= this.parameter.limit[0] && value <= this.parameter.limit[1]) ? true : false) : false
//                 }
//             } else {
//                 this.flag = false
//             }

//         } else {
//             this.flag = false
//         }
//         this.flag ? this.input.removeClass('is-invalid').addClass('is-valid') : this.input.removeClass('is-valid').addClass('is-invalid')
//         // this.checkForm()
//         // this.flag ? this.button.prop('disabled', false) : this.button.prop('disabled', true)
//     }

//     isValidJsonString(jsonString) {    
//         if(!(jsonString && typeof jsonString === "string")) {
//             return false;
//         }    
//         try {
//             JSON.parse(jsonString);
//             return true;
//         } catch(error) {
//             return false;
//         }    
//     }
// }

class Input {
    constructor(parent, label) {
        this.parent = parent; this.label = label; this.flag
        this.input = $('<input>').attr('type', 'text').addClass('form-control is-invalid').attr('placeholder', this.label).on('blur', () => {this.isValid()})
        this.isValid()
        this.parent.div.append(this.input)
    }

    data() {
        return this.flag ? JSON.parse(this.input.val()) : null
    }

    isValid () {
        let line = this.input.val()
        if (this.isValidJsonString(line)) {
            let object = JSON.parse(line) 
            if (object.length == this.parent.parent.parameter.length) {
                for (let index in object) {
                    let value = object[index]
                    this.flag = (!isNaN(value)) ? ((value >= this.parent.parent.parameter.limit[0] && value <= this.parent.parent.parameter.limit[1]) ? true : false) : false
                }
            } else {
                this.flag = false
            }

        } else {
            this.flag = false
        }
        this.flag ? this.input.removeClass('is-invalid').addClass('is-valid') : this.input.removeClass('is-valid').addClass('is-invalid')
        // this.checkForm()
        // this.flag ? this.button.prop('disabled', false) : this.button.prop('disabled', true)
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

// class Item {
//     constructor(parent, items, index, parameter, checkForm) {
//         this.parent = parent; this.parameter = parameter; this.checkForm = checkForm;
//         this.items = items; this.index = index

//         this.li = $('<li></li>').attr('id', 'item-body').addClass('list-group-item')
//         this.div = $('<div></div>').addClass('input-group')

//         this.label = $('<div></div>').addClass('input-group-prepend').append($('<span></span>').addClass('input-group-text').append('Body'))

//         this.button = $('<div></div>').addClass('input-group-append').append(
//             $('<button></button>').addClass('btn btn-outline-secondary').attr('type', 'button').on('click', () => {this.destructor()})
//             .append('Delete')
//         )

//         this.li.append(this.div)
//         this.div.append(this.label)
//         this.inputs = [new Input(this.div, 'Initial coordinate vecror', this.parameter, this.checkForm), 
//             new Input(this.div, 'Initial velocity vecror', this.parameter, this.checkForm)]
//         this.div.append(this.button)

//         this.parent.append(this.li)

//     }
//     destructor() {
//         this.li.remove()
//         delete this.items[this.index]
//         for (let key in this.items) {
//             this.items[key].inputs.forEach(input => {
//                 input.isValid()
//             })
//         }  
//     }
// }

class Item {
    constructor(parent) {
        this.parent = parent;

        this.li = $('<li></li>').attr('id', 'item-body').addClass('list-group-item')
        this.div = $('<div></div>').addClass('input-group')

        this.label = $('<div></div>').addClass('input-group-prepend').append($('<span></span>').addClass('input-group-text').append('Body'))

        this.button = $('<div></div>').addClass('input-group-append').append(
            $('<button></button>').addClass('btn btn-outline-secondary').attr('type', 'button').on('click', () => {this.destructor()})
            .append('Delete')
        )

        this.li.append(this.div)
        this.div.append(this.label)
        this.inputs = [new Input(this, 'Initial coordinate vecror'), new Input(this, 'Initial velocity vecror')]
        this.div.append(this.button)

        this.parent.ul.append(this.li)

    }
    destructor() {
        this.li.remove()
        delete this.parent.items[this.index]
        for (let key in this.items) {
            this.parent.items[key].inputs.forEach(input => {
                input.isValid()
            })
        }  
    }
}

// class Radio {
//     constructor(parent, items, label, parameter, value) {
//         this.parent = parent; this.items = items; this.label = label; this.parameter = parameter; this.value = value;
//         this.radio = [$('<input>').addClass('btn-check').attr('type', 'radio').attr('name', 'options').attr('id', 'radio-' + this.label).attr('autocomplete', 'off'), 
//             $('<label></label>').addClass('btn btn-primary w-50').attr('for', 'radio-' + this.label).append(this.label)]
//         parameter.length == value ? this.radio[0].prop('checked', true) : this.radio[0].prop('checked', false)
//         this.parent.append(this.radio)
//         this.radio[0].on('change', () => {
//             this.parameter.length = this.value
//             // this.items.forEach(item => {
//             //     item.inputs.forEach(input => {
//             //         input.checkValues()
//             //     })
//             // })
//             for (let key in this.items) {
//                 this.items[key].inputs.forEach(input => {
//                     input.isValid()
//                 })
//             }    
//         })
//     }
// }

class Radio {
    constructor(parent, label, value) {
        this.parent = parent; this.label = label; this.value = value;
        this.radio = [$('<input>').addClass('btn-check').attr('type', 'radio').attr('name', 'options').attr('id', 'radio-' + this.label).attr('autocomplete', 'off'), 
            $('<label></label>').addClass('btn btn-primary w-50').attr('for', 'radio-' + this.label).append(this.label)]
        this.parent.parameter.length == value ? this.radio[0].prop('checked', true) : this.radio[0].prop('checked', false)
        this.parent.li_radio.append(this.radio)
        this.radio[0].on('change', () => {
            this.parent.parameter.length = this.value
            for (let key in this.parent.items) {
                this.parent.items[key].inputs.forEach(input => {
                    input.isValid()
                })
            }    
        })
    }
}

class Form_Config {
    constructor(parent) {
 
        this.parent = parent

        this.build()

    }

    build () {

        this.items = new Object()
        this.index = 0;

        this.parameter = {'limit': [-10, 10], 'length': 2}

        this.ul = $('<ul></ul>').addClass('list-group')
        this.li_radio = $('<li></li>').addClass('list-group-item').append($('<div></div>').addClass('d-flex justify-content-center'))

        // this.radios = [new Radio(this.li_radio, this.items, '2D', this.parameter, 2), new Radio(this.li_radio, this.items, '3D', this.parameter, 3)]
        this.radios = [new Radio(this, '2D', 2), new Radio(this, '3D', 3)]

        this.button_run =  $('<button></button>').addClass('btn btn-outline-primary w-100').append('Calculate').prop('disabled', true)

        this.li_button = $('<li></li>').addClass('list-group-item').append(
            $('<button></button>').addClass('btn btn-outline-primary w-100').append('Add').on('click', () => {
                // this.items[this.index] = new Item(this.ul, this.items, this.index, this.parameter, this.checkForm)
                this.items[this.index] = new Item(this)
                this.index += 1
                console.log(this.items)
            })
        )

        this.ul.append(this.li_radio, this.li_button, $('<li></li>').addClass('list-group-item').append(this.button_run))

        this.parent.append(this.ul)
    }

    checkForm() {
        this.flag_global = false
        if (this.items != undefined) {
            for (let key in this.items) {
                items[key].inputs.forEach(input => {
                    this.flag_global = this.flag_global && input.flag
                })
            }  
        }
        this.flag_global ? this.button_run.prop('disabled', false) : this.button_run.prop('disabled', true)
    }

}

export {Form_Config};