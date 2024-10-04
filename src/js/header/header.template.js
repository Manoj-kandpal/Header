import { getIcon } from '../utils/icons';
import { linkTemplate } from '../utils/link';

export { headerTemplate };

const dropdownTemplate = (dropdownItem) => `
  <div class="navbar__menu__item navbar__menu__dropdown" aria-expanded="false" role="link">
    <div class="menu__title">
      ${dropdownItem.title}
      ${getIcon('downArrow')}
    </div>
    <div class="dropdown__container">
      <div class="dropdown__links">
        <ul class="dropdown__links__main">
          ${dropdownItem.mainLinks
            .map(
              (link) => `
            <li class="dropdown__links__main__item">
              ${linkTemplate(link, 'dropdown__links__main__item__link')}
            </li>
          `
            )
            .join('')}
        </ul>
        ${
          dropdownItem.footer && dropdownItem.footer !== null
            ? `
          <ul class="dropdown__links__footer">
            <li class="dropdown__links__footer__item">
              ${linkTemplate(
                dropdownItem.footer,
                'dropdown__links__footer__item__link'
              )}
            </li>
          </ul>
        `
            : ''
        }
      </div>
      ${
        dropdownItem.additionalLinks && dropdownItem.additionalLinks !== null
          ? `
        <div class="dropdown__additional-links">
          <ul class="dropdown__additional-links__list">
            ${dropdownItem.additionalLinks
              .map(
                (link) => `
              <li class="dropdown__additional-links__list__item">
                ${linkTemplate(
                  link,
                  'dropdown__additional-links__list__item__link'
                )}
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      `
          : ''
      }
    </div>
  </div>
`;

const linkTemplates = (linkItem) => `
  <div class="navbar__menu__item navbar__menu__link">
    ${linkTemplate(linkItem)}
  </div>
`;

const buttonsTemplate = (buttonsItem) => `
  <div class="navbar__menu__item navbar__menu__buttons">
    ${buttonsItem.buttons
      .map(
        (button) => `
      ${linkTemplate(button, `button button--${button.type}`)}
    `
      )
      .join('')}
  </div>
`;

const menuItemsTemplate = (menuItems) =>`
  <div class="navbar__menu">
    <div class="navbar__menu__tip"></div>
    ${menuItems
      .map((menuItem) => {
        if (menuItem.type === 'dropdown') {
          return dropdownTemplate(menuItem);
        } else if (menuItem.type === 'link') {
          return linkTemplates(menuItem);
        }
      })
      .join('')}
  </div>
`;

const buttonsTemplates = (menuItems) => `
  <div class="navbar__buttons">
    ${menuItems
      .filter((menuItem) => menuItem.type === 'buttons')
      .map((buttons) => buttonsTemplate(buttons))
      .join('')}
  </div>
`;

const logoTemplate = () => `
  <a href="/" class="navbar__logo">
    ${getIcon('logo')}
  </a>
`;

const navbarMenuToggleTemplate = () => `
  <div class="navbar__mobile-menu--toggle">
    <div class="navbar__mobile-menu--toggle__icon">
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
    </div>
  </div>
`;

const headerTemplate = (data) => `
  <nav class="navbar">
    <div class="navbar__container">
      <div class="navbar__links">
        ${logoTemplate()}
        ${menuItemsTemplate(data.MenuItems)}
      </div>
      ${buttonsTemplates(data.MenuItems)}
      ${navbarMenuToggleTemplate()}
    </div>
  </nav>
`;
