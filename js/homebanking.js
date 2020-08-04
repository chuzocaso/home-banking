//Declaración de variables
var nombreUsuario = prompt("Ingrese el nombre de Usuario");
var saldoCuenta = 0;
var limiteExtraccion = 3000;
var servicios = ["Agua", "Teléfono", "Luz", "Internet"];
var precios = [350, 425, 210, 570];
var nombresCuentas = ["Cuenta amiga 1", "Cuenta amiga 2"];
var numeroDeCuenta = [1234567, 7654321];
var codigoSeguridad = '0000';

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();
}

//Inicio del programa
if (iniciarSesion()) {
    function cambiarLimiteDeExtraccion() {
        limiteExtraccion = parseInt(prompt("Ingrese el Nuevo Límite de Extracción"));
        if (esNumeroPositivo(limiteExtraccion)) {
            alert("Debe ingresar un número positivo");
        }
        else{
            alert("El limite de extracción se ha modificado correctamente\nEl nuevo límite de extracción es de $" + limiteExtraccion)
            actualizarLimiteEnPantalla();
        }
    }

    function extraerDinero() {
        var montoTransaccion = parseInt(prompt('Ingrese el monto a extraer'));
        if (esNumeroPositivo(montoTransaccion)) {
            alert("Debe ingresar un número positivo");
        }
        else if (haySaldoDisponible(montoTransaccion)) {
            alert("Usted no posee los fondos suficientes para realizar esta operación");
        }
        else if (superaLimiteExtraccion(montoTransaccion)) {
            alert("El monto ingresado supera el límite de Extracción");
        }    
        else if (esMultiploDeCien(montoTransaccion)){
            alert("El monto ingresado no es válido. Solo se pueden extraer billetes de 100");
        }
        else{
            var saldoAnterior = saldoCuenta;
            resta(montoTransaccion);
            alert("Has retirado: $" + montoTransaccion + "\nSaldo anterior: $" + saldoAnterior + "\nSaldo actual: $" + saldoCuenta);
            actualizarSaldoEnPantalla();
        }
    }

    function depositarDinero() {
        var montoTransaccion = parseInt(prompt('Ingrese el monto a depositar'));
        if (esNumeroPositivo(montoTransaccion)) {
            alert("Debe ingresar un número positivo");
        }
        else{
            var saldoAnterior = saldoCuenta;
            suma(montoTransaccion);
            alert("Has depositado: $" + montoTransaccion + "\nSaldo anterior: $" + saldoAnterior + "\nSaldo actual: $" + saldoCuenta);
            actualizarSaldoEnPantalla();
        }

    }

    function pagarServicio() {
        var menu = parseInt(prompt("Ingrese el número que corresponda con el servicio que quiere pagar\n1 - " + servicios[0] + "\n2 - " + servicios[1] + "\n3 - " + servicios[2] + "\n4 - " + servicios[3]));
        switch (menu) {
            case 1:
                    pagoServicio(menu)
                break;
            case 2:
                    pagoServicio(menu)            
                break;            
            case 3:
                    pagoServicio(menu)            
                break;
            case 4:
                    pagoServicio(menu)
                break;
            default:
                alert("Se ingreso una opción invalida, no existe el servicio seleccionado");
                break;
        }
    }

    function transferirDinero() {
        var montoTransaccion = parseInt(prompt('Ingrese el monto a transferir'));
        if (esNumeroPositivo(montoTransaccion)) {
            alert("Debe ingresar un número positivo");
        }
        else if (haySaldoDisponible(montoTransaccion)) {
            alert("Usted no posee los fondos suficientes para realizar esta operación");
        }
        else {
            var menu = parseInt(prompt("Ingrese el número que corresponda con la cuenta de destino\n1 - " + nombresCuentas[0] + "\n2 - " + nombresCuentas[1]));
            switch (menu) {
                case 1:
                        transferencia(menu, montoTransaccion);
                    break;
                case 2:
                        transferencia(menu, montoTransaccion);
                    break;            
                default:
                    alert("Se ingreso una opción invalida, no existe el servicio seleccionado");
                    break;
            }        
        }
    }
}
function iniciarSesion() {
    var codigoIngresado = prompt("Ingrese el código de seguridad de la cuenta");
    var contador = 0;
    while (contador<3) {
        if (codigoIngresado === codigoSeguridad) {
            alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
            return true
        } else if(contador<2){
            contador=contador+1;
            codigoIngresado = prompt("Código incorrecto. Intente nuevamente");
        } else{
            alert("Has excedido el número de intentos. Su dinero ha sido retenido por motivos de seguridad");
            return false
        }
    } 
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

//Funciones de soporte
function suma(montoIngresado) {
    saldoCuenta += montoIngresado;
}

function resta(montoIngresado) {
    saldoCuenta -= montoIngresado;
}

//Comprobar si el valor ingresado es un número y es positivo
function esNumeroPositivo(montoIngresado) {
    return isNaN(montoIngresado) || montoIngresado < 0
}
//Comprobar si existe saldo suficiente para extraer el monto indicado
function haySaldoDisponible(montoIngresado) {
    return montoIngresado > saldoCuenta
}
//Comprobar si el monto indicado no supera el límite de extracción
function superaLimiteExtraccion(montoIngresado) {
    return montoIngresado > limiteExtraccion
}
//Comprobar si el número es multiplo de 100
function esMultiploDeCien(montoIngresado) {
    return montoIngresado % 100 !== 0
}

function pagoServicio(opcionElegida) {
    if (haySaldoDisponible(precios[opcionElegida-1])) {
        alert("Usted no posee los fondos suficientes para realizar esta operación");
    } else {
        var saldoAnterior = saldoCuenta;
        resta(precios[opcionElegida-1]);
        alert("Has pagado el servicio " + servicios[opcionElegida-1] + ".\nSaldo anterior: $" + saldoAnterior + "\nDinero descontado: $" + precios[opcionElegida-1] + "\nSaldo actual: $" + saldoCuenta);
        actualizarSaldoEnPantalla();
    }
}
function transferencia(opcionElegida, montoIngresado) {
    resta(montoIngresado);
    actualizarSaldoEnPantalla();
    alert("Se han transferido $" + montoIngresado + "\nCuenta destino: " + numeroDeCuenta[opcionElegida-1]);
}