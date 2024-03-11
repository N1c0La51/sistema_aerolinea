const readlineSync = require('readline-sync');

let maletasSanAndres = 0;
let maletasPereira = 0;
let maletasMedellin = 0;
let maletasCali = 0;
let maletasManizales = 0;
let maletasBarranquilla = 0;
let maletasBogota = 0;
let pesoTotalMaletas = 0;
let pesoTotalHombres = 0;
let cantidadMaletasHombres = 0;
let pesoTotalMujeres = 0;
let cantidadMaletasMujeres = 0;

function calcularPesoTotalMaletas() {
    console.log(`El peso total de las maletas en el avion es: ${pesoTotalMaletas} KG.`);
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
            break;
        case 'Cali':
            maletasCali++;
            break;
        case 'Manizales':
            maletasManizales++;
            break;
        case 'Barranquilla':
            maletasBarranquilla++;
            break;
        case 'Bogota':
            maletasBogota++;
            break;
    }
}

function obtenerDestinoMasDespachado() {
    let DestinoMasDespachado = '';
    let maxMaletas = -1;
    if (maletasSanAndres > maxMaletas) {
        DestinoMasDespachado = 'San Andres';
        maxMaletas = maletasSanAndres;
    }
    if (maletasPereira > maxMaletas) {
        DestinoMasDespachado = 'Pereira';
        maxMaletas = maletasPereira;
    }
    if (maletasMedellin > maxMaletas) {
        DestinoMasDespachado = 'Medellin';
        maxMaletas = maletasMedellin;
    }
    if (maletasCali > maxMaletas) {
        DestinoMasDespachado = 'Cali';
        maxMaletas = maletasCali;
    }
    if (maletasManizales > maxMaletas) {
        DestinoMasDespachado = 'Manizales';
        maxMaletas = maletasManizales;
    }
    if (maletasBarranquilla > maxMaletas) {
        DestinoMasDespachado = 'Barranquilla';
        maxMaletas = maletasBarranquilla;
    }
    if (maletasBogota > maxMaletas) {
        DestinoMasDespachado = 'Bogota';
        maxMaletas = maletasBogota;
    }
    return DestinoMasDespachado;
}

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
        ProcesarMaleta(destino);
        console.log(`Destino valido. Puede continuar con el registro de su maleta.`);
    } else {
        console.log(`El destino ingresado no es valido. Por favor, ingrese un destino valido.`);
        return registrarMaleta(); // Volver a solicitar el registro
    }

    const pesoMaleta = parseFloat(readlineSync.question(`Ingrese el peso de la maleta en KG: `));

    if (!isNaN(pesoMaleta) && pesoMaleta > 0) {
        pesoTotalMaletas += pesoMaleta;
        const costoTotal = calcularCostoMaleta(pesoMaleta);
        console.log(`El costo total de la maleta es: ${costoTotal}`);
    } else {
        console.log(`El peso ingresado no es valido. Por favor, ingrese un peso valido.`);
        return registrarMaleta(); // Volver a solicitar el registro
    }

    const genero = readlineSync.question(`Ingrese el genero del propietario de la maleta (h/m): `);
    if (genero !== 'h' && genero !== 'm') {
        console.log(`El genero ingresado no es valido. `);
        registrarMaleta(); // volver a solicitar el registro
    } else {
        if (genero === 'h') {
            pesoTotalHombres += pesoMaleta;
            cantidadMaletasHombres++;
        } else {
            pesoTotalMujeres += pesoMaleta;
            cantidadMaletasMujeres++;
        }
    }
}

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

const promedioPesoHombres = cantidadMaletasHombres === 0 ? 0 : pesoTotalHombres / cantidadMaletasHombres;
const promedioPesoMujeres = cantidadMaletasMujeres === 0 ? 0 : pesoTotalMujeres / cantidadMaletasMujeres;

console.log(`Promedio de peso de las maletas de los hombres: ${promedioPesoHombres} KG`);
console.log(`Promedio de peso de las maletas de las mujeres: ${promedioPesoMujeres} KG`);

const DestinoMasDespachado = obtenerDestinoMasDespachado();
console.log(`El destino al que m