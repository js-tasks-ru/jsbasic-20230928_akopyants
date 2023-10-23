function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselInner = document.querySelector(".carousel__inner");
  const carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");
  const carouselInnerWidth = carouselInner.offsetWidth;
  const carouselSlides = document.querySelectorAll(".carousel__slide");
  const countSlides = carouselSlides.length;
  let index = 0;

  const buttonState = () => {
    carouselArrowLeft.style.display = index === 0 ? "none" : "";
    carouselArrowRight.style.display = index === countSlides - 1 ? "none" : "";
  };

  const switchSlide = () => {
    const step = carouselInnerWidth * -index;
    carouselInner.style.transform = `translateX(${step}px)`;
  };

  const handleArrowClick = (e) => {
    if (e.target.closest(".carousel__arrow_left")) {
      index--;
    }

    if (e.target.closest(".carousel__arrow_right")) {
      index++;
    }

    switchSlide();
    buttonState();
  };

  carousel.addEventListener("click", handleArrowClick);
  buttonState();
}
