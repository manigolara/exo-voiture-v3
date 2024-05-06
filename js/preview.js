var Preview = {
  /**
   * Properties
   * ---------------------------------------------
   */
  els: {
    container: null,
  },
  /**
   * Public functions
   * ---------------------------------------------
   */
  create: function (domEl) {
    this.els.container = domEl;
    return Object.create(this);
  },
  display: function (car) {
    this.els.container.innerHTML = "";
    car.type && Preview.generateImgEl(this.els.container, car);
  },
};

/**
 * Private functions
 * ---------------------------------------------
 */
Preview.generateImgEl = function (domEl, car) {
  var imgEl = document.createElement("img");
  imgEl.src = car.imgPath;
  imgEl.style.filter = car.colorFilter;
  domEl.appendChild(imgEl);
};
