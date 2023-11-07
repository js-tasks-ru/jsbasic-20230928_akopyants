export default function promiseClick(button) {
  button.addEventListener('click', (event) => {
    return new Promise(resolve => {
      resolve(event);
    });
  }, { once: true });
}
