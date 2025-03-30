class Moto {
  static id = 0;

  constructor(modelo, marca, imagen, precio) {
    this.id = Moto.id++;
    this.modelo = modelo;
    this.marca = marca;
    this.imagen = imagen;
    this.precio = precio;
  }

  static CrearElemento() {
    return
  }
}

const root = document.querySelector(".root");
const container = document.createElement("div");
container.classList.add("root-products");
const productContainer = document.createElement("div");
productContainer.classList.add("product-container");

root.appendChild(container);
container.appendChild(productContainer);
