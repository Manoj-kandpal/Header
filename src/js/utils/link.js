export { linkTemplate };

const linkTemplate = (link, additionalClass) => `
  <a href="${link.href}" class="link ${additionalClass ? additionalClass : ""}" ${link.ariaLabel ? `aria-label="${link.ariaLabel}"`: ''}>
    ${link.icon ? `<span class="link__icon">${getIcon(link.icon)}</span>` : ""}
    <div class="link__text">
      <span class="link__title">${link.title}</span>
      ${
        link.description
          ? `<span class="link__description">${link.description}</span>`
          : ""
      }
    </div>
  </a>
`;
