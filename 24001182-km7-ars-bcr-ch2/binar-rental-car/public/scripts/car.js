class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="card shadow-sm mb-3" style="
      width: 400px;
      height: fit-content;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 20px auto;">
          <div class="card-body card-mobil">
              <div>
                <img src="${this.image}" alt="gambar" class="img-fluid fotomobil-card ms-auto me-auto d-flex justify-content-center" style= "width: fit-content; height: 270px; padding: 5px">
              </div>
              <h5 class="car-title pt-4" style="font-size: 14px; color: #777; margin-bottom: 15px;">${this.manufacture} - ${this.model}</h5>
              <h2 class="car-price" style="font-size: 18px; color: #333; margin: 10px 0;">Rp ${this.rentPerDay} / hari</h2>
              <p class="car-subtitle" style="height: 170px; font-size: 14px; color: #777; margin-bottom: 15px;">Spesifikasi: ${this.specs} & available at ${this.availableAt}</p>
              <div class="car-detail" >
                  <div class="detail-item mb-3" style=" font-size: 14px; color: #777; margin-bottom: 15px;"><img src="images/fi_users.png" alt=""> ${this.capacity} Orang</div>
                  <div class="detail-item mb-3" style=" font-size: 14px; color: #777; margin-bottom: 15px;"><img src="images/fi_settings.png" alt=""> Transimi ${this.transmission}</div>
                  <div class="detail-item mb-3" style=" font-size: 14px; color: #777; margin-bottom: 15px;"><img src="images/fi_calendar.png" alt=""> Tahun ${this.year} </div>
              </div>
              <button class="btn btn-success w-100 mt-4" style="background-color:#5CB85F;; border: none; color: white; padding: 10px 20px; text-align: center; display: block; font-size: 14px; border-radius: 5px; cursor: pointer;">Pilih Mobil</button>
          </div>
      </div>
    `;
  }
}
