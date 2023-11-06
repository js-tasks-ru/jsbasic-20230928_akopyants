import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.layout = this.createLayout();
    this.elem = this.renderCards(this.products);
  }

  createLayout() {
    return createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);
  }

  renderCards(p) {
    const innerContainer = this.layout.querySelector(".products-grid__inner");
    innerContainer.innerHTML = "";
    const productCards = p.map((product) => new ProductCard(product).elem);
    innerContainer.append(...productCards);

    return this.layout;
  }

  updateFilter(filter) {
    this.filters = Object.assign({}, this.filters, filter);

    const filtered = this.products.filter((product) => {
      if (
        (!this.filters.noNuts || !product.nuts) &&
        (!this.filters.vegeterianOnly || product.vegeterian) &&
        (!this.filters.maxSpiciness || product.spiciness <= this.filters.maxSpiciness) &&
        (!this.filters.category || product.category === this.filters.category)
      ) {
        
        return true;
      }
      return false;
    });

    this.renderCards(filtered);
  }
}
