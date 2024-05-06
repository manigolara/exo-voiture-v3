var Utils = {
  displayNoneElement: function (domEl) {
    domEl.style.display = "none";
  },
  displayVisibleElement: function (domEl) {
    domEl.style.display = "initial";
  },
  removeAttributeDisabled: function (domEl) {
    domEl.removeAttribute("disabled");
  },
  setAttributeDisabled: function (domEl) {
    domEl.setAttribute("disabled", "disabled");
  },
};
