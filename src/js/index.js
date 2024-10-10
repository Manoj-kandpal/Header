import { startHeader } from "./header/header";
import { startFooter } from "./footer/footer";

require('../scss/index.scss');

const start = () => {
  startHeader();
  startFooter();
}
if (document.getElementById('header')) {
  start();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    start();
  });
}


