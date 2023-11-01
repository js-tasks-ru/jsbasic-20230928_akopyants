import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createStepSlider();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.sliderValues = this.elem.querySelector(".slider__value");
    this.elem.addEventListener("click", this.onClick);
  }

  createStepSlider() {
    const slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
    
        <div class="slider__progress"></div>
    
        <div class="slider__steps">
          <span class="slider__step-active"></span>
          ${"<span></span>".repeat(this.steps - 1)}
        </div>
      </div>`);

    return slider;
  }

  calculateValue(leftRelative) {
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    return Math.round(approximateValue);
  }

  updateSlider(value) {
    const valuePercents = (value / (this.steps - 1)) * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.sliderValues.textContent = value;
    this.progress.style.width = `${valuePercents}%`;
  }

  onClick = (event) => {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const value = this.calculateValue(leftRelative);

    this.updateSlider(value);

    this.value = value;

    this.changeEvent(value);
  };

  changeEvent(value) {
    const sliderChange = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(sliderChange);
  }
}
