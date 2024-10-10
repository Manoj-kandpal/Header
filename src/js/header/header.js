import { headerTemplate } from './header.template';
import { getNavigationData } from '../api/api';
import { addEventListener, removeEventListener } from '../utils/helper';
const fallbackData = require('../mock-data/header.json');

export { startHeader };

let header;
let els;
let openedDropdowns = [];

const css = {
  navbarMenu: 'navbar__menu',
  navbarMenuMobile: 'navbar__menu--mobile',
  navbarMenuMobileOpen: 'navbar__menu--mobile--open',

  dropdown: 'navbar__menu__dropdown',
  dropdownContainer: 'dropdown__container',
  dropdownOpen: 'dropdown__container--open',

  menuToggle: 'navbar__mobile-menu--toggle__icon',
  menuToggleOpen: 'navbar__mobile-menu--toggle__icon--open',
  menuTitle: 'menu__title',
};

const fetchHeadlessNavigationData = async () => {
  if (localStorage.getItem('navigation-header')) {
    const headerDataFromLocaStorage = JSON.parse(
      localStorage.getItem('navigation-header')
    );
    // console.log("local data: ", headerDataFromLocaStorage);
    return headerDataFromLocaStorage;
  } else {
    const { data } = await getNavigationData();
    localStorage.setItem('navigation-header', JSON.stringify(data));
    return data;
  }
};

const bindElements = () => {
  return {
    dropdown: header.querySelectorAll(`.${css.dropdown}`),
    menuToggle: header.querySelector(`.${css.menuToggle}`),
    navbarMenu: header.querySelector(`.${css.navbarMenu}`),
  };
};

const handleDropdownMouseEnter = (e) => {
  const el = e.target;
  const dropdownContainer = el.querySelector(`.${css.dropdownContainer}`);

  if (dropdownContainer) {
    dropdownContainer.classList.add(css.dropdownOpen);
  }
};

const handleDropdownMouseLeave = (e) => {
  const el = e.target;
  const dropdownContainer = el.querySelector(`.${css.dropdownContainer}`);

  if (dropdownContainer) {
    dropdownContainer.classList.remove(css.dropdownOpen);
  }
};

const handleDropdownMouseClick = (e) => {
  const el = e.target;
  let dropdownContainer;

  if (el.classList.contains(css.menuTitle)) {
    const parentElement = el.parentElement;
    dropdownContainer = parentElement.querySelector(
      `.${css.dropdownContainer}`
    );
  } else if (el.classList.contains(css.dropdown)) {
    dropdownContainer = el.querySelector(`.${css.dropdownContainer}`);
  }

  if (!dropdownContainer.classList.contains(css.dropdownOpen)) {
    dropdownContainer.classList.add(css.dropdownOpen);
    closeAllOtherDropdowns(dropdownContainer);
    // openedDropdowns.push(dropdownContainer);
  } else {
    dropdownContainer.classList.remove(css.dropdownOpen);
    openedDropdowns = openedDropdowns.filter(
      (dropdown) => dropdown !== dropdownContainer
    );
  }
};

// for hover

const bindDropdowns = () => {
  els.dropdown.forEach((dropdown) => {
    //removing click event
    removeEventListener(dropdown, 'click', handleDropdownMouseClick);

    addEventListener(dropdown, 'mouseenter', handleDropdownMouseEnter);
    addEventListener(dropdown, 'mouseleave', handleDropdownMouseLeave);
  });
};

// for clicks in small screen sizes:

const bindDropdownsClick = () => {
  els.dropdown.forEach((dropdown) => {
    // removing mouseenter and mouseleave events for smaller screens
    removeEventListener(dropdown, 'mouseenter', handleDropdownMouseEnter);
    removeEventListener(dropdown, 'mouseleave', handleDropdownMouseLeave);

    addEventListener(dropdown, 'click', handleDropdownMouseClick);
  });
};

const removeMobileClassFromHeader = () => {
  els.navbarMenu.classList.remove(css.navbarMenuMobile);
};

const addMobileClassToHeader = () => {
  els.navbarMenu.classList.add(css.navbarMenuMobile);
};

const resizeee = () => {
  if (window.innerWidth > 900) {
    bindDropdowns();
    removeMobileClassFromHeader();
    removeMenuToggle();
    closeAllOpenendDropdown();
  } else {
    bindDropdownsClick();
    bindMenuToggle();
    addMobileClassToHeader();
  }
};

const bindResizeHandler = () => {
  // for first load
  addEventListener(window, 'load', resizeee);

  // resizing the page
  addEventListener(window, 'resize', resizeee);
};

const handleMenuToggle = () => {
  if (!els.navbarMenu.classList.contains(css.navbarMenuMobileOpen)) {
    els.navbarMenu.classList.add(css.navbarMenuMobileOpen);
    els.menuToggle.classList.add(css.menuToggleOpen);
  } else {
    els.navbarMenu.classList.remove(css.navbarMenuMobileOpen);
    els.menuToggle.classList.remove(css.menuToggleOpen);
  }
};

const bindMenuToggle = () => {
  addEventListener(els.menuToggle, 'click', handleMenuToggle);
};

const removeMenuToggle = () => {
  removeEventListener(els.menuToggle, 'click', handleMenuToggle);
  els.navbarMenu.classList.remove(css.navbarMenuMobileOpen);
};

const bind = () => {
  els = bindElements();
  bindResizeHandler();
};

const startHeader = async () => {
  const data = await fetchHeadlessNavigationData();
  header = document.getElementById('header');
  header.innerHTML = headerTemplate(data);

  bind();
};

function closeAllOpenendDropdown() {
  openedDropdowns.forEach((dropdown) => {
    dropdown.classList.remove(css.dropdownOpen);
  });
  els.menuToggle.classList.remove(css.menuToggleOpen);
}

function closeAllOtherDropdowns(currentDropdown) {
  if (currentDropdown) {
    openedDropdowns.forEach((dropdown) => {
      if (dropdown !== currentDropdown) {
        dropdown.classList.remove(css.dropdownOpen);
      }
    });
    openedDropdowns = [];
    openedDropdowns.push(currentDropdown);
  }
}
