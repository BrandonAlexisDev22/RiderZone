class Moto {
  static id = 1;
  constructor(modelo, marca, imagen, descuento, nombre, rating, descripcion, precioViejo, precioNuevo) {
      this.id = Moto.id++;
      this.modelo = modelo;
      this.marca = marca;
      this.imagen = imagen;
      this.descuento = descuento;
      this.nombre = nombre;
      this.rating = rating;
      this.descripcion = descripcion;
      this.precioViejo = precioViejo;
      this.precioNuevo = precioNuevo;
  }

  crearElemento() {
      const card = this.crearContenedorPrincipal();
      card.appendChild(this.crearSeccionImagen());
      card.appendChild(this.crearSeccionInformacion());
      card.appendChild(this.crearSeccionPrecio());
      card.appendChild(this.crearBotonAgregar());
      return card;
  }

  crearContenedorPrincipal() {
      const card = document.createElement("div");
      card.className = 'product-card';
      card.dataset.id = this.id;
      return card;
  }

  crearSeccionImagen() {
      const imageContainer = document.createElement("div");
      imageContainer.className = 'product-image';
      
      const img = document.createElement("img");
      img.src = this.imagen;
      img.alt = `${this.marca} ${this.modelo}`;
      img.loading = 'lazy';
      
      imageContainer.appendChild(img);

      if (this.descuento && this.descuento > 0) {
          const discountBadge = document.createElement("span");
          discountBadge.className = 'discount-badge';
          discountBadge.textContent = `${this.descuento}% OFF`;
          imageContainer.appendChild(discountBadge);
      }
      
      return imageContainer;
  }

  crearSeccionInformacion() {
      const infoContainer = document.createElement("div");
      infoContainer.className = 'product-info';
      
      const title = document.createElement("h3");
      title.textContent = this.nombre;
      
      const ratingContainer = this.crearRating();
      const description = document.createElement("p");
      description.className = 'product-description';
      description.textContent = this.descripcion;
      
      infoContainer.append(title, ratingContainer, description);
      return infoContainer;
  }

  crearRating() {
      const ratingContainer = document.createElement("div");
      ratingContainer.className = 'product-rating';
      
      const stars = document.createElement("span");
      stars.innerHTML = '★★★★★'.slice(0, this.rating) + '☆☆☆☆☆'.slice(this.rating);
      
      const ratingText = document.createElement("span");
      ratingText.className = 'rating-count';
      ratingText.textContent = this.rating.toFixed(1);
      
      ratingContainer.append(stars, ratingText);
      return ratingContainer;
  }

  crearSeccionPrecio() {
      const priceContainer = document.createElement("div");
      priceContainer.className = 'product-price';
      
      if (this.precioViejo && this.precioViejo > this.precioNuevo) {
          const oldPrice = document.createElement("span");
          oldPrice.className = 'price-old';
          oldPrice.textContent = `$${this.precioViejo.toLocaleString()}`;
          priceContainer.appendChild(oldPrice);
      }
      
      const currentPrice = document.createElement("span");
      currentPrice.className = 'price-current';
      currentPrice.textContent = `$${this.precioNuevo.toLocaleString()}`;
      priceContainer.appendChild(currentPrice);
      
      return priceContainer;
  }

  crearBotonAgregar() {
      const button = document.createElement("button");
      button.className = 'btn-add-cart';
      button.textContent = 'Agregar al carrito';
      button.addEventListener('click', () => this.agregarAlCarrito());
      return button;
  }

  agregarAlCarrito() {
      console.log(`Moto ${this.id} agregada al carrito`);
  }
}

const root = document.querySelector(".root");
const container = document.createElement("div");
container.classList.add("featured-products");
const productContainer = document.createElement("div");
productContainer.classList.add("product-container");
root.appendChild(container);
container.appendChild(productContainer);

async function ObtenerMotos() {
  const json = '../json/Stock.json';
  try {
      const response = await fetch(json);
      if (!response.ok) {
          throw new Error("Error en la petición del stock");
      } else {
          const motoData = await response.json();
          return motoData.MOTOS;
      }
  } catch (error) {
      console.log(error);
  }
}

ObtenerMotos()
  .then(motos => {
      motos.forEach(moto => {
          const nuevaMoto = new Moto(
              moto.modelo,
              moto.marca,
              moto.imagen,
              moto.descuento,
              moto.nombre,
              moto.rating,
              moto.descripcion,
              moto.precio_viejo,
              moto.precio_nuevo
          );
          const motoHTML = nuevaMoto.crearElemento();
          productContainer.appendChild(motoHTML);
      });
  })
  .catch(err => console.log(err));
