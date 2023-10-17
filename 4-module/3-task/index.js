function highlight(table) {
  for (let row of table.rows) {
    const [_, age, gender, status] = row.cells;

    row.classList.add(gender.textContent === "m" ? "male" : "female");

    if (status.dataset.available) {
      row.classList.add(
        status.dataset.available === "true" ? "available" : "unavailable"
      );
    } else {
      row.setAttribute("hidden", true);
    }

    if (+age.textContent < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
