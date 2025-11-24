document.addEventListener('DOMContentLoaded', function () {

    const MIN_YEAR = 2000;
    const MAX_YEAR = new Date().getFullYear() + 5;

    const campoCantidad = document.getElementById('cantidad_utilizada');

    if (campoCantidad) {
        campoCantidad.addEventListener('keypress', function (evento) {
            const charCode = (evento.which) ? evento.which : evento.keyCode;
            
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46 && charCode !== 0) {
                evento.preventDefault();
            }
            
            if (charCode === 46 && this.value.indexOf('.') !== -1) {
                evento.preventDefault();
            }
        });

        campoCantidad.addEventListener('paste', function (evento) {
            evento.preventDefault();
            const textoPegado = (evento.clipboardData || window.clipboardData).getData('text');
            
            const soloNumeros = textoPegado.replace(/[^0-9.]/g, '').replace(',', '.');
            
            this.value += soloNumeros;
        });
    }

    const camposLetras = document.querySelectorAll('.input-solo-letras');

    function bloquearNoLetras(evento) {
        const patron = /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/;
        const tecla = String.fromCharCode(evento.charCode);

        if (!patron.test(tecla) && evento.charCode !== 0) {
            evento.preventDefault();
        }
    }

    function limpiarPegadoLetras(evento) {
        evento.preventDefault();
        const textoPegado = (evento.clipboardData || window.clipboardData).getData('text');
        const soloLetras = textoPegado.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, '');
        this.value += soloLetras;
    }

    camposLetras.forEach(campo => {
        campo.addEventListener('keypress', bloquearNoLetras);
        campo.addEventListener('paste', limpiarPegadoLetras);
    });

    const camposFecha = document.querySelectorAll('[name="fecha"], [name="fecha_proxima"]');

    function validarRangoFecha() {
        if (!this.value) return;

        const fechaSeleccionada = new Date(this.value);
        const añoSeleccionado = fechaSeleccionada.getFullYear();
        
        if (añoSeleccionado < MIN_YEAR || añoSeleccionado > MAX_YEAR) {
            alert(`¡Error! El año debe estar entre ${MIN_YEAR} y ${MAX_YEAR}. Por favor, corrige la fecha.`);
            this.value = '';
        }
    }

    camposFecha.forEach(campo => {
        campo.addEventListener('change', validarRangoFecha);
        campo.addEventListener('blur', validarRangoFecha);
    });
});