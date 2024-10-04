const downArrow = require('../../assets/icons/down-arrow.svg');
const logo = require('../../assets/icons/logo.svg');

const icons = {
  downArrow,
  logo
}

export const getIcon = (iconName) => {
  return icons[iconName];
}