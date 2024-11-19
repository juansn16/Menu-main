// Definir productos del menú
const productos = {
    "Hamburguesas Clasica": 5,
    "Hamburguesas de Pollo": 7,
    "Hamburguesas de Lentejas": 3,
    "Perro Clasico": 3,
    "Perro Especial": 5,
    "Salchiqueso": 4,
    "Pizza Personal": 1.5,
    "Pizza Mediana": 5,
    "Pizza Familiar": 8
};

// Crear un objeto para llevar el conteo y el total de cada producto
let factura = {};

let metodoPago = ""; // Almacena el método de pago seleccionado

function seleccionarMetodo(metodo) {
    const efectivo = document.getElementById("Efectivo");
    const tarjeta = document.getElementById("Tarjeta");

    if (metodo === "Efectivo") {
        tarjeta.checked = false; // Desactiva el otro checkbox
        metodoPago = efectivo.checked ? "Efectivo" : ""; // Actualiza el método de pago
    } else if (metodo === "Tarjeta") {
        efectivo.checked = false; // Desactiva el otro checkbox
        metodoPago = tarjeta.checked ? "Tarjeta" : ""; // Actualiza el método de pago
    }
}


// Función para añadir productos a la factura
function añadirProducto(nombre) {
    if (!factura[nombre]) {
        // Si el producto no está en la factura, añadirlo
        factura[nombre] = { precio: productos[nombre], cantidad: 1, subtotal: productos[nombre] };
    } else {
        // Si ya existe, aumentar la cantidad y actualizar el subtotal
        factura[nombre].cantidad += 1;
        factura[nombre].subtotal = factura[nombre].precio * factura[nombre].cantidad;
    }

    // Actualizar la factura en el HTML
    actualizarFactura();
}

function actualizarFactura() {
    const facturaBody = document.getElementById("factura-body");
    facturaBody.innerHTML = ""; // Limpiar la factura

    let total = 0;

    // Recorrer los productos en la factura y crear filas para cada uno
    for (const nombre in factura) {
        const { precio, cantidad, subtotal } = factura[nombre];
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>$${subtotal}</td>
        `;
        facturaBody.appendChild(fila);
    }

    // Agregar una fila con el total
    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td colspan="3"><strong></strong></td>
        <td><strong>$${total}</strong></td>
    `;
    facturaBody.appendChild(filaTotal);

    // Actualizar el total en el HTML (opcional, ya que está en la tabla)
    // document.getElementById("total").innerText = `Total: $${total}`;
}

function mostrarFacturaT() {
    const modalBodyContent = document.getElementById("modal-body-content");
    const modalTotal = document.getElementById("modal-total");

    modalBodyContent.innerHTML = ""; // Limpiar contenido previo

    let subtotal = 0;

    // Crear una lista con los productos de la factura
    for (const nombre in factura) {
        const { precio, cantidad, subtotal: subtotalProducto } = factura[nombre];
        subtotal += subtotalProducto;

        const item = document.createElement("p");
        item.innerText = `${nombre} (x${cantidad}): $${subtotalProducto}`;
        modalBodyContent.appendChild(item);
    }

    // Calcular el total con impuesto del 16%
    const impuesto = subtotal * 0.16;
    const total = subtotal + impuesto;

    // Mostrar el subtotal, el impuesto y el total
    modalTotal.innerHTML = `
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>Impuesto (16%):</strong> $${impuesto.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <p><strong>Método de Pago:</strong> ${metodoPago || "No seleccionado"}</p>
    `;
}

function limpiarFactura() {
    factura = {}; // Reiniciar la factura
    metodoPago = ""; // Reiniciar el método de pago
    document.getElementById("Efectivo").checked = false;
    document.getElementById("Tarjeta").checked = false;
    actualizarFactura(); // Limpiar la tabla en el HTML
    //mas comentarios
    // Limpiar el contenido del modal
    const modalBodyContent = document.getElementById("modal-body-content");
    const modalTotal = document.getElementById("modal-total");

    modalBodyContent.innerHTML = "<p>No hay productos en la orden.</p>";
    modalTotal.innerHTML = "";
}