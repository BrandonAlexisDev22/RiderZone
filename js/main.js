
// FUNCIONES PARA PODER CARGAR LOS COMPONENTES DEL PROYECTO
function loadComponent(containerId, modulePath) {
    fetch(modulePath)
        .then(response => response.text())
        .then(data => document.querySelector(containerId).innerHTML = data)
        .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded",() => {
    loadComponent(".header-container","../components/header.html")
    loadComponent(".footer-content", "../components/footer.html")
    loadSheet("../css/header.css")
    loadSheet("../css/footer.css")
})

function loadSheet(href){
    let link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    document.head.appendChild(link)
}