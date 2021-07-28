// Used in update mutations.
const convertScalarTypeToValue = (value1, value2) => {
  let value;
  if (value1) {
    value = value1;
  }
  if (value2) {
    value = value2;
  }
  return value;
};

module.exports = convertScalarTypeToValue;
