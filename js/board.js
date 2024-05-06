var Board = {
  /**
   * Properties
   * ---------------------------------------------
   */
  els: {
    container: null, // <section id="game-section"></section>
    circuit: null,
  },
  states: {
    cars: [],
  },
  /**
   * Public functions
   * ---------------------------------------------
   */
  create: function (domElement, cars) {
    this.states.cars = cars;
    this.els.container = domElement;
    this.states.cars = cars;
    this.els.circuit = Board.createCircuitEle(this.els.container);

    return Object.create(this);
  },
  addCar: function (car) {
    this.states.cars.push(car);
    // console.log(this.states.cars);
    Board.generateCars(this.states.cars, this.els.circuit);
  },
  canStart: function () {
    return this.states.cars.length === 4;
  },
  removeCar: function (carToRemove) {
    const index = this.states.cars.indexOf(carToRemove);
    if (index !== -1) {
      this.states.cars.splice(index, 1);
    }
    Board.generateCars(this.states.cars, this.els.circuit);
  },
};
/**
 * Private functions
 * ---------------------------------------------
 */
Board.createCircuitEle = function (domEl) {
  var container = document.createElement("div");
  container.id = "circuit-container";
  var circuit = document.createElement("div");
  circuit.id = "circuit";
  container.appendChild(circuit);
  domEl.appendChild(container);

  return circuit;
};

Board.generateCars = function (cars, circuit) {
  circuit.innerHTML = "";

  const offset = 5;

  cars.forEach((car, index) => {
    var [wrapperElement, imgElement] = Board.generateCar(car);
    wrapperElement.style.top = `${offset * index}vh`;
  });
};

Board.generateCar = function (car) {
  const imgElement = document.createElement("img");
  imgElement.src = car.imgPath;
  imgElement.style.filter = car.colorFilter;

  const wrapperElement = document.createElement("div");
  wrapperElement.className = "cars";
  wrapperElement.style.zIndex = 2;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.style.zIndex = 3;

  car.boardContainerEl = wrapperElement;
  car.boardImgEl = imgElement;
  car.deleteEl = deleteButton;

  // append
  wrapperElement.appendChild(imgElement);
  wrapperElement.appendChild(deleteButton);
  circuit.appendChild(wrapperElement);

  return [wrapperElement, imgElement];
};
