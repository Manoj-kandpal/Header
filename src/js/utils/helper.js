export { addEventListener, removeEventListener };

const addEventListener = (el, event, fnc) =>{
  if (el) {
    el.addEventListener(event, fnc);
  }
}

const removeEventListener = (el, event, fnc) => {
  if (el) {
    el.removeEventListener(event, fnc);
  }
}