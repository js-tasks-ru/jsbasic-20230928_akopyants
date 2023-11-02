import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.modal = this.renderModal();
    this.closeButton = this.modal.querySelector(".modal__close");
    this.closeButton.addEventListener("click", this.close);
  }

  renderModal() {
    const modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    return modal;
  }

  setTitle(title) {
    const modalTitle = this.modal.querySelector(".modal__title");
    modalTitle.textContent = title;
  }

  setBody(content) {
    const modalBody = this.modal.querySelector(".modal__body");
    modalBody.append(content);
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
    document.addEventListener("keydown", this.handleKeyDown);
  }

  close = () => {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };
}
