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
let prodsEnCarrito

if (localStorage.getItem("carrito")) {
    prodsEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    prodsEnCarrito = []
    localStorage.setItem("carrito", prodsEnCarrito)
}

// funciones 
// la funcion muestra el catalogo, es llamada al final del js, no responde a ningun evento inicialemnte (a diferencia del ejemploi mostrado en clase)
function mostrarCatalogo(array) {
    // let cantidadAgregarCarrito = 1

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
                                        <span id="restaProdCatalogo${prod.id}" class="restaProd btn">&minus;</span>
                                        <input id="inputProdCatalogo${prod.id}" class="valorCantidad text-center" type="number" value="${prod.cantidad}"> 
                                        <span id="sumaProdCatalogo${prod.id}" class="sumaProd btn">&plus;</span>
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
        agregACarr.addEventListener("click", () => { agregarAlCarrito(prod), inputProdCatalogo.value = prod.cantidad})

        //SUMA 
        let sumaProdCatalogo = document.getElementById(`sumaProdCatalogo${prod.id}`)
        sumaProdCatalogo.addEventListener(`click`, () => { 
            sumarCantidadDeProductos(prod), 
            inputProdCatalogo.value = prod.cantidad})
        //RESTA
        let restaProdCatalogo = document.getElementById(`restaProdCatalogo${prod.id}`)
        restaProdCatalogo.addEventListener(`click`, () => { 
            restarCantidadDeProductos(prod), 
            inputProdCatalogo.value = prod.cantidad})
        //INPUT
        let inputProdCatalogo = document.getElementById(`inputProdCatalogo${prod.id}`)
        inputProdCatalogo.addEventListener("focusout", () => { 
            inputCantidadProductos(prod, inputProdCatalogo), 
            inputProdCatalogo.value = prod.cantidad})
    }
}


// funcion para agregar productos al carrito
function agregarAlCarrito(prod) {
    console.log(`cantidad del elem a agregar ${prod.cantidad}`)
    let prodAgregado = prodsEnCarrito.find((elem) => elem.id == prod.id)

    // prodAgregado == undefined ? (prodsEnCarrito.push(prod), localStorage.setItem("carrito", JSON.stringify(prodsEnCarrito)), calcularCantidadProdsCarrito(prodsEnCarrito))
    //     : console.log(`hacer que el carrito tiemble o algo del estilo`)
    if (prodAgregado == undefined) {
        prodsEnCarrito.push(prod)

    } else if (prodAgregado.nombre == prod.nombre && prodAgregado.cantidad + prod.cantidad < 200){
        console.log(`la cant carrtio ya existe es ${prodAgregado.cantidad}`)
        prodAgregado.cantidad += prod.cantidad
        console.log(`la cant carrito cambiado es ${prodAgregado.cantidad}`)
    }else{
        prodAgregado.cantidad = 200
    }
    localStorage.setItem("carrito", JSON.stringify(prodsEnCarrito))
    calcularCantidadProdsCarrito(prodsEnCarrito)
    cargarProdsCarrito(prodsEnCarrito)
    // reseteo la cantidad del producto modificado del catalogo
    prod.cantidad = 1
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
        calcularCantidadProdsCarrito(prodsEnCarrito)
    }
    // para SUMAR prods en carrito 

    for (let prod of array) {
        let sumaParaCarrito = document.getElementById(`sumaProd${prod.id}`)
        sumaParaCarrito.addEventListener(`click`, () => {
            sumarCantidadDeProductos(prod),
                localStorage.setItem("carrito", JSON.stringify(array)),
                cargarProdsCarrito(array)
        })
    }
    // para RESTAR prods en carrito

    for (let prod of array) {
        let restaParaCarrito = document.getElementById(`restaProd${prod.id}`)
        restaParaCarrito.addEventListener("click", () => {
            restarCantidadDeProductos(prod),
                localStorage.setItem("carrito", JSON.stringify(array)),
                cargarProdsCarrito(array)
        })
    }
    // para INPUTS de prods en carrito
    for (let prod of array) {
        let inputCantidad = document.getElementById(`valorCantidad${prod.id}`)
        inputCantidad.addEventListener("focusout", () => {
            inputCantidadProductos(prod, "inputCantidad"),
                localStorage.setItem("carrito", JSON.stringify(array)),
                calcularCantidadProdsCarrito(prodsEnCarrito)
            cargarProdsCarrito(array)
        })
    }


    // para ELIMINAR prods del carrito
    for (let prod of array) {
        document.getElementById(`borrarProd${prod.id}`).addEventListener("click", () => {
            let itemCarrito = document.getElementById(`productoCarrito${prod.id}`)
            itemCarrito.remove()
            let prodAEliminar = array.find((prod) => prod.id == prodsEnCarrito.id)

            let posicion = array.indexOf(prodAEliminar)
            array.splice(posicion, 1)
            localStorage.setItem("carrito", JSON.stringify(array))
            calcularCantidadProdsCarrito(prodsEnCarrito)
            // vuelvo a llamar la funcion de calcular total porque en suma y resta, la misma funcion de cargar prods en carrito ya la llamaba
            calcularTotal(array)
        })
    }
}

function sumarCantidadDeProductos(prod) {

    let cantidadDeProducto = sumarUnidad(prod)
    // para que no se puedan agregar mas de 200 elementos. 
    if (cantidadDeProducto > 200) {
        prod.cantidad = 200
    }

}
function restarCantidadDeProductos(prod) {
        let cantidadDeProducto = restarUnidad(prod)
        // para que no se pueda poner elemenots en negativo, pero que si lo queire eliminar, que lo haga con el boton. 
        if (cantidadDeProducto <= 0) {
            prod.cantidad = 1
        }
}

function inputCantidadProductos(prod, nombreVarInput) {

        let numeroDelInput = parseInt(nombreVarInput.value)
        // verifico si el valor ingresado, es un numero o no
        if (isNaN(numeroDelInput)) {
            prod.cantidad = 1
        } else {
            prod.cantidad = numeroDelInput
        }
        // verifico el valor del numero. Tiene un tope de ventas de prodcutos. no puede ser mas de 200 unidades ni menos de 1
        if (numeroDelInput > 200) {
            prod.cantidad = 200
        }
        if (numeroDelInput < 1) {
            prod.cantidad = 1
        }

    
}

// funcin que es llamada para calcular el precio final total del carrito
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


// funciones que son llamadas para sumar y restar cantidades de elementos desde el carrito
function sumarUnidad(elem) {
    elem.cantidad = elem.cantidad + 1
    return elem.cantidad
}
function restarUnidad(elem) {
    elem.cantidad = elem.cantidad - 1
    return elem.cantidad
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

botonAbrirCarrito.addEventListener("click", () => { cargarProdsCarrito(prodsEnCarrito) })
botonCerrarCarrito.addEventListener("click", () => { cerrarCarrito() })


botonIniciarCompra.addEventListener("click", () => {
    Swal.fire({
        title: `<strong>Compra realizada!</strong>`,
        html: `<i>Muchas gracias por comprar con nosotros!</i>`,
        icon: 'success'
    })
})

// llamada a funcion que muestra el catalogo, no respone a ningun evento, se muestra sola
mostrarCatalogo(catalogo)