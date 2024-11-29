// Definir la clase Cita
class Cita {
    constructor(fecha, hora, nombre, dni, apellidos, telefono, fechaNacimiento, observaciones) {
        this.fecha = fecha;
        this.hora = hora;
        this.nombre = nombre;
        this.dni = dni;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.observaciones = observaciones;
        this.id = new Date().getTime();  // Usamos el timestamp como identificador único
    }
}

// Validar el formulario y almacenar las citas en localStorage
function validarFormulario(event) {
    event.preventDefault();
    limpiarErrores();
    
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const observaciones = document.getElementById('observaciones').value;

    let esValido = true;

    // Validación de nombre (solo letras y espacios)
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regexNombre.test(nombre)) {
        mostrarError('nombre', 'El nombre solo puede contener letras y espacios');
        esValido = false;
    }

    // Validación de DNI (número seguido de una letra)
    const regexDNI = /^\d{8}[A-Za-z]$/;
    if (!regexDNI.test(dni)) {
        mostrarError('dni', 'DNI no válido. Debe ser un número de 8 dígitos seguido de una letra');
        esValido = false;
    }

    // Validación de apellidos (solo letras y espacios)
    const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regexApellidos.test(apellidos)) {
        mostrarError('apellidos', 'Los apellidos solo pueden contener letras y espacios');
        esValido = false;
    }

    // Validación de teléfono (9 dígitos)
    const regexTelefono = /^\d{9}$/;
    if (!regexTelefono.test(telefono)) {
        mostrarError('telefono', 'El teléfono debe tener 9 dígitos');
        esValido = false;
    }

    // Validación de fecha de nacimiento
    if (fechaNacimiento === '') {
        mostrarError('fecha-nacimiento', 'La fecha de nacimiento es obligatoria');
        esValido = false;
    }

    // Si las validaciones son correctas, crear la cita y guardarla
    if (esValido) {
        const cita = new Cita(fecha, hora, nombre, dni, apellidos, telefono, fechaNacimiento, observaciones);
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.push(cita);
        localStorage.setItem('citas', JSON.stringify(citas));

        alert('Cita guardada correctamente');
        cargarCitas();
    }

    return esValido;
}

// Mostrar mensajes de error
function mostrarError(campo, mensaje) {
    const errorElemento = document.getElementById('error-' + campo);
    const inputElemento = document.getElementById(campo);
    errorElemento.textContent = mensaje;
    errorElemento.classList.add('visible');
    inputElemento.classList.add('error');
}

// Limpiar los errores del formulario
function limpiarErrores() {
    const errorElementos = document.querySelectorAll('.error');
    const inputElementos = document.querySelectorAll('input, textarea');
    errorElementos.forEach((error) => {
        error.textContent = '';
        error.classList.remove('visible');
    });
    inputElementos.forEach((input) => {
        input.classList.remove('error');
    });
}