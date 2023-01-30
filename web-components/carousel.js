addCustomCarousel()

function addCustomCarousel() {
    const html = (strings, ...values) => String.raw({ raw: strings }, ...values)

    const itemTemplate = (content) => html`
        <li class="slide">
            ${content}
        </li>
    `

    const carouselTemplate = (title, content, showscrollbar) => html`
        <style>
        .slider-wrapper {
            margin: 1rem;
            position: relative;
            overflow: hidden;
        }

        .slides-container {
            height: 100%;
            width: 100%;
            display: flex;
            overflow: scroll;
            scroll-behavior: smooth;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .slide-arrow {
            position: absolute;
            display: flex;
            top: 0;
            bottom: 0;
            margin: auto;
            height: 4rem;
            background-color: white;
            border: none;
            width: 2rem;
            font-size: 3rem;
            padding: 0;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 100ms;
        }

        .slide-arrow:hover,
        .slide-arrow:focus {
            opacity: 1;
        }

        #slide-arrow-prev {
            left: 0;
            padding-left: 0.25rem;
            border-radius: 0 2rem 2rem 0;
        }

        #slide-arrow-next {
            right: 0;
            padding-left: 0.75rem;
            border-radius: 2rem 0 0 2rem;
        }

        custom-carousel-item {
            width: 100%;
            height: 100%;
            flex: 1 0 100%;
        }

        ${!showscrollbar ? `
        .slides-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        .slides-container::-webkit-scrollbar { 
            width: 0;
            height: 0;
        }
        `: ''}
        </style>
        <h3>${title}</h3>
        <section class="slider-wrapper">
            <button class="slide-arrow" id="slide-arrow-prev">&#8249;</button>
            <button class="slide-arrow" id="slide-arrow-next">&#8250;</button>
            <ul class="slides-container" id="slides-container">
                ${content}
            </ul>
        </section>
    `

    class CustomCarouselItem extends HTMLElement {
        constructor() {
            super()
            const content = this.innerHTML
            this.innerHTML = itemTemplate(content)
        }

    }

    class CustomCarousel extends HTMLElement {
        constructor() {
            super()

            const title = this.getAttribute('title')
            const showscrollbar = !!this.getAttribute('showscrollbar')
            const content = this.innerHTML

            this.innerHTML = carouselTemplate(title, content, showscrollbar)

            const slidesContainer = this.querySelector("#slides-container");
            const slide = this.querySelector(".slide");
            const prevButton = this.querySelector("#slide-arrow-prev");
            const nextButton = this.querySelector("#slide-arrow-next");

            nextButton.addEventListener("click", () => {
                const slideWidth = slide.clientWidth;
                slidesContainer.scrollLeft += slideWidth;
            });

            prevButton.addEventListener("click", () => {
                const slideWidth = slide.clientWidth;
                slidesContainer.scrollLeft -= slideWidth;
            });
        }

    }

    customElements.define("custom-carousel-item", CustomCarouselItem)
    customElements.define("custom-carousel", CustomCarousel)
}

