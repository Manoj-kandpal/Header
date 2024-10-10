import { getFooterData } from '../api/api';
import { footerTemplate } from './footer.template';
import { addEventListener, removeEventListener } from '../utils/helper';

export { startFooter };

let footer;
let els;
let expandedLists = [];

const css = {
  footerColumn: 'footer__links__column',
  footerColumnTitle: 'footer__links__column__title',
  footerColumnList: 'footer__links__column__list',
  footerColumnListOpen: 'footer__links__column__list--open',
  footerColumnExpanded: 'footer__links__column--expanded',
  footerColumnCollapsed: 'footer__links__column--collapsed',
};

/* Footer column */

const bindFooterColumns = () => {
  els.footerColumnTitle.forEach((column) => {
    // console.log('Column: ', column);
    addEventListener(column, 'click', handleFooterColumnClick);
  });
};

const unbindFooterColumns = () => {
  els.footerColumnTitle.forEach((column) => {
    // console.log('Column: ', column);
    removeEventListener(column, 'click', handleFooterColumnClick);
  });
};

const handleFooterColumnClick = (e) => {
  const el = e.target;
  const parentElement = el.parentElement;
  const list = parentElement.querySelector(`.${css.footerColumnList}`);

  if (list) {
    if (!list.classList.contains(css.footerColumnListOpen)) {
      list.classList.add(css.footerColumnListOpen);
      parentElement.classList.remove(css.footerColumnCollapsed);
      parentElement.classList.add(css.footerColumnExpanded);
      expandedLists.push(list);
    } else {
      list.classList.remove(css.footerColumnListOpen);
      parentElement.classList.remove(css.footerColumnExpanded);
      parentElement.classList.add(css.footerColumnCollapsed);
      expandedLists.pop(list);
    }
  }
};

const addCollapsedClassToColumns = () => {
  els.footerColumns.forEach((column) => {
    column.classList.add(css.footerColumnCollapsed);
  });
};

const removeCollapsedClassFromColumns = () => {
  els.footerColumns.forEach((column) => {
    column.classList.remove(css.footerColumnCollapsed);
  });
};

const closeExpandedLinks = () => {
  els.footerColumns.forEach((column) => {
    column.classList.remove(css.footerColumnExpanded);
  });
};

const closeOpenedLists = () => {
    closeExpandedLinks();
    expandedLists.forEach(list => {
        list.classList.remove(css.footerColumnListOpen);
    })
    expandedLists = [];
}

/* Resize handler */

const bindResizeHandler = () => {
  addEventListener(window, 'resize', resizeee);
  resizeee();
};

const resizeee = () => {
  // console.log('Resize handler:', window.onload);
  if (window.innerWidth <= 900) {
    addCollapsedClassToColumns();
    bindFooterColumns();
  } else {
    removeCollapsedClassFromColumns();
    closeOpenedLists();
    unbindFooterColumns();
  }
};

/* Bind elements */

const bindElements = () => {
  return {
    footerColumns: footer.querySelectorAll(`.${css.footerColumn}`),
    footerColumnTitle: footer.querySelectorAll(`.${css.footerColumnTitle}`),
    footerColumnList: footer.querySelectorAll(`.${css.footerColumnList}`),
  };
};

const bind = () => {
  footer = document.getElementById('footer');
  els = bindElements();
//   console.log('els in bind(): ', els);

  bindResizeHandler();
};

const fetchHeadlessNavigationFooterData = async () => {
  if (localStorage.getItem('navigation-footer')) {
    const headerDataFromLocaStorage = JSON.parse(
      localStorage.getItem('navigation-footer')
    );
    // console.log("local data: ", headerDataFromLocaStorage);
    return headerDataFromLocaStorage;
  } else {
    const { data } = await getFooterData();
    console.log('data: ', data);
    localStorage.setItem('navigation-footer', JSON.stringify(data.footer));
    return data.footer;
  }
};

const startFooter = async () => {
  const data = await fetchHeadlessNavigationFooterData();
  document.body.insertAdjacentHTML('beforeend', footerTemplate(data));

  bind();
};
