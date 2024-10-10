//for writing query string to populate nested data

const qs = require('qs');

// const populateMenuItems = () => {
//   return {
//     populate: ['MenuItems']
//   }

// }

const populateNavigationBarData = () => {
  return {
    populate: ['MenuItems', 'MenuItems.footer', 'MenuItems.mainLinks', 'MenuItems.additionalLinks','MenuItems.buttons']
  }
}

const populateFooterData = () => {
  return {
    populate: ['footer.links.columns.links', 'footer.information.copyright','footer.information.socialLinks.link']
  }
}

export const populateNavigationBarQuery = qs.stringify(populateNavigationBarData());
export const populateFooterQuery = qs.stringify(populateFooterData());



// const queryObject = {
//   populate: ['MenuItems', 'MenuItems.footer', 'MenuItems.section', 'MenuItems.section.links', 'MenuItems.additionalLinks']
// }
// export const result = qs.stringify(queryObject);

// export const populateMenuItemsResult = qs.stringify(populateMenuItems());

