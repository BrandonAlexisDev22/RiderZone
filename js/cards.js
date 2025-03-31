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
  
    // Método para crear el elemento de la moto
    crearElemento() {
      const card = this.crearContenedorPrincipal();
      
      // Crear y agregar secciones
      card.appendChild(this.crearSeccionImagen());
      card.appendChild(this.crearSeccionInformacion());
      card.appendChild(this.crearSeccionPrecio());
      card.appendChild(this.crearBotonAgregar());
      
      return card;
    }
  
    // Métodos auxiliares para cada sección
    crearContenedorPrincipal() {
      const card = document.createElement("div");
      card.className = 'moto-card';
      card.dataset.id = this.id;
      return card;
    }
  
    crearSeccionImagen() {
      const imageContainer = document.createElement("div");
      imageContainer.className = 'moto-image-container';
      
      const img = document.createElement("img");
      img.className = 'moto-image';
      img.src = this.imagen;
      img.alt = `${this.marca} ${this.modelo}`;
      img.loading = 'lazy';
      
      imageContainer.appendChild(img);
      
      // Mostrar descuento si existe
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
      infoContainer.className = 'moto-info';
      
      const title = document.createElement("h3");
      title.className = 'moto-title';
      title.textContent = `${this.marca} ${this.modelo}`;
      
      const ratingContainer = this.crearRating();
      const description = document.createElement("p");
      description.className = 'moto-description';
      description.textContent = this.descripcion;
      
      infoContainer.append(title, ratingContainer, description);
      return infoContainer;
    }
  
    crearRating() {
      const ratingContainer = document.createElement("div");
      ratingContainer.className = 'rating-container';
      
      // Crear estrellas (puedes implementar lógica más compleja aquí)
      const stars = document.createElement("span");
      stars.className = 'moto-stars';
      stars.innerHTML = '★★★★★'.slice(0, this.rating) + '☆☆☆☆☆'.slice(this.rating);
      
      const ratingText = document.createElement("span");
      ratingText.className = 'rating-text';
      ratingText.textContent = this.rating.toFixed(1);
      
      ratingContainer.append(stars, ratingText);
      return ratingContainer;
    }
  
    crearSeccionPrecio() {
      const priceContainer = document.createElement("div");
      priceContainer.className = 'price-container';
      
      if (this.precioViejo && this.precioViejo > this.precioNuevo) {
        const oldPrice = document.createElement("span");
        oldPrice.className = 'old-price';
        oldPrice.textContent = `$${this.precioViejo.toLocaleString()}`;
        priceContainer.appendChild(oldPrice);
      }
      
      const currentPrice = document.createElement("span");
      currentPrice.className = 'current-price';
      currentPrice.textContent = `$${this.precioNuevo.toLocaleString()}`;
      priceContainer.appendChild(currentPrice);
      
      return priceContainer;
    }
  
    crearBotonAgregar() {
      const button = document.createElement("button");
      button.className = 'add-to-cart';
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
container.classList.add("root-products");
const productContainer = document.createElement("div");
productContainer.classList.add("product-container");
root.appendChild(container);
container.appendChild(productContainer);


//OBTENER STOCK DE MOTOS
async function ObtenerMotos(){
    const json = '../json/Stock.json'
    try {
        const response = await fetch(json)
        if(!response.ok) {
            throw new Error("Error en la peticion del stock")
        } else {
            const motoData = await response.json()
            return motoData.MOTOS
        }
    }
    catch(error){
        console.log(error)
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
        })
    })
    .catch(err => console.log(err))

