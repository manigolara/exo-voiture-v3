var Form = {
  /**
   * Properties
   * ---------------------------------------------
   */
  els: {
    container: null,
    form: null,
    preview: null,
    start: null,
    type: null,
    color: null,
    speed: null,
    submit: null,
    update: null,
    start: null,
  },
  // events: {
  //   change: null,
  // },
  /**
   * Public functions
   * ---------------------------------------------
   */
  create: function (domEl, data, changeCallback) {
    // generate dom element
    [this.els.container, this.els.form, this.els.preview, this.els.start] = Form.generateEl(domEl);
    // generate select options elements
    this.els.type = Form.generateTypeSelectEl(this.els.form, data.type);
    this.els.color = Form.generateColorSelectEl(this.els.form, data.color);
    this.els.speed = Form.generateSpeedSelectEl(this.els.form, data.speed);
    [this.els.submit, this.els.update] = Form.generateSubmitEl(this.els.form);

    return Object.create(this);
  },
  canSubmit: function () {
    if (this.getTypeValue() && this.getColorValue() && this.getSpeedValue()) return true;
    return false;
  },
  getTypeValue() {
    return this.els.type.value;
  },
  getColorValue() {
    return this.els.color.value;
  },
  getColorFilterValue() {
    var colorOptions = this.els.color.options[this.els.color.selectedIndex];
    return colorOptions.getAttribute("data-color");
  },
  getSpeedValue() {
    return this.els.speed.value;
  },
  getFilenameValue() {
    var typeOptions = this.els.type.options[this.els.type.selectedIndex];
    return typeOptions.getAttribute("data-filename");
  },
  removeSubmitDisabled() {
    this.els.submit.removeAttribute("disabled");
  },
  setSubmitDisabled() {
    this.els.submit.setAttribute("disabled", "");
  },
  removeSubmitDisabled() {
    this.els.submit.removeAttribute("disabled");
  },
  resetForm() {
    this.els.type.selectedIndex = 0;
    this.els.color.selectedIndex = 0;
    this.els.speed.selectedIndex = 0;
    this.setSubmitDisabled();
    Form.hideButton(this.els.update);
    Form.displayButton(this.els.submit);
  },
  hideStartEl() {
    this.els.start.style.display = "none";
  },
  displayStartEl() {
    this.els.start.style.display = "initial";
  },
  updateForm(car) {
    this.els.type.value = car.type;
    this.els.color.value = car.color;
    this.els.speed.value = car.speed;
    Form.hideButton(this.els.submit);
    Form.displayButton(this.els.update);
  },
  hideForm() {
    this.resetForm();
    this.els.container.style.display = "none";
  },
};

/**
 * Private functions
 * ---------------------------------------------
 */
Form.generateEl = function (domEl) {
  // root element
  var container = document.createElement("div");
  container.id = "form-container";
  // form element
  var form = document.createElement("form");
  form.id = "form";
  // preview element
  var preview = document.createElement("div");
  preview.id = "preview";
  // start element
  var start = document.createElement("button");
  start.id = "start";
  start.type = "button";
  start.textContent = "Start";
  start.style.display = "none";
  // generate element
  container.appendChild(form);
  container.appendChild(preview);
  container.appendChild(start);
  domEl.appendChild(container);
  // return element
  return [container, form, preview, start];
};

Form.generateTypeSelectEl = function (domEl, typeList) {
  // select element
  var selectEl = document.createElement("select");
  selectEl.name = "type";
  selectEl.id = "type-select";
  // options element
  Form.generatePlaceholderOption(selectEl, "--Voiture--");
  typeList.forEach((type) => {
    var option = document.createElement("option");
    option.text = type["name-fr"];
    option.value = type["name"];
    option.setAttribute("data-filename", type["filename"]);
    selectEl.appendChild(option);
  });
  domEl.appendChild(selectEl);
  return selectEl;
};

Form.generateColorSelectEl = function (domEl, colorList) {
  // select element
  var selectEl = document.createElement("select");
  selectEl.name = "color";
  selectEl.id = "color-select";
  // options element
  Form.generatePlaceholderOption(selectEl, "--Couleur--");
  colorList.forEach((color) => {
    var option = document.createElement("option");
    option.text = color["name-fr"];
    option.value = color["name"];
    option.setAttribute("data-color", Form.generateFilterColor(color["color-filter"]));
    selectEl.appendChild(option);
  });
  domEl.appendChild(selectEl);
  return selectEl;
};

Form.generateSpeedSelectEl = function (domEl, speedList) {
  // select element
  var selectEl = document.createElement("select");
  selectEl.name = "speed";
  selectEl.id = "speed-select";
  // options element
  Form.generatePlaceholderOption(selectEl, "--Vitesse--");
  speedList.forEach((speed) => {
    var option = document.createElement("option");
    option.text = speed["name-fr"];
    option.value = speed["value"];
    selectEl.appendChild(option);
  });
  domEl.appendChild(selectEl);
  return selectEl;
};

Form.generatePlaceholderOption = function (selectEl, text) {
  var option = document.createElement("option");
  option.text = text;
  option.value = "";
  option.disabled = true;
  option.selected = true;
  selectEl.appendChild(option);
};

Form.generateSubmitEl = function (domEl) {
  var submit = document.createElement("button");
  submit.textContent = "Ajouter";
  submit.setAttribute("disabled", "disabled");
  submit.type = "button";
  var update = document.createElement("button");
  update.textContent = "Modifier";
  update.type = "button";
  update.style.display = "none";
  domEl.appendChild(submit);
  domEl.appendChild(update);
  return [submit, update];
};

Form.generateFilterColor = function (colorItem) {
  return `invert(${colorItem["invert"]}%) sepia(${colorItem["sepia"]}%) saturate(${colorItem["saturate"]}%) hue-rotate(${colorItem["hue"]}deg) brightness(${colorItem["brightness"]}%) contrast(${colorItem["contrast"]}%)`;
};

Form.hideButton = function (domEl) {
  domEl.style.display = "none";
};
Form.displayButton = function (domEl) {
  domEl.style.display = "initial";
};
