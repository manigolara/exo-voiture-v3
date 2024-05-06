window.onload = function () {
  App.init({
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
    winners: [],
  },
  objs: {
    car: null,
    form: null,
    preview: null,
    board: null,
  },
  els: {
    appContainer: null,
    formSection: null,
    gameSection: null,
    podium: null,
    countdownContainer: null,
    countdown: null,
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
  init: function ({appId, data, objs}) {
    // generate app dom element
    this.els.appContainer = document.getElementById(appId, data);
    [
      this.els.appContainer,
      this.els.formSection,
      this.els.gameSection,
      this.els.podium,
      this.els.countdownContainer,
      this.els.countdown,
    ] = App.createAppEle(this.els.appContainer);
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
    // this.objs.form.els.type.selectedIndex = 1;
    // this.objs.form.els.color.selectedIndex = 1;
    // this.objs.form.els.speed.selectedIndex = 1;
    // this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled();
    // END TESTING

    this.states.car = App.getFormValues(this.objs.form, this.path.img); // bind selectedCar with form values
    this.objs.preview.display(this.states.car); // display current car
    this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled(); // enable submit button if all values are provided
    /**
     * events
     * -----------------------------------------------------------
     */
    // form change event
    this.objs.form.els.form.addEventListener("change", () => {
      this.states.car = App.getFormValues(this.objs.form, this.path.img); // bind selectedCar with form values
      this.objs.preview.display(this.states.car); // display current car
      this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled(); // enable submit button if all values are provided
    });

    var selectedCar = null;

    // form submit event
    this.objs.form.els.submit.addEventListener("click", () => {
      // add car to the board
      this.objs.board.addCar(this.states.car);
      // reset form values
      this.objs.form.resetForm();
      // create a new instance of car
      this.states.car = objs.car.create();

      // WHILE TESTING
      // this.objs.form.els.type.selectedIndex = 1;
      // this.objs.form.els.color.selectedIndex = 1;
      // this.objs.form.els.speed.selectedIndex = 1;
      // this.objs.form.canSubmit() && this.objs.form.removeSubmitDisabled();
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
    // form update event
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
        this.objs.preview.resetPreview();
        selectedCar.boardContainerEl.style.border = "none";
      }
    });
    // form start event
    this.objs.form.els.start.addEventListener("click", () => {
      this.objs.form.hideForm();
      this.els.appContainer.setAttribute("started", "");
      this.els.countdownContainer.style.display = "flex";

      var countdown = 3;
      var interval = setInterval(() => {
        this.els.countdown.innerHTML = countdown;
        if (countdown === 0) {
          clearInterval(interval);
          this.els.countdownContainer.style.display = "none";

          this.startGame();
        }
        countdown--;
      }, 1000);
    });
  },

  startGame: function () {
    this.states.cars.forEach((car) => {
      let carRect = car.boardContainerEl.getBoundingClientRect().right;
      let interval = setInterval(() => {
        let gameRect = this.els.gameSection.getBoundingClientRect().right - 20;
        if (carRect >= gameRect) {
          clearInterval(interval);
          this.states.winners.push(car);
          car.boardContainerEl.style.right = "10px"; // to have them properly aligned at finish position
          if (this.states.winners.length === 4) this.displayPodium();
        } else {
          let currentLeft = parseInt(car.boardContainerEl.style.left || 0);
          let newLeft = currentLeft + car.speed / 10;
          car.boardContainerEl.style.left = newLeft + "px";
          carRect = car.boardContainerEl.getBoundingClientRect().right; // Update carRect after moving the car
        }
      }, 25);
    });
  },
  displayPodium() {
    // this.els.appContainer.removeAttribute("started");
    this.els.appContainer.setAttribute("podium", "");
    var title = document.createElement("h3");
    this.els.podium.appendChild(title);
    this.states.winners.forEach((winner, index) => {
      title.textContent = "The winners are:";
      var element = document.createElement("p");
      element.className = "winners";
      element.innerHTML = `${index + 1}. ${winner.type} ${winner.color}`;
      this.els.podium.appendChild(element);
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
  // create `countdown` section element
  var countdownWrapper = document.createElement("div");
  countdownWrapper.id = "countdown-container";
  countdownWrapper.style.display = "none";
  var countdown = document.createElement("div");
  countdown.id = "countdown";
  countdownWrapper.appendChild(countdown);
  // create `podium` section element
  var podiumWrapper = document.createElement("div");
  podiumWrapper.id = "podium-container";
  var podium = document.createElement("div");
  podium.id = "podium";
  podiumWrapper.appendChild(podium);
  // create `background` section element
  var background = document.createElement("div");
  background.id = "background";
  var starting = document.createElement("div");
  starting.id = "starting-grid";
  var ending = document.createElement("div");
  ending.id = "ending-grid";
  background.appendChild(starting);
  background.appendChild(ending);
  // generate elements
  domEl.appendChild(formSection);
  domEl.appendChild(gameSection);
  domEl.appendChild(countdownWrapper);
  domEl.appendChild(podiumWrapper);
  domEl.appendChild(background);
  // assign created elements to App.els
  return [domEl, formSection, gameSection, podium, countdownWrapper, countdown];
};
