class Offcanvas {
    constructor() {
        this.id = 'sidebar'
        this.offcanvas = $('<div></div>').addClass('offcanvas offcanvas-start').attr('tabindex', '-1')
            .attr('id', this.id).attr('aria-labelledby', 'offcanvasLabel')
        this.offcanvas_header = $('<div></div>').addClass('offcanvas-header').append(
            [
                $('<h5></h5>').addClass('offcanvas-title').attr('id', this.offcanvas.attr('aria-labelledby')).append('Menu'),
                $('<button></button>').addClass('btn-close').attr('type', 'button')
                    .attr('data-bs-dismiss', 'offcanvas').attr('aria-label', 'Close')
                    .attr('data-bs-target', '#' + this.offcanvas.attr('id'))
            ]
        )
        this.offcanvas_body = $('<div></div>').addClass('offcanvas-body')
        this.offcanvas.append([this.offcanvas_header, this.offcanvas_body])
    }
    append(body) {
        this.offcanvas_body.append(body)
    }
    show() {
        this.offcanvas.addClass('show')
    }
    hide() {
        this.offcanvas.removeClass('show')
    }

}

class Menu {
    constructor(parent) {
        this.parent = parent
        this.offcanvas = new Offcanvas()
        this.offcanvas.append('123123123')

        this.aside = $('<aside></aside>').append(this.offcanvas.offcanvas)
        this.parent.append(this.aside)
    }
    show() {
        this.offcanvas.show()
    }
}

export {Menu}