const readlineSync = require('readline-sync');

//variables para mantener un registro del numero de maletas despachadas por destino
let maletasSanAndres = 0;
let maletasPereira = 0;
let maletasMedellin = 0;
let maletasCali = 0;
let maletasManizales = 0;
let maletasBarranquilla = 0;
let maletasBogota = 0;
let pesoTotalMaletas = 0;

function calcularPesoTotalMaletas() {
    console.log(`El peso total de las maletas en el avion es: ${pesoTotalMaletas} KG.`)
}

function ProcesarMaleta(destino) {
    switch (destino) {
        case 'San Andres':
            maletasSanAndres++;
            break;
        case 'Pereira':
            maletasPereira++;
            break;
        case 'Medellin':
            maletasMedellin++;
            break
        case 'Cali':
            maletasCali++;
            break;
        case 'Manizales':
            maletasManizales++;
            break;
        case 'Barranquilla':
            maletasBrranquilla;
            break;
        case 'Bogota':
            maletasBogota;
            break;

    }
}
//funcion para obtener el destino al que se despacharon mas maletas
function obtenerDestinoMasDespachado() {
    let DestinoMasDespachado = '';
    let maxMaletas = -1;
    if (maletasSanAndres > maxMaletas) {
        DestinoMasDespachado = 'San Andres';
        maxMaletas = maletasSanAndres;
        if (maletasPereira > maxMaletas) {
            DestinoMasDespachado = 'Pereira'
            maxMaletas = maletasPereira;
        }
        if (maletasMedellin > maxMaletas) {
            DestinoMasDespachado = 'Medellin'
            maxMaletas = maletasMedellin;
        }
        if (maletasCali > maxMaletas) {
            DestinoMasDespachado = 'Cali'
            maxMaletas = maletasCali;
        }
        if (maletasManizales > maxMaletas) {
            DestinoMasDespachado = 'Manizales'
            maxMaletas = maletasManizales;
        }
        if (maletasBarranquilla > maxMaletas) {
            DestinoMasDespachado = 'Barranquilla'
            maxMaletas = maletasBarranquilla;
        }
        if (maletasBogota > maxMaletas) {
            DestinoMasDespachado = 'Bogota'
            maxMaletas = maletasBogota;
        }
        return DestinoMasDespachado;
    }
}
function validarGenero(genero) {
    return genero.toLowerCase() === 'masculino' || genero.toLowerCase() === 'femenino';
}

//funcion para calcular el costo de las maletas
function calcularCostoMaleta(pesoMaleta) {
    let costoTotalMaleta = 0;
    const costoBaseMaleta = 20000;
    const pesoMaximoMaleta = 23;
    const costoPorKiloAdicional = 5000;

    if (pesoMaleta > pesoMaximoMaleta) {
        const KilosExtra = pesoMaleta - pesoMaximoMaleta;
        const costoAdicional = KilosExtra * costoPorKiloAdicional;
        costoTotalMaleta = costoBaseMaleta + costoAdicional;
    } else {
        costoTotalMaleta = costoBaseMaleta;
    }
    return costoTotalMaleta;
}

// Lista de destinos válidos
const destinosValidos = ['San Andres', 'Pereira', 'Medellin', 'Cali', 'Manizales', 'Barranquilla', 'Bogota'];

function validarOrigen(origen) {
    return destinosValidos.includes(origen);
}

function registrarMaleta() {
    const origen = readlineSync.question(`Ingrese el origen de su maleta: `);

    if (validarOrigen(origen)) {
        console.log(`Origen valido. Puede continuar con el registro de su maleta.`);
    } else {
        console.log(`El origen ingresado no es valido. Por favor, ingrese un origen válido.`);
        return registrarMaleta(); // Volver a solicitar el registro
    }

    let num_vuelo = readlineSync.question(`Ingrese su número de vuelo: `);

    if (isNaN(num_vuelo)) {
        console.log(`El numero de vuelo no es valido. Por favor, ingrese un numero de vuelo valido.`);
        return registrarMaleta(); // Volver a solicitar el registro
    } else {
        console.log(`Numero de vuelo valido, puede continuar con el registro de su maleta.`);
    }

    const destino = readlineSync.question(`Ingrese el destino de su maleta: `);

    if (validarOrigen(destino)) {
        //llamado a la funcion de procesar maleta
        ProcesarMaleta(destino)
        //continuar con el registro de la maleta
        console.log(`Destino valido. Puede continuar con el registro de su maleta.`)
    } else {
        console.log(`EL destino ingresado no es valido. Por favor, ingrese un destino valido. `)
        registrarMaleta(); //volver a solicitar el registro
    }

    const pesoMaleta = parseFloat(readlineSync.question(`Ingrese el peso de la maleta en KG: `));

    if (!isNaN(pesoMaleta) && pesoMaleta > 0) {
        pesoTotalMaletas += pesoMaleta;
        const costoTotal = calcularCostoMaleta(pesoMaleta);
        console.log(`El costo total de la maleta es: ${costoTotal}`);
    } else {
        console.log(`El peso ingresado no es valido. Por favor, ingrese un peso valido.`);
        registrarMaleta();//volver a solicitar el peso
    }
    const genero = readlineSync.question(`ingrese el genero del dueño de la maleta (masculino/femenino): `);

    if (validarGenero(genero)) {
        //continuar con el registro de la maleta
        console.log(`Genero valido. puede continuar con el registro de su maleta.`)
    } else {
        console.log(`El genero ingresado no es valido. Por favor, ingrese 'masculino' o 'femenino'.`);
        registrarMaleta(); //volver a solicitar el genero
    }
}

// Ejemplo de uso
const cantidadMaletas = parseInt(readlineSync.question(`Ingrese la cantidad de maletas a registrar: `));
if (!isNaN(cantidadMaletas) && cantidadMaletas > 0) {
    for (let i = 0; i < cantidadMaletas; i++) {
        console.log(`---Registro de la maleta ${i + 1}---`);
        registrarMaleta();
    }
    calcularPesoTotalMaletas();
} else {
    console.log(`La cantidad ingresada no es valida. Por favor, ingrese un numero valido.`);
}
const DestinoMasDespachado = obtenerDestinoMasDespachado();
console.log(`El destino al que m