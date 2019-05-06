export const positionElement = element => {
  let relativePosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let absolutePosition = document.body.parentNode.getBoundingClientRect();

  element.style.top = (relativePosition.bottom - absolutePosition.top) + 10 + 'px';
  element.style.right = -(relativePosition.right - absolutePosition.right) + 'px'; // this will align the right edges together
};
