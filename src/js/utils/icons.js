const downArrow = require('../../assets/icons/down-arrow.svg');
const logo = require('../../assets/icons/logo.svg');
const plus = require('../../assets/icons/plus.svg');
const minus = require('../../assets/icons/minus.svg');

const icons = {
  downArrow,
  logo,
  plus,
  minus
}

export const getIcon = (iconName) => {
  return icons[iconName];
}