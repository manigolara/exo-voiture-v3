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

Board.generateCars = (cars, circuit) => {
  circuit.innerHTML = "";

  var offset = 5;
  cars.forEach((car, index) => {
    var imgElement = document.createElement("img");
    imgElement.src = car.imgPath;
    imgElement.style.filter = car.colorFilter;
    var wrapperElement = document.createElement("div");
    wrapperElement.className = "cars";
    wrapperElement.style.zIndex = 2;
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.style.zIndex = 3;
    wrapperElement.style.top = offset * index + "vh";
    //   wrapperElement.addEventListener("click", (event) => {
    //     this.eventsCallback.click(event);
    //   });
    wrapperElement.appendChild(imgElement);
    wrapperElement.appendChild(deleteButton);
    circuit.appendChild(wrapperElement);
    return wrapperElement;
  });
  // console.log(cars);
};
