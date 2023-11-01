import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.nav = this.createNav();
    this.nav.addEventListener('scroll', this.onScroll);
    this.navPrev = this.createNavButton("prev");
    this.navNext = this.createNavButton("next");
    this.elem = this.createMenu();
  }

  createMenu() {
    const menu = document.createElement("div");
    menu.className = "ribbon";
    menu.append(this.navPrev, this.nav, this.navNext);
    menu.addEventListener("click", this.onClick);
    
    return menu;
  }

  createNav() {
    const nav = document.createElement("nav");
    nav.className = "ribbon__inner";
    nav.innerHTML = this.categories.map(element => `
      <a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>
    `).join("");

    return nav;
  }

  createNavButton(direction) {
    const arrow = document.createElement("button");
    const imgPath = "/assets/images/icons/angle-icon.svg";
    const directionClass = `ribbon__arrow ${
      direction === "prev" ? "ribbon__arrow_left" : "ribbon__arrow_right ribbon__arrow_visible"
    }`;
    arrow.className = directionClass;
    arrow.innerHTML = `<img src="${imgPath}" alt="icon">`;
    
    return arrow;
  }

  onClick = event => {
    const prevButton = event.target.closest(".ribbon__arrow_left");
    const nextButton = event.target.closest(".ribbon__arrow_right");
    const ribbonItem = event.target.closest(".ribbon__item");

    if (prevButton) {
      this.nav.scrollBy(-350, 0);
    }

    if (nextButton) {
      this.nav.scrollBy(350, 0);
    }

    if (ribbonItem) {
      event.preventDefault();
      this.handleRibbonItemClick(ribbonItem);
    }
  };

  handleRibbonItemClick(ribbonItem) {
    const links = this.nav.querySelectorAll(".ribbon__item");
    const id = ribbonItem.dataset.id;

    links.forEach(element => element.classList.remove("ribbon__item_active"));
    ribbonItem.classList.add("ribbon__item_active");

    const ribbonSelect = new CustomEvent("ribbon-select", {
      detail: id,
      bubbles: true,
    });

    this.elem.dispatchEvent(ribbonSelect);
  }

  hideNav() {
    const scrollWidth = this.nav.scrollWidth;
    const scrollLeft = this.nav.scrollLeft;
    const clientWidth = this.nav.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.navPrev.classList.toggle('ribbon__arrow_visible', this.nav.scrollLeft !== 0);
    this.navNext.classList.toggle('ribbon__arrow_visible', scrollRight >= 1);
  }

  onScroll = () => {
    this.hideNav();
  }
}