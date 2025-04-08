const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const bootstrapCSS = document.createElement("link");
  bootstrapCSS.rel = "stylesheet";

  if (isLocal) {
    // Usar Bootstrap local
    bootstrapCSS.href = "node_modules/bootstrap/dist/css/bootstrap.min.css";
  } else {
    // Usar Bootstrap desde CDN
    bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
  }

  document.head.appendChild(bootstrapCSS);

  // JS de Bootstrap (bundle con Popper)
  const bootstrapJS = document.createElement("script");
  bootstrapJS.src = isLocal
    ? "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";

  document.body.appendChild(bootstrapJS);