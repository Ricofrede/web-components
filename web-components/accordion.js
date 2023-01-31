addCustomAccordion()

function addCustomAccordion() {
    const html = (strings, ...values) => String.raw({ raw: strings }, ...values)

    const itemTemplate = (title, number, content) => html`
        <p class="number">${number}</p>
        <p class="text">${title}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <div class="hidden-box">
            ${content}
        </div>
    `

    const accordionTemplate = (content) => html`
        <style>
        .accordion {
            width: 700px;
            margin: 100px auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .item {
            display: grid;
            grid-template-columns: auto 1fr auto;
            padding: 24px;
            align-items: center;
            column-gap: 24px;
            row-gap: 32px;
            border-top: 4px solid transparent;
        }

        .number {
            color: #ced4da;
        }

        .number,
        .text {
            font-size: 24px;
            font-weight: 500;
        }

        .icon {
            width: 24px;
            height: 24px;
            stroke: #087f5b;
            cursor: pointer;
        }

        .hidden-box {
            grid-column: 2;
            display: none;
        }

        .hidden-box p {
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .hidden-box ul {
            color: #868e96;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-left: 20px;
        }

        .open {
            border-top: 4px solid #087f5b;
        }

        .open .number,
        .open .text {
            color: #087f5b;
        }

        .open .hidden-box {
            display: block;
        }

        .icon-rotate {
            transform: rotate(180deg);
            transition: 0.3s;
        }
        </style>
        <div class='accordion'>
            ${content}
        </div>
    `

    class CustomAccordionItem extends HTMLElement {
        constructor() {
            super()
            const title = this.getAttribute('title')
            const number = this.getAttribute('number')
            const content = this.innerHTML

            this.classList.add('item')
            if (!this.querySelector('.icon')) {
                this.innerHTML = itemTemplate(title, number, content)
            }
        }

    }

    class CustomAccordion extends HTMLElement {
        constructor() {
            super()

            const content = this.innerHTML
            this.innerHTML = accordionTemplate(content)

            const iconUpDown = this.querySelectorAll(".icon");
            iconUpDown.forEach(icon => {
                icon.addEventListener("click", e => {
                    icon.classList.toggle("icon-rotate")
                    icon.parentElement.classList.toggle("open");
                })
            })
        }

    }

    customElements.define("custom-accordion-item", CustomAccordionItem)
    customElements.define("custom-accordion", CustomAccordion)
}

