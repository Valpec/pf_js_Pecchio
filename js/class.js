class Producto {
    constructor(id, categoria, nombre, precio, imagen) {
            this.id = id,
            this.categoria = categoria,
            this.nombre = nombre,
            this.precio = precio,
            this.imagen = imagen, 
            this.cantidad = 1
    }
}

// async function pedirProdsDeCatalogo() {}

const pedirProdsDeCatalogo = async () => {
    const res = await fetch(`../productos.json`)
    const info = await res.json()
    for(let prod of info){
        let prodInfo = new Producto(prod.id, prod.categoria, prod.nombre, prod.precio, prod.imagen, prod.cantidad)
        catalogo.push(prodInfo)
    }
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}
    
// array de objetos producto
let catalogo = []

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}else{
    pedirProdsDeCatalogo(catalogo)
}
