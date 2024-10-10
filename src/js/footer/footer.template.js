import { linkTemplate } from "../utils/link";
import { getIcon } from "../utils/icons";

export { footerTemplate };

const footerLinksTemplate = (columns) => `
  <div class="footer__links">
    ${columns.map((column) => `
      <div class="footer__links__column">
        ${column.columnTitle ? `<div class="footer__links__column__title">${column.columnTitle}</div>` : ''}
        <ul class="footer__links__column__list">
          ${column.links.map((link) => `
            <li class="footer__links__column__list__item">
              ${linkTemplate(link, "footer__links__column__list__item__link")}
            </li>
          `).join('')}
        </ul>
        <span class="expand">${getIcon('plus')}</span>
        <span class="collapse">${getIcon('minus')}</span>
      </div>
    `).join('')}
  </div>
`;

const footerInformationTemplate = (information) => `
  <div class="footer__information__container">
    <div class="footer__information__logo">
      <div class="footer__information__logo__copyright">
        ${information.copyright.text}
      </div>
    </div>
    <div class="footer__information__social">
      <ul class="footer__information__social__list">
        ${information.socialLinks.link.map((link) => `
          <li class="footer__information__social__list__item">
            ${linkTemplate(link, "footer__information__social__list__item__link")}
          </li>
        `).join('')}
      </ul>
  </div>
`;


const footerTemplate = (data) => `
  <footer class="footer" id="footer">
    <div class="footer__container">
      ${
        data.links &&
        data.links !== null &&
        data.links.columns &&
        data.links.columns.length > 0
          ? `${footerLinksTemplate(data.links.columns)}`
          : ''
      }
      <div class="footer__information">
        ${footerInformationTemplate(data.information)}
      </div>
    </div>
  </footer>
`;
