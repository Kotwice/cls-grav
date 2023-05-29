class Card {
    constructor(header) {
        this.header = header; this.body = new Array()
        this.card = $('<div></div>').addClass('card')
        this.card_header = $('<h5></h5>').addClass('card-header text-center').append(this.header)
        this.card_body = $('<div></div>').addClass('card-body')
        this.card.append(this.card_header, this.card_body)
    }
    append(body) {
        this.body.push(body);
        this.card_body.append(body)
    }
}

class Input {
    constructor() {
        this.id = 'input-name'; this.state = false;
        this.form = $('<form></form>').addClass('form-floating')
        this.input = $('<input></input>').addClass('form-control').attr('id', this.id).on('blur', () => {this.change()})
        this.label = $('<label></label>').attr('for', this.id).append('Your alias')
        this.form.append([this.input, this.label])
    }
    change() {
        this.input.val() == "" ? this.state = false : this.state = true
        this.state ? this.input.removeClass('is-invalid').addClass('is-valid') : 
            this.input.removeClass('is-valid').addClass('is-invalid')
        this.event()
    }
    event() {}
}

class Login {
    constructor(parent) {
        this.parent = parent

        this.div = $('<div></div>').addClass('container')

        this.card = new Card('Sign-In')
        this.input = new Input()

        this.button = $('<button></button>').addClass('btn btn-outline-primary w-100').append('Continue')
            .prop('disabled', true).on('click', () => {this.pass()})

        Input.prototype.event = () => {
            this.button.prop('disabled', !this.input.state)
        }

        this.card.append(this.input.form)
        this.card.append(this.button)
        this.div.append(this.card.card)

        this.parent.append(this.div)
    }
    pass() {
        this.div.remove()
        this.event()
    }
    event() {}
}

export {Login}