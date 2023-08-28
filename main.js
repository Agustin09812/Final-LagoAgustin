const turnosReservados = []

function cargarDesdeLocalStorage() {
    const turnosReservadosStorage = localStorage.getItem("turnosReservados")
    if (turnosReservadosStorage) {
        const turnosReservadosParsed = JSON.parse(turnosReservadosStorage)
        if (Array.isArray(turnosReservadosParsed)) {
            turnosReservados.push(...turnosReservadosParsed)
        }
    }
}

function cargarDatosDesdeJSON() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            generarOpciones(document.getElementById("fecha"), data.fechas)
            generarOpciones(document.getElementById("terapia"), data.terapias)
            generarOpciones(document.getElementById("hora"), data.horas)
            mostrarListaTurnosReservados()
            generarOpcionesFecha()
            generarOpcionesHora()
        })
        .catch(error => console.error("Error cargando datos:", error))
}

class TurnoReservado {
    constructor(nombre, apellido, email, telefono, terapia, fecha, hora) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.telefono = telefono
        this.terapia = terapia
        this.fecha = fecha
        this.hora = hora
    }
}

function generarOpciones(selectElement, opciones) {
    for (const opcion of opciones) {
        const option = document.createElement("option")
        option.textContent = opcion
        option.value = opcion
        selectElement.appendChild(option)
    }
}

function obtenerDatosUsuario() {
    const nombreInput = document.getElementById("nombre")
    const apellidoInput = document.getElementById("apellido")
    const emailInput = document.getElementById("email")
    const telefonoInput = document.getElementById("telefono")

    const nombre = nombreInput.value
    const apellido = apellidoInput.value
    const email = emailInput.value
    const telefono = telefonoInput.value

    nombreInput.value = ""
    apellidoInput.value = ""
    emailInput.value = ""
    telefonoInput.value = ""

    return { nombre, apellido, email, telefono }
}

function reservarTurno() {
    const datosUsuario = obtenerDatosUsuario()
    const terapia = document.getElementById("terapia").value
    const fecha = document.getElementById("fecha").value
    const hora = document.getElementById("hora").value

    const turno = new TurnoReservado(
        datosUsuario.nombre,
        datosUsuario.apellido,
        datosUsuario.email,
        datosUsuario.telefono,
        terapia,
        fecha,
        hora
    )

    turnosReservados.push(turno)
    mostrarMensajeReservaExitosa()
    mostrarListaTurnosReservados()
    guardarEnLocalStorage()
}

function mostrarMensajeReservaExitosa() {
    const mensajeDiv = document.getElementById("mensajeReservaExitosa")
    mensajeDiv.textContent = "¡Turno reservado exitosamente!. Revise su casilla de Mail"
    mensajeDiv.style.display = "block"
    Swal.fire({
        icon: 'success',
        title: '¡Turno reservado exitosamente!',
        text: 'Revise su casilla de correo electrónico',
    });
}

function mostrarListaTurnosReservados() {
    const listaTurnos = document.getElementById("listaTurnos")
    listaTurnos.innerHTML = ""
    for (const turno of turnosReservados) {
        const turnoInfo = `
        <p>
            <strong>Nombre:</strong> ${turno.nombre} ${turno.apellido}<br>
            <strong>Correo electrónico:</strong> ${turno.email}<br>
            <strong>Teléfono:</strong> ${turno.telefono}<br>
            <strong>Terapia holística:</strong> ${turno.terapia}<br>
            <strong>Fecha y hora del turno:</strong> ${turno.fecha} - ${turno.hora}
        </p>
        <hr>
        `
        listaTurnos.innerHTML += turnoInfo
    }
}

function toggleListaTurnosReservados() {
    const listaTurnos = document.getElementById("listaTurnos")
    if (listaTurnos.style.display === "none") {
        listaTurnos.style.display = "block"
    } else {
        listaTurnos.style.display = "none"
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem("turnosReservados", JSON.stringify(turnosReservados))
}

cargarDesdeLocalStorage()
cargarDatosDesdeJSON()
document.getElementById("toggleListaButton").addEventListener("click", toggleListaTurnosReservados)
document.getElementById("reservaForm").addEventListener("submit", function (event) {
    event.preventDefault()
    reservarTurno()
})