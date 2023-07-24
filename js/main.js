// capturar DOM
// DOM catalogo y acciones
let divCatalogo = document.getElementById("catalogoProds")
let divMensaje = document.getElementById("mensajeFiltroBusqueda")
let buscarVela = document.getElementById("buscarVela")
let buscarEsencia = document.getElementById("buscarEsencia")
let buscarTextil = document.getElementById("buscarTextil")
let buscarDeco = document.getElementById("buscarDeco")
let buscarTodo = document.getElementById("buscarTodo")
let buscador = document.getElementById("buscador")
let ordenarMayorMenor = document.getElementById("ordenarMayorMenor")
let ordenarMenorMayor = document.getElementById("ordenarMenorMayor")
let ordenarAlfabeticamente = document.getElementById("ordenarAlfabeticamente")
// DOM carrito
let botonAbrirCarrito = document.getElementById("botonAbrirCarrito")
let sideCarrito = document.getElementById("idSideCarrito")
let botonCerrarCarrito = document.getElementById("cerrarCarrito")
let bodyCarrito = document.getElementById("bodyCarrito")
let indicadorCantProdsCarrito = document.getElementById("cantProdsCarrito")
let precioTotal = document.getElementById("precioTotalCarrito")
let botonIniciarCompra = document.getElementById("iniciarCompra")

// inicializacion del array de los productos en carrito
let carrito
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    carrito = []
    localStorage.setItem("carrito", carrito)
}

// funciones 
function mostrarCatalogo(array) {
    divCatalogo.innerHTML = ``
    for (let prod of array) {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.className = "col-6 col-lg-4 itemCatalogo"
        nuevoProducto.id = `${prod.id}`
        nuevoProducto.innerHTML = `<img class="img-fluid align-self-center" src="img/productos/${prod.imagen}" alt="${prod.categoria + prod.nombre}" />
                                <div class="zonaText d-flex justify-content-between my-2">
                                    <h5 class="nombreItem ">${prod.nombre} </h5>
                                    <h6 class="catItem">${prod.categoria} </h6>
                                </div>
                                <div class="d-flex flex-wrap justify-content-between">
                                    <h5 class="precioItem">$${prod.precio * prod.cantidad} </h5>
                                    <div class="botonSumaResta d-inline-flex justify-content-center rounded p-1">
                                        <span id="restaCatalogo${prod.id}" class="restaProd btn">&minus;</span>
                                        <input id="inputCatalogo${prod.id}" class="valorCantidad text-center" type="number" value="${prod.cantidad}"> 
                                        <span id="sumaCatalogo${prod.id}" class="sumaProd btn">&plus;</span>
                                    </div>
                                </div>
                                <div class = "col-auto align-self-center my-1 col-12">
                                    <button type="button" id="agrCarr${prod.id}" class="btn btn-light btnAgregarACarrito col-12"><img class="img-fluid" src="img/icons/shopping-cart.png" alt="Carrito de compra"
                                    width="20">
                                    Agregar a Carrito</button>
                                </div>`
        divCatalogo.appendChild(nuevoProducto)

        // DOM del boton para agregar a carrito de cada producto
        let agregACarr = document.getElementById(`agrCarr${prod.id}`)
        agregACarr.addEventListener("click", () => {
            console.log(`se agrega al carrito la cantidad de producto ${prod.cantidad}`)
            agregarAlCarrito(prod)
            prod.cantidad = 1
            inputCatalogo.value = prod.cantidad
        })

        //SUMA 
        let sumaCatalogo = document.getElementById(`sumaCatalogo${prod.id}`)
        sumaCatalogo.addEventListener(`click`, () => {
            sumarCantidadDeProductos(prod),
            inputCatalogo.value = prod.cantidad
        })
        //RESTA
        let restaCatalogo = document.getElementById(`restaCatalogo${prod.id}`)
        restaCatalogo.addEventListener(`click`, () => {
            restarCantidadDeProductos(prod)
            inputCatalogo.value = prod.cantidad
        })
        //INPUT
        let inputCatalogo = document.getElementById(`inputCatalogo${prod.id}`)
        inputCatalogo.addEventListener("focusout", () => {
            inputCantidadProductos(prod, inputCatalogo)
            inputCatalogo.value = prod.cantidad
        })
    }
    calcularCantidadProdsCarrito(carrito)
}



function agregarAlCarrito(producto) {
    // let indiceProdAgregado = carrito.indexOf((elem) => elem.id == prod.id)
    let prodAgregado = carrito.find((elem) => elem.id == producto.id)
    let indice = carrito.indexOf(prodAgregado)
    if (indice < 0) {
        carrito.push(producto)
        console.log(`se pusheo a carrito `)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else if (indice >= 0 && (carrito[indice].cantidad + producto.cantidad) < 200) {
        console.log(`producto en carrito:${carrito[indice].cantidad}, ${carrito[indice].nombre}`)
        carrito[indice].cantidad = carrito[indice].cantidad + producto.cantidad
        console.log(`cantidad del producto de catalogo: ${producto.cantidad},\ncantidad del producto en carrito: ${carrito[indice].cantidad}`)
    }
    else {
        carrito[indice].cantidad = 200
    }
    cargarProdsCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    // producto.cantidad = 1
}

// funcion que calcula la cantidad de prods en carrito, para mostrarlo sobre el carrito 
function calcularCantidadProdsCarrito(array) {
    let cantidad = array.reduce((acc, prodEnCarrito) => acc + prodEnCarrito.cantidad, 0)
    indicadorCantProdsCarrito.innerHTML = `${cantidad}`
    if (cantidad > 200) {
        indicadorCantProdsCarrito.innerHTML = `+200`
    }
}
// funcion que agrega al dom los productos seleccionados
function cargarProdsCarrito(array) {
    sideCarrito.classList.add(`open`)
    bodyCarrito.innerHTML = ``
    for (let prod of array) {
        bodyCarrito.innerHTML += `<div class="elemento d-flex row justify-content-around my-3 mx-0 border-bottom d-flex align-items-center" id ="productoCarrito${prod.id}">
                                            <img class= "itemCarrito  col-2" src="img/productos/${prod.imagen}" alt="${prod.nombre}">
                                            <div class="flex-column col-4">
                                                <h6 class="" >${prod.nombre}</h6>
                                                <p>$${prod.precio}</p>
                                            </div>
                                            <div class="col-2 d-flex flex-column  align-items-center">
                                                <div class="botonSumaResta d-inline-flex  justify-content-center rounded p-1">
                                                    <span id="restaProd${prod.id}" class="restaProd btn">&minus;</span>
                                                    <input id="valorCantidad${prod.id}" class="valorCantidad text-center" type="number" value="${prod.cantidad}"> 
                                                    <span id="sumaProd${prod.id}" class="sumaProd btn">&plus;</span>
                                                </div>
                                            </div>
                                            <div class="col-3 d-flex flex-column justify-content-between align-items-end">
                                                <img id="borrarProd${prod.id}" class="imgBorrarProd img-fluid" src="img/icons/trash_can.png" alt="">
                                                <h6 class="my-3 "> $${prod.precio * prod.cantidad} </h6>
                                            </div>
                                        </div>`

        calcularTotal(array)
        calcularCantidadProdsCarrito(carrito)
    }

    // para SUMAR prods en carrito 
    for (let prod of array) {
        let sumaParaCarrito = document.getElementById(`sumaProd${prod.id}`)
        sumaParaCarrito.addEventListener(`click`, () => {
            sumarCantidadDeProductos(prod)
            cargarProdsCarrito(array)
            localStorage.setItem("carrito", JSON.stringify(array))

        })
    }
    // para RESTAR prods en carrito
    for (let prod of array) {
        let restaParaCarrito = document.getElementById(`restaProd${prod.id}`)
        restaParaCarrito.addEventListener("click", () => {
            restarCantidadDeProductos(prod)
            cargarProdsCarrito(array)
            localStorage.setItem("carrito", JSON.stringify(array))

        })
    }
    // para INPUTS de prods en carrito
    for (let prod of array) {
        let inputCantidad = document.getElementById(`valorCantidad${prod.id}`)
        inputCantidad.addEventListener("focusout", () => {
            inputCantidadProductos(prod, "inputCantidad")
            cargarProdsCarrito(array)
            localStorage.setItem("carrito", JSON.stringify(array))

        })
    }


    // para ELIMINAR prods del carrito
    for (let prod of array) {
        document.getElementById(`borrarProd${prod.id}`).addEventListener("click", () => {
            let itemCarrito = document.getElementById(`productoCarrito${prod.id}`)
            itemCarrito.remove()
            let prodAEliminar = array.find((prod) => prod.id == carrito.id)

            let posicion = array.indexOf(prodAEliminar)
            array.splice(posicion, 1)
            calcularCantidadProdsCarrito(carrito)
            // vuelvo a llamar la funcion de calcular total porque en suma y resta, la misma funcion de cargar prods en carrito ya la llamaba
            calcularTotal(array)
            localStorage.setItem("carrito", JSON.stringify(array))

        })
    }
}

function sumarCantidadDeProductos(prod) {
    prod.cantidad += 1
    // para que no se puedan agregar mas de 200 elementos. 
    if (prod.cantidad > 200) {
        prod.cantidad = 200
    }

}
function restarCantidadDeProductos(prod) {
    prod.cantidad -= 1
    // para que no se pueda poner elemenots en negativo, pero que si lo queire eliminar, que lo haga con el boton. 
    if (prod.cantidad <= 0) {
        prod.cantidad = 1
    }
}

function inputCantidadProductos(prod, nombreVarInput) {

    let numeroDelInput = parseInt(nombreVarInput.value)
    // verifico si el valor ingresado, es un numero o no
    if (isNaN(numeroDelInput) || numeroDelInput < 1 ) {
        prod.cantidad = 1
    } else if (numeroDelInput > 200) {
        prod.cantidad = 200
    }
     else {
        prod.cantidad = numeroDelInput
    }
}

// funcin que es llamada para calcular el precio total final del carrito
function calcularTotal(array) {
    let total = array.reduce((acc, prodEnCarrito) => acc + prodEnCarrito.precio * prodEnCarrito.cantidad, 0)
    if (total == 0) {
        bodyCarrito.innerHTML = `<h4 class="text-center py-3"> No hay productos en el carrito </h4>`
        precioTotal.innerHTML = `<h4 class="totalCarrito"> TOTAL: $0</h4>`
    } else { precioTotal.innerHTML = `<h4 class="totalCarrito"> TOTAL: <strong>$${total}</strong></h4>` }
}

function cerrarCarrito() {
    sideCarrito.classList.remove(`open`)
}

function confirmarCompra(array) {
    if (array.length == 0) {
        Swal.fire({
            toast: true,
            position: `bottom-right`,
            iconColor: 'red',
            icon: 'error',
            title: 'No hay productos en el carrito!',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        })
    } else {
        Swal.fire({
            title: `<strong>Compra realizada!</strong>`,
            html: `<i>Muchas gracias por comprar con nosotros!</i>`,
            icon: 'success',
            confirmButtonColor: `#D4B2A7`
        })
        // vaciar carrito
        array = []
        localStorage.removeItem("carrito")
        cargarProdsCarrito(array)
    }
}

//ACCIONES DE BUSQUEDA Y FILTROS
// funcion que es llamada cuando se filtra por categoria desde la navbar
function mostrarCategoria(array, cat) {
    let filtro = array.filter(prod => prod.categoria.toLowerCase() == cat.toLowerCase())
    if (cat == "todo") {
        divMensaje.innerHTML = ``
        mostrarCatalogo(array)
    } else {
        divMensaje.innerHTML = `<h3> Filtro: ${cat.toUpperCase()}</h3>`
        mostrarCatalogo(filtro)
    }
}

// funciuon para buscar productos por la barra de busqueda
function buscarProds(prodBuscado, array) {
    let buscar = array.filter(
        (prod) => prod.categoria.toLowerCase().includes(prodBuscado.toLowerCase()) || prod.nombre.toLowerCase().includes(prodBuscado.toLowerCase()))

    if (buscar.length == 0) {
        divMensaje.innerHTML = `<h3 class="text-center"> No se ha encontrado "${prodBuscado}"</h3>`
        mostrarCatalogo(buscar)
    } else {
        divMensaje.innerHTML = `<h3 class="text-center"> Busqueda: ${prodBuscado}</h3>`
        mostrarCatalogo(buscar)
    }
}


// funciones para ordenar segun el dropdown
function ordenarMenMay(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}

function ordenarMayMen(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    mostrarCatalogo(mayorMenor)
}
// rever qlq con esto
function ordenarAlf(array) {
    const arrayAlf = [].concat(array)
    arrayAlf.sort(
        (a, b) => {
            return a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0
        })
    mostrarCatalogo(arrayAlf)
}


//eventos
buscarVela.addEventListener("click", () => {
    mostrarCategoria(catalogo, "vela")
})
buscarEsencia.addEventListener("click", () => {
    mostrarCategoria(catalogo, "esencia")

})
buscarTextil.addEventListener("click", () => {
    mostrarCategoria(catalogo, "textil")

})
buscarDeco.addEventListener("click", () => {
    mostrarCategoria(catalogo, "decoracion")

})
buscarTodo.addEventListener("click", () => {
    mostrarCategoria(catalogo, "todo")
})

buscador.addEventListener("input", () => {
    buscarProds(buscador.value, catalogo)
})

ordenarMayorMenor.addEventListener("click", () => { ordenarMayMen(catalogo) })
ordenarMenorMayor.addEventListener("click", () => { ordenarMenMay(catalogo) })
ordenarAlfabeticamente.addEventListener("click", () => { ordenarAlf(catalogo) })

botonAbrirCarrito.addEventListener("click", () => { cargarProdsCarrito(carrito) })
botonCerrarCarrito.addEventListener("click", () => { cerrarCarrito() })


botonIniciarCompra.addEventListener("click", () => {
    confirmarCompra(carrito)
})

// llamada a funcion que muestra el catalogo, no respone a ningun evento, se muestra sola
mostrarCatalogo(catalogo)