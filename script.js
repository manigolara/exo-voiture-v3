window.onload = function () {
  App.run({
    appId: "container",
    data: {type: CarTypeList, color: CarColorList, speed: CarSpeedList},
    objs: {car: Car, form: Form, preview: Preview, board: Board},
  });
};

var App = {
  /**
   * Properties
   * ---------------------------------------------
   */
  states: {
    car: null,
    cars: [],
  },
  objs: {
    form: null,
  },
  els: {
    appContainer: null,
    formSection: null,
    gameSection: null,
  },
  data: {
    type: null,
    color: null,
    speed: null,
  },
  path: {
    img: "img/",
  },
  /**
   * Public functions
   * ---------------------------------------------
   */
  run: function ({appId, data, objs}) {
    // generate app dom element
    this.els.appContainer = document.getElementById(appId, data);
    [this.els.appContainer, this.els.formSection, this.els.gameSection] = App.createAppEle(this.els.appContainer);
    // store json data
    this.data.type = data.type;
    this.data.color = data.color;
    this.data.speed = data.speed;
    // initialize instances that generate dom elements
    this.objs.board = objs.board.create(this.els.gameSection, this.states.cars);
    this.objs.form = objs.form.create(this.els.formSection, this.data);
    this.objs.preview = objs.preview.create(this.objs.form.els.preview);
    // initialize states
    this.states.car = objs.car.create();

    // WHILE TESTING
    this.objs.form.els.type.selectedIndex = 1;
    this.objs.form.els.color.selectedIndex = 1;
    this.objs.form.els.speed.selectedIndex = 1;
    this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled();
    // END TESTING

    this.states.car = App.getFormValues(this.objs.form, this.path.img); // bind selectedCar with form values
    this.objs.preview.display(this.states.car); // display current car
    this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled(); // enable submit button if all values are provided
    /**
     * events
     * -----------------------------------------------------------
     */
    // form on change
    this.objs.form.els.form.addEventListener("change", () => {
      this.states.car = App.getFormValues(this.objs.form, this.path.img); // bind selectedCar with form values
      this.objs.preview.display(this.states.car); // display current car
      this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled(); // enable submit button if all values are provided
    });

    var selectedCar = null;

    // form on submit
    this.objs.form.els.submit.addEventListener("click", () => {
      // add car to the board
      this.objs.board.addCar(this.states.car);
      // reset form values
      this.objs.form.resetForm();
      // create a new instance of car
      this.states.car = objs.car.create();

      // WHILE TESTING
      this.objs.form.els.type.selectedIndex = 1;
      this.objs.form.els.color.selectedIndex = 1;
      this.objs.form.els.speed.selectedIndex = 1;
      this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled();
      // END TESTING

      this.states.car = App.getFormValues(this.objs.form, this.path.img); // bind selectedCar with form values
      this.objs.preview.display(this.states.car); // display current car

      if (this.objs.board.canStart()) {
        // Utils.setAttributeDisabled(this.objs.form.getSubmitEl());
        this.objs.form.displayStartEl();
        this.objs.form.setSubmitDisabled();
      }

      var self = this; // Store reference to `this`

      // cars events
      this.states.cars.forEach(function (car) {
        // car mouseover event
        car.boardContainerEl.addEventListener("mouseover", (event) => {
          car.boardContainerEl.style.transform = "scale(1.05)";
          event.stopPropagation();
        });
        // car mouseout event
        car.boardContainerEl.addEventListener("mouseout", function (event) {
          console.log("hover");
          car.boardContainerEl.style.transform = null;
          event.stopPropagation();
        });
        // car click event
        var selected = car;
        car.boardContainerEl.addEventListener("click", function (event) {
          // Remove the red border from the previously selected car
          if (selectedCar) {
            selectedCar.boardContainerEl.style.border = "";
          }
          // Apply the red border to the currently selected car
          car.boardContainerEl.style.border = "2px solid red";
          // Update the previously selected car to the current one
          selectedCar = car;
          // Set preview and form to selected car
          self.objs.form.updateForm(car);
          self.objs.preview.display(selectedCar); // display current car
          event.stopPropagation();
        });
        // car delete event
        // car delete event
        car.deleteEl.addEventListener("click", function (event) {
          // Remove the car from the board
          self.objs.board.removeCar(car);
          self.objs.form.removeSubmitDisabled();
          self.objs.form.hideStartEl();
          event.stopPropagation();
        });
      });
    });
    // form update
    this.objs.form.els.update.addEventListener("click", () => {
      console.log(this.objs.form.els.type.value);
      if (this.objs.form.canSubmit()) {
        selectedCar.type = this.objs.form.getTypeValue();
        selectedCar.color = this.objs.form.getColorValue();
        selectedCar.colorFilter = this.objs.form.getColorFilterValue();
        selectedCar.speed = this.objs.form.getSpeedValue();
        selectedCar.imgPath = this.path.img + this.objs.form.getFilenameValue();
        selectedCar.boardImgEl.src = this.path.img + this.objs.form.getFilenameValue();
        selectedCar.boardImgEl.style.filter = this.objs.form.getColorFilterValue();

        this.objs.form.resetForm();
      }
    });
  },
};

/**
 * Private functions
 * ---------------------------------------------
 */
App.getFormValues = function (form, path) {
  return {
    type: form.getTypeValue(),
    color: form.getColorValue(),
    colorFilter: form.getColorFilterValue(),
    speed: form.getSpeedValue(),
    imgPath: path + form.getFilenameValue(),
  };
};
App.createAppEle = function (domEl) {
  // create `form` section element
  var formSection = document.createElement("section");
  formSection.id = "form-section";
  // create `game` section element
  var gameSection = document.createElement("section");
  gameSection.id = "game-section";
  // generate elements
  domEl.appendChild(formSection);
  domEl.appendChild(gameSection);
  // assign created elements to App.els
  return [domEl, formSection, gameSection];
};
