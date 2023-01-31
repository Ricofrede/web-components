addCustomAccordion()

function addCustomAccordion() {
    const html = (strings, ...values) => String.raw({ raw: strings }, ...values)

    const itemTemplate = (title, content) => html`
        <h4 class='accordion-header'>${title}</h4>
        <div class='accordion-body'>${content}</div>
    `

    const accordionTemplate = (content) => html`
        <style>
        .accordion-header {
            margin: 0;
        }

        .accordion-item .accordion-body {
            height: 0;
            opacity: 0;
            background-color: #F4F4F4;
            transition: all 400ms ease;
        }

        .accordion-item {
            list-style: none;
            width: 200px;
        }

        .accordion-item .accordion-header {
            background-color: #B2EFFF;
        }

        .accordion-item .accordion-header.active+.accordion-body {
            display: block;
            height: 40px;
            opacity: 1;
        }
        </style>
        <div class='accordion-wrapper'>
            ${content}
        </div>
    `

    class CustomAccordionItem extends HTMLElement {
        constructor() {
            super()
            const title = this.getAttribute('title')
            const content = this.innerHTML

            this.classList.add('accordion-item')
            if (!this.querySelector('.accordion-header')) {
                this.innerHTML = itemTemplate(title, content)
            }
        }

    }

    class CustomAccordion extends HTMLElement {
        constructor() {
            super()

            const content = this.innerHTML
            this.innerHTML = accordionTemplate(content)

            const headers = this.querySelectorAll('.accordion-header');
            function closeAll() {
                headers.forEach(header => header.classList.remove('active'))
            }
            headers.forEach(header => {
                header.addEventListener('click', function () {
                    if (!header.classList.contains('active')) closeAll()
                    header.classList.toggle('active')
                })
            })
        }

    }

    customElements.define("custom-accordion-item", CustomAccordionItem)
    customElements.define("custom-accordion", CustomAccordion)
}

