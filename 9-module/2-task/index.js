import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    this.products = await this.getProducts();
    this.productsGrid = new ProductsGrid(this.products);

    const carouselolder = document.body.querySelector('[data-carousel-holder]');
    const ribbonHolder = document.querySelector('[data-ribbon-holder]');
    const sliderHolder = document.querySelector('[data-slider-holder]');
    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    const dataProductsGridHolder = document.querySelector('[data-products-grid-holder]');

    carouselolder.append(this.carousel.elem);
    ribbonHolder.append(this.ribbonMenu.elem);
    sliderHolder.append(this.stepSlider.elem);
    cartIconHolder.append(this.cartIcon.elem);
    dataProductsGridHolder.append(this.productsGrid.elem);

    this.setupEventListeners();
    this.applyFilters();
  }

  setupEventListeners() {
    const nutsCheckbox = document.querySelector('#nuts-checkbox');
    const vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');

    document.body.addEventListener('product-add', this.handleProductAdd);
    this.stepSlider.elem.addEventListener('slider-change', this.handleSliderChange);
    this.ribbonMenu.elem.addEventListener('ribbon-select', this.handleRibbonSelect);
    nutsCheckbox.addEventListener('change', this.handleNutsCheckboxChange);
    vegeterianCheckbox.addEventListener('change', this.handleVegetarianCheckboxChange);
  }

  handleProductAdd = (event) => {
    const id = event.detail;
    const product = this.products.find((item) => item.id === id);
    this.cart.addProduct(product);
  };

  handleSliderChange = (event) => {
    const value = event.detail;
    this.productsGrid.updateFilter({ maxSpiciness: value });
  };

  handleRibbonSelect = (event) => {
    const categoryId = event.detail;
    this.productsGrid.updateFilter({ category: categoryId });
  };

  handleNutsCheckboxChange = (event) => {
    const checked = event.target.checked;
    this.productsGrid.updateFilter({ noNuts: checked });
  };

  handleVegetarianCheckboxChange = (event) => {
    const checked = event.target.checked;
    this.productsGrid.updateFilter({ vegeterianOnly: checked });
  };

  applyFilters() {
    this.productsGrid.updateFilter({
      noNuts: false,
      vegetarianOnly: false,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });
  }

  async getProducts() {
    return fetch('products.json')
      .then((response) => response.json())
      .then((data) => data);
  }
}
