// Order an array of objects based on another array order
const mapOrder = (array, order, key) => {
  return array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
};

export { mapOrder };
