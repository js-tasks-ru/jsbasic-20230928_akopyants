function makeFriendsList(friends) {
  const ul = document.createElement("ul");

  ul.insertAdjacentHTML(
    "beforeend", friends.map(item => {
      return `<li>${item.firstName} ${item.lastName}</li>`;
    }).join(''));

  return ul;
}
