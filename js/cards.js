/**
 * Clase Producto que representa un producto en una tienda en línea.
 * Genera dinámicamente una tarjeta HTML a partir de los datos de un producto.
 */
class Producto {
    /** @type {number} Identificador único para cada producto */
    static id = 1;
  
    /**
     * Crea una nueva instancia de Producto.
     * @param {Object} param0 - Objeto con las propiedades del producto.
     * @param {string} [param0.tipo="producto"] - Tipo de producto.
     * @param {string} param0.modelo - Modelo del producto.
     * @param {string} param0.marca - Marca del producto.
     * @param {string} param0.imagen - URL de la imagen del producto.
     * @param {number} param0.descuento - Porcentaje de descuento del producto.
     * @param {string} param0.nombre - Nombre del producto.
     * @param {number} param0.rating - Calificación del producto (1-5).
     * @param {string} param0.descripcion - Descripción del producto.
     * @param {number} param0.precioViejo - Precio anterior del producto.
     * @param {number} param0.precioNuevo - Precio actual del producto.
     */
    constructor({
      tipo = "producto",
      modelo,
      marca,
      imagen,
      descuento,
      nombre,
      rating,
      descripcion,
      precioViejo,
      precioNuevo,
    }) {
      this.id = Producto.id++;
      this.tipo = tipo;
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
  
    /**
     * Genera toda la estructura HTML de la tarjeta del producto.
     * @returns {HTMLElement} Elemento HTML del producto.
     */
    crearElemento() {
      const card = this.crearContenedorPrincipal();
      card.appendChild(this.crearSeccionImagen());
      card.appendChild(this.crearSeccionInformacion());
      card.appendChild(this.crearSeccionPrecio());
      card.appendChild(this.crearBotonAgregar());
      return card;
    }
  
    /** @returns {HTMLElement} Contenedor principal de la tarjeta */
    crearContenedorPrincipal() {
      const card = document.createElement("div");
      card.className = "product-card";
      card.dataset.id = this.id;
      card.dataset.tipo = this.tipo;
      return card;
    }
  
    /** @returns {HTMLElement} Sección de imagen con descuento (si aplica) */
    crearSeccionImagen() {
      const imageContainer = document.createElement("div");
      imageContainer.className = "product-image";
  
      const img = document.createElement("img");
      img.src = this.imagen;
      img.alt = `${this.marca} ${this.modelo}`;
      img.loading = "lazy";
      imageContainer.appendChild(img);
  
      if (this.descuento && this.descuento > 0) {
        const discountBadge = document.createElement("span");
        discountBadge.className = "discount-badge";
        discountBadge.textContent = `${this.descuento}% OFF`;
        imageContainer.appendChild(discountBadge);
      }
  
      return imageContainer;
    }
  
    /** @returns {HTMLElement} Sección de información del producto */
    crearSeccionInformacion() {
      const infoContainer = document.createElement("div");
      infoContainer.className = "product-info";
  
      const title = document.createElement("h3");
      title.textContent = this.nombre;
  
      const ratingContainer = this.crearRating();
  
      const description = document.createElement("p");
      description.className = "product-description";
      description.textContent = this.descripcion;
  
      infoContainer.append(title, ratingContainer, description);
      return infoContainer;
    }
  
    /** @returns {HTMLElement} Contenedor de calificación en estrellas */
    crearRating() {
      const ratingContainer = document.createElement("div");
      ratingContainer.className = "product-rating";
  
      const stars = document.createElement("span");
      stars.innerHTML = "★★★★★".slice(0, this.rating) + "☆☆☆☆☆".slice(this.rating);
  
      const ratingText = document.createElement("span");
      ratingText.className = "rating-count";
      ratingText.textContent = this.rating.toFixed(1);
  
      ratingContainer.append(stars, ratingText);
      return ratingContainer;
    }
  
    /** @returns {HTMLElement} Sección de precios (viejo y nuevo) */
    crearSeccionPrecio() {
      const priceContainer = document.createElement("div");
      priceContainer.className = "product-price";
  
      if (this.precioViejo && this.precioViejo > this.precioNuevo) {
        const oldPrice = document.createElement("span");
        oldPrice.className = "price-old";
        oldPrice.textContent = `$${this.precioViejo.toLocaleString()}`;
        priceContainer.appendChild(oldPrice);
      }
  
      const currentPrice = document.createElement("span");
      currentPrice.className = "price-current";
      currentPrice.textContent = `$${this.precioNuevo.toLocaleString()}`;
      priceContainer.appendChild(currentPrice);
  
      return priceContainer;
    }
  
    /** @returns {HTMLButtonElement} Botón para agregar al carrito */
    crearBotonAgregar() {
      const button = document.createElement("button");
      button.className = "btn-add-cart";
      button.textContent = "Agregar al carrito";
      button.addEventListener("click", () => this.agregarAlCarrito());
      return button;
    }
  
    /** Acción que se ejecuta al agregar el producto al carrito */
    agregarAlCarrito() {
      console.log(`${this.tipo} ${this.id} agregado al carrito`);
    }
  }
  
  /** Inicializa contenedor raíz del HTML donde se insertarán los productos */
  const root = document.querySelector(".root");
  const container = document.createElement("div");
  container.classList.add("featured-products");
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");
  root.appendChild(container);
  container.appendChild(productContainer);
  
  /**
   * Carga productos desde un archivo JSON según el tipo especificado.
   * @param {string} jsonPath - Ruta al archivo JSON.
   * @param {string} tipo - Tipo de producto (clave en mayúscula dentro del JSON).
   * @returns {Promise<Object[]>} Lista de productos.
   */
  async function cargarProductos(jsonPath, tipo) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();
      return data[tipo.toUpperCase()];
    } catch (error) {
      console.error(error);
    }
  }
  
  /**
   * Renderiza en el DOM las tarjetas de productos.
   * @param {Object[]} productos - Lista de productos.
   * @param {string} tipo - Tipo de producto.
   */
  function renderProductos(productos, tipo) {
    productos.forEach((producto) => {
      const nuevoProducto = new Producto({
        tipo,
        modelo: producto.modelo,
        marca: producto.marca,
        imagen: producto.imagen,
        descuento: producto.descuento,
        nombre: producto.nombre,
        rating: producto.rating,
        descripcion: producto.descripcion,
        precioViejo: producto.precio_viejo,
        precioNuevo: producto.precio_nuevo,
      });
      const productoHTML = nuevoProducto.crearElemento();
      productContainer.appendChild(productoHTML);
    });
  }
  
  /**
   * Carga automáticamente productos según la URL en la que se encuentra el usuario.
   */
  function cargarSeccion() {
    const ruta = window.location.pathname;
  
    if (ruta.includes("deportive.html")) {
      cargarProductos("../json/Deportivas.json", "motos")
        .then((motos) => renderProductos(motos, "moto"))
        .catch((err) => console.log(err));
    } else if (ruta.includes("scooters.html")) {
      cargarProductos("../json/Scooters.json", "motos")
        .then((motos) => renderProductos(motos, "moto"))
        .catch((err) => console.log(err));
    }
  }
  
  // Ejecutar carga según sección actual
  cargarSeccion();
  