export const positionElement = element => {
  const relativePosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
  const absolutePosition = document.body.parentNode.getBoundingClientRect();

  element.style.top = (relativePosition.bottom - absolutePosition.top) + 10 + 'px';
  element.style.right = -(relativePosition.right - absolutePosition.right) + 'px';
};
