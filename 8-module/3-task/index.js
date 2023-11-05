export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
  
      this.onProductUpdate(this.cartItem);
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
    });

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, curr) => acc + curr.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.count), 0);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}
