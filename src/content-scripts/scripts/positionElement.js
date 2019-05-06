export const positionElement = element => {
  let r = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let relative = document.body.parentNode.getBoundingClientRect();
  element.style.top = (r.bottom - relative.top) + 10 + 'px';
  element.style.right = -(r.right - relative.right) + 'px'; // this will align the right edges together
};
