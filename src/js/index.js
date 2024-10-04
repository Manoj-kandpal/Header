import { startHeader } from "./header/header";

require('../scss/index.scss');


if (document.getElementById('header')) {
  startHeader();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    startHeader();
  });
}