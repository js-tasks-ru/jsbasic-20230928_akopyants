export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
  }

  createTable() {
    const table = document.createElement("table");
    table.appendChild(this.createThead());
    table.appendChild(this.createBody());
    table.addEventListener("click", this.onClick);
    return table;
  }

  createThead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const names = ["Имя", "Возраст", "Зарплата", "Город", ""];

    tr.innerHTML = names.map((item) => `<th>${item}</th>`).join("");

    thead.appendChild(tr);

    return thead;
  }

  createBody() {
    const tBody = document.createElement("tbody");

    this.rows.forEach((item) => {
      const tr = document.createElement("tr");
      const values = Object.values(item);

      tr.innerHTML = values.map((item) => `<td>${item}</td>`).join("");

      const deleteButton = document.createElement("td");
      deleteButton.innerHTML = "<button>x</button>";
      tr.appendChild(deleteButton);

      tBody.appendChild(tr);
    });

    return tBody;
  }

  onClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      const tr = event.target.closest("tr");
      tr.remove();
    }
  };
}
