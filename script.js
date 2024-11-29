//definimos una clase Cita que contiene la estructura básica de una cita.
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
//guardar citas en localstorage
function validarFormulario(event) {
    // Prevenir el envío del formulario
    event.preventDefault();
    // Limpiar los errores previos
    limpiarErrores();

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const observaciones = document.getElementById('observaciones').value;

    let esValido = true;
    
    // Validaciones...
    // (como las que tienes en tu código para los campos)

    // Si todas las validaciones son correctas, crear la cita y guardarla
    if (esValido) {
        // Crear objeto Cita
        const cita = new Cita(fecha, hora, nombre, dni, apellidos, telefono, fechaNacimiento, observaciones);
        
        // Obtener citas existentes
        let citas = JSON.parse(localStorage.getItem('citas')) || [];

        // Añadir la nueva cita
        citas.push(cita);

        // Guardar las citas en localStorage
        localStorage.setItem('citas', JSON.stringify(citas));

        // Mostrar un mensaje de éxito
        alert('Cita guardada correctamente');
        
        // Actualizar la tabla
        cargarCitas();
    }

    return esValido;
}
//cargar citas en localstorage
function cargarCitas() {
    const tabla = document.getElementById('tablaCitas').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';  // Limpiar la tabla

    // Obtener citas desde localStorage
    const citas = JSON.parse(localStorage.getItem('citas')) || [];

    if (citas.length === 0) {
        // Si no hay citas, mostrar mensaje vacío
        const fila = document.createElement('tr');
        fila.id = 'mensaje-vacio';
        fila.innerHTML = '<td colspan="4">No hay citas programadas</td>';
        tabla.appendChild(fila);
    } else {
        // Si hay citas, mostrar cada una
        citas.forEach((cita, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${cita.nombre}</td>
                <td>${cita.fecha} ${cita.hora}</td>
                <td>
                    <button onclick="eliminarCita(${cita.id})">Eliminar</button>
                    <button onclick="modificarCita(${cita.id})">Modificar</button>
                </td>
                <input type="hidden" value="${cita.id}">
            `;
            tabla.appendChild(fila);
        });
    }
}
//eliminar citas de localstorage
function eliminarCita(id) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas = citas.filter(cita => cita.id !== id);  // Filtrar la cita con el id proporcionado

    localStorage.setItem('citas', JSON.stringify(citas));  // Guardar las citas actualizadas
    cargarCitas();  // Actualizar la tabla
}
//modificar cita de localstorage
function modificarCita(id) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    const cita = citas.find(cita => cita.id === id);  // Buscar la cita por id

    // Rellenar el formulario con los datos de la cita
    document.getElementById('nombre').value = cita.nombre;
    document.getElementById('dni').value = cita.dni;
    document.getElementById('apellidos').value = cita.apellidos;
    document.getElementById('telefono').value = cita.telefono;
    document.getElementById('fecha_nacimiento').value = cita.fechaNacimiento;
    document.getElementById('fecha').value = cita.fecha;
    document.getElementById('hora').value = cita.hora;
    document.getElementById('observaciones').value = cita.observaciones;

    // Opcional: Cambiar el comportamiento del formulario para modificar la cita
    document.getElementById('formCita').onsubmit = function(event) {
        event.preventDefault();
        // Llamar a la función para actualizar la cita en localStorage
        actualizarCita(id);
    };
}
//actualizar cita en localstorage
function actualizarCita(id) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    const citaIndex = citas.findIndex(cita => cita.id === id);  // Encontrar el índice de la cita

    // Actualizar los campos de la cita
    citas[citaIndex] = new Cita(
        document.getElementById('fecha').value,
        document.getElementById('hora').value,
        document.getElementById('nombre').value,
        document.getElementById('dni').value,
        document.getElementById('apellidos').value,
        document.getElementById('telefono').value,
        document.getElementById('fecha_nacimiento').value,
        document.getElementById('observaciones').value
    );

    // Guardar las citas actualizadas
    localStorage.setItem('citas', JSON.stringify(citas));

    // Actualizar la tabla
    cargarCitas();

    // Restablecer el comportamiento del formulario
    document.getElementById('formCita').onsubmit = validarFormulario;
}
//cargar citas al actualizar la pagina
document.addEventListener('DOMContentLoaded', cargarCitas);