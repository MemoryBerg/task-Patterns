const defaultConfig = {
    delay: 2000,
    container: null,
    sliderWrapper: null,
    next: null,
    prev: null,
    visibleSlides: 1
};

const Slider = function (config) {
    this.config = Object.assign(defaultConfig, config);
    const { container, sliderWrapper, slide, next, prev } = this.config;
    this.container = Slider.getElement(container);
    this.sliderWrapper = Slider.getElement(sliderWrapper);
    this.sliderArray = Array.from(this.sliderWrapper.getElementsByClassName(slide));

    this.buttonNext = Slider.getElement(next);
    this.buttonPrev = Slider.getElement(prev);
    this.slidesNumber = this.sliderArray.length - 1;
    this.stopSlider = false;
    this.test = 0;
    if (this.sliderArray.length < this.config.visibleSlides + 2) {
        throw new Error('Too less slides for sliding. Please add more slides')
    }

    this.onLoad();
    this.infinity();
};

Slider.getElement = (element) => {
    let currentElement
    if (element) {
        currentElement = typeof element === 'string'
            ? document.querySelector(element)
            : element;
        if (!currentElement) {
            throw new Error('Wrong element selector');
        }
    } else {
        throw new Error('No selector');
    }
    return currentElement;
};


Slider.previous = 1;
Slider.next = -1;

Slider.prototype.onLoad = function () {
    this.slideWidth = this.container.clientWidth / this.config.visibleSlides;
    this.sliderWrapper.style.width = `${this.sliderArray.length * this.slideWidth}px`;
    this.sliderWrapper.style.height = `${this.container.clientHeight}px`;

    this.sliderArray.forEach(({ style }) => {
        style.width = `${this.slideWidth}px`;
        style.height = `${this.container.clientHeight}px`;
    });
    this.sliderWrapper.style.transform = `translateX(${-this.slideWidth}px)`;
    this.moveElement(Slider.next);
};

Slider.prototype.moveElement = function (direction) {
    let index = this.slidesNumber;

    for (let count = 0; count < this.sliderArray.length; count++) {
        this.sliderArray[index].style.transform = `translateX(${count * this.slideWidth}px)`;
        index = this.calcNewIndex(index, direction);
    }
};

Slider.prototype.calcNewIndex = function (index, direction) {
    let currentIndex;
    if (direction === Slider.next) {
        currentIndex = index === this.sliderArray.length - 1 ? 0 : index + 1;
    } else {
        currentIndex = index === 0 ? this.sliderArray.length - 1 : index - 1;
    }
    return currentIndex;
};


Slider.prototype.infinity = function () {
    this.buttonNext.addEventListener('click', () => {
        this.moveSlider(Slider.next);
    });
    this.buttonPrev.addEventListener('click', () => {
        this.moveSlider(Slider.previous);
    });
    let intervalId;
    const initScroll = () => {
        intervalId = setInterval(() => {
            this.moveSlider(Slider.next);
        }, 1000);
    };
    let start;
    initScroll();

    const onMouseOver = () => {
        clearInterval(intervalId);
    };
    const onMouseLeave = () => {
        initScroll();
    };
    const onMouseMove = (event) => {
        const moveCoursor = event.x;
        const translate = this.calcTranslate(moveCoursor, start);
        this.sliderWrapper.style.transform = `translateX(${-this.slideWidth + translate}px)`;

    };
    const onMouseUp = (event) => {
        const end = event.x;
        let direction = this.calcTranslate(end, start);
        direction = direction / Math.abs(direction);
        this.moveSlider(direction);
        window.removeEventListener('mousemove', onMouseMove);
    };
    const onMouseDown = (event) => {
        if (this.stopSlider) {
            return;
        }
        start = event.x;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp, { once: true });
    };

    this.container.addEventListener('mousedown', onMouseDown);
    this.container.addEventListener('mouseover', onMouseOver);
    this.container.addEventListener('mouseleave', onMouseLeave);
};

Slider.prototype.calcTranslate = function (end, start) {
    const translate = end - start;
    if (translate > this.slideWidth) {
        return this.slideWidth - 1;
    } else if (translate < -this.slideWidth) {
        return -this.slideWidth + 1
    } else {
        return translate
    }
}

Slider.prototype.moveSlider = function (direction) {

    if (this.stopSlider) {
        return;
    }

    const initTranslate = +this.sliderWrapper.style.transform.split('translateX(')[1].split('px)')[0] || 0;
    const newTranslate = this.slideWidth * (direction - 1);
    this.stopSlider = initTranslate !== newTranslate;
    this.slidesNumber = this.calcNewIndex(this.slidesNumber, direction);
    this.sliderWrapper.style.transform = `translateX(${newTranslate}px)`;
    this.sliderWrapper.style.transition = `${this.config.delay}ms ease-in-out`;
    if (this.stopSlider) {
        this.nextSlide();
    }
};

Slider.prototype.nextSlide = function () {
    this.sliderWrapper.addEventListener('transitionend', () => {
        this.moveElement(-1);
        this.sliderWrapper.style.transform = `translateX(${-this.slideWidth}px)`;
        this.sliderWrapper.style.transition = 'none';
        this.stopSlider = false;
    }, { once: true });
};

const portfolioSlider = new Slider({
    visibleSlides: 3,
    delay: 1000,
    container: '.portfolio__section',
    sliderWrapper: '#portfolio-list',
    slide: 'portfolio__container',
    prev: '.portfolio__button-prev',
    next: '.portfolio__button-next'
});

const testimonialsSlider = new Slider({
    visibleSlides: 1,
    delay: 2000,
    container: '.testimonials__container',
    sliderWrapper: '.testimonials__cover',
    slide: 'testimonials__person',
    prev: '.testimonials__button-prev',
    next: '.testimonials__button-next'

});

