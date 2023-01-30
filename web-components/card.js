addCard()

function addCard() {
    const html = (strings, ...values) => String.raw({ raw: strings }, ...values)

    const cardTemplate = (title, imgsrc, cta) => html`
        <style>
        .card {
            width: 300px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            border-radius: 5px;
            overflow: hidden;
            margin: 20px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .card h3 {
            margin-top: 20px;
            font-size: 24px;
            text-align: center;
        }

        .card p {
            margin: 20px;
            font-size: 14px;
            text-align: center;
            color: #666;
        }

        .card .cta-button {
            background-color: #0366d6;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-align: center;
            margin-top: auto;
            cursor: pointer;
        }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
        </style>
        <div class="card">
            <img src="${imgsrc}" alt="${title}">
            <h3>${title}</h3>
            <p>
                <slot></slot>
            </p>
            <button class="cta-button">${cta}</button>
        </div>
    `

    class Card extends HTMLElement {
        constructor() {
            super()
            const shadow = this.attachShadow({ mode: 'open' })

            const title = this.getAttribute('title')
            const cta = this.getAttribute('cta')
            const imgsrc = this.getAttribute('imgsrc')

            const template = document.createElement('template')
            template.innerHTML = cardTemplate(title, imgsrc, cta)
            shadow.append(template.content.cloneNode(true))
        }

    }

    customElements.define("card-element", Card)
}

