export const toggleClassName = (node, className) => {
  let classes = node.className.split(' ');
  const existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  node.className = classes.join(' ');
};
