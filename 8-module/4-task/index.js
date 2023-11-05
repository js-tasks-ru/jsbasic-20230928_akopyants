import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let found = false;

      this.cartItems.forEach((item) => {
        if (item.product.id === product.id) {
          item.count++;
          found = true;
        }
      });

      if (!found) {
        this.cartItems.push({ product, count: 1 });
      }

      this.onProductUpdate(product);
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count = item.count + amount;
      }

      if (item.count === 0) {
        this.cartItems.splice(index, 1);
      }

      this.onProductUpdate(item);
    });
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  clearCart() {
    this.cartItems = [];
    this.onProductUpdate();
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, curr) => acc + curr.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, curr) => acc + curr.product.price * curr.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }
  
  renderSuccessMessage() {
    return createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`);
  }
  
  isModalOpen() {
    return document.body.classList.contains("is-modal-open");
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modal.setBody(this.createModalBody());
    this.modal.open();
  }

  clearModalBody() {
    if (this.isModalOpen()) {
      let modalBody = document.querySelector('.modal__body');
      modalBody.innerHTML = '';
    }
  }

  createModalBody() {
    let productContainer = document.createElement("div");

    this.cartItems.forEach((element) => {
      let prouctCard = this.renderProduct(element.product, element.count);
      productContainer.appendChild(prouctCard);
    });

    productContainer.appendChild(this.renderOrderForm());
    productContainer.addEventListener("click", this.onClickModalContainer);
    productContainer.querySelector("form").addEventListener('submit', this.onSubmit);

    return productContainer;
  }

  onClickModalContainer = (event) => {
    let cartCounterbButton = event.target.closest(".cart-counter__button");

    if (cartCounterbButton) {
      let cardProduct = event.target.closest(".cart-product");
      let cartCounterCount = cardProduct.querySelector('.cart-counter__count');
      let cardProductId = cardProduct.dataset.productId;
      let amount = cartCounterbButton.classList.contains("cart-counter__button_minus") ? -1 : 1;

      this.updateProductCount(cardProductId, amount);

      if (+cartCounterCount.textContent === 0) {
        cardProduct.remove();
      }
    }
  };

  onProductUpdate(item) {
    this.cartIcon.update(this);
    this.changeModalProductInfo(item);
  }

  changeModalProductInfo(item) {
    if (this.isModalOpen()) {
      let productId = item.product.id;
      let modalBody = document.querySelector(".modal__body");
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = item.count;
      productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) {
        this.modal.close();
      }
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const cartForm = this.modal.modal.querySelector('.cart-form');
    const formData = new FormData(cartForm);
    document.querySelector('[type=submit]').classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    }).then(() => {
      this.clearModalBody();
      this.modal.setTitle("Success!");
      this.modal.setBody(this.renderSuccessMessage());
      this.clearCart();
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
