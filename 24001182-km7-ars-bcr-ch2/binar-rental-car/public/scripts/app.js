class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driver = document.getElementById("driver");
    this.tanggal = document.getElementById("tanggal");
    this.waktu = document.getElementById("waktu");
    this.penumpang = document.getElementById("penumpang")
    this.buttonSearch = document.getElementById("buttonSearch");
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    this.buttonSearch.onclick = this.run;
    // this.run;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add('col-lg-4')
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);

    this.buttonSearch.addEventListener("click", async (e) => {
      let driverCar = this.driver.options[this.driver.selectedIndex].value;
      let tanggalCar = this.tanggal.value;
      let waktuCar = this.waktu.options[this.waktu.selectedIndex].value;
      let penumpangCar = this.penumpang.options[this.penumpang.selectedIndex].value;
      console.log(driverCar, tanggalCar, waktuCar, penumpangCar)
      this.clear()

      const cars = await Binar.listCars((car) => {
        let result = true;

        let dateTime = tanggalCar + "T" + waktuCar;

        if((!isNaN(Date.parse(dateTime))) && (!isNaN(parseInt(penumpangCar)))){
          result = (car.availableAt.getTime() >= Date.parse(dateTime)) && (car.capacity >= parseInt(penumpangCar));
        }
        if(!isNaN(Date.parse(dateTime))){
          result = car.availableAt.getTime() >= Date.parse(dateTime)
        }
        if(!isNaN(parseInt(penumpangCar))){
          result = (car.capacity === parseInt(penumpangCar))
        }
        return result;
      })

      console.log(cars)

      Car.init(cars);
    })
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
