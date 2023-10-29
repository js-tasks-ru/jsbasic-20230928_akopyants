import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.index = 0;
    this.sliderWidht = 0;
    this.elem = this.createCarousel();
    this.elem.addEventListener("click", this.onClick);
  }

  createCarousel() {
    const carousel = document.createElement("div");
    carousel.className = "carousel";
    carousel.appendChild(this.createSlides());
    this.createNavigation().forEach((item) => carousel.appendChild(item));

    return carousel;
  }

  createSlides() {
    let carouselInner = document.createElement("div");
    carouselInner.className = "carousel__inner";

    this.slides.forEach((element) => {
      const slide = createElement(`
      <div class="carousel__slide" data-id="${element.id}">
        <img src="/assets/images/carousel/${element.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${element.price.toFixed(2)}</span>
          <div class="carousel__title">${element.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `);
      carouselInner.appendChild(slide);
    });

    this.carouselInnerWidth = carouselInner.offsetWidth;
    return carouselInner;
  }

  createNavigation() {
    let left = createElement(`
      <div class="carousel__arrow carousel__arrow_left" style="display: none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);

    let right = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `);

    return [left, right];
  }

  switchSlide = (el) => {
    const step = this.sliderWidht * -this.index;
    el.style.transform = `translateX(${step}px)`;
  };

  onClick = (event) => {
    const left = this.elem.querySelector(".carousel__arrow_left");
    const right = this.elem.querySelector(".carousel__arrow_right");
    const carouselInner = this.elem.querySelector(".carousel__inner");
    this.sliderWidht = carouselInner.offsetWidth;

    if (event.target.closest(".carousel__arrow_left")) {
      this.index--;
    }

    if (event.target.closest(".carousel__arrow_right")) {
      this.index++;
    }

    if (event.target.closest(".carousel__button")) {
      const id = event.target.closest(".carousel__slide").dataset.id;
      const addProduct = new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
      });

      this.elem.dispatchEvent(addProduct);
    }

    this.switchSlide(carouselInner);
    this.buttonState(left, right);
  };

  buttonState(left, right) {
    left.style.display = this.index === 0 ? "none" : "";
    right.style.display = this.index === this.slides.length - 1 ? "none" : "";
  }
}
