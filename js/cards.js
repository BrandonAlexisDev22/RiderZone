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
    const productCard = document.createElement("div");
    const productImage = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const productInfo = document.createElement("div");
    const nameProduct = document.createElement("h3");
    const SpanStars = document.createElement("span");
    const spanRating = document.createElement("span");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("div");
    const priceOld = document.createElement("span")
    const priceCurrent = document.createElement("span")
    const buttonAdd = document.createElement("button")
  }
}

const root = document.querySelector(".root");
const container = document.createElement("div");
container.classList.add("root-products");
const productContainer = document.createElement("div");
productContainer.classList.add("product-container");

root.appendChild(container);
container.appendChild(productContainer);
