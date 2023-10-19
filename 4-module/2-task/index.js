function makeDiagonalRed(table) {
  const tr = table.querySelectorAll('tr');

  tr.forEach((item, index) => {
    const td = item.querySelectorAll('td')[index];
    td.style.backgroundColor = 'red';
  });
}
