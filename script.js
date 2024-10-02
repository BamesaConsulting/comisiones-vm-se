// Evento que se activa al cambiar el valor del producto
document.getElementById('producto').addEventListener('change', function() {
    let producto = document.getElementById('producto').value;
    let msjFeeEnergia = document.getElementById('msj-fee-energia');
    
    // Obtener los inputs de Fee Energía
    let feeP1 = document.getElementById('feeP1');
    let feeP2 = document.getElementById('feeP2');
    let feeP3 = document.getElementById('feeP3');
    let feeP4 = document.getElementById('feeP4');
    let feeP5 = document.getElementById('feeP5');
    let feeP6 = document.getElementById('feeP6');

    if (producto === "FIJO") {
        // Ocultar el mensaje y hacer todos los campos requeridos
        msjFeeEnergia.style.setProperty('color', 'white', 'important');
        feeP1.required = true;
        feeP2.required = true;
        feeP3.required = true;
        feeP4.required = true;
        feeP5.required = true;
        feeP6.required = true;
    } else if (producto === "INDEXADO") {
        // Mostrar el mensaje y solo P1 requerido
        msjFeeEnergia.style.setProperty('color', '#3B7D23', 'important');
        feeP1.required = true;
        feeP2.required = false;
        feeP3.required = false;
        feeP4.required = false;
        feeP5.required = false;
        feeP6.required = false;
    }
});

document.getElementById('calcularBtn').addEventListener('click', function(event) {
    event.preventDefault();

    // Obtener valores de los inputs
    let tarifaAcceso = document.getElementById('tarifaAcceso').value;
    let producto = document.getElementById('producto').value;

    let consumoP1 = parseFloat(document.getElementById('p1').value) || 0;
    let consumoP2 = parseFloat(document.getElementById('p2').value) || 0;
    let consumoP3 = parseFloat(document.getElementById('p3').value) || 0;
    let consumoP4 = parseFloat(document.getElementById('p4').value) || 0;
    let consumoP5 = parseFloat(document.getElementById('p5').value) || 0;
    let consumoP6 = parseFloat(document.getElementById('p6').value) || 0;

    let potenciaP1 = parseFloat(document.getElementById('potenciaP1').value) || 0;
    let potenciaP2 = parseFloat(document.getElementById('potenciaP2').value) || 0;
    let potenciaP3 = parseFloat(document.getElementById('potenciaP3').value) || 0;
    let potenciaP4 = parseFloat(document.getElementById('potenciaP4').value) || 0;
    let potenciaP5 = parseFloat(document.getElementById('potenciaP5').value) || 0;
    let potenciaP6 = parseFloat(document.getElementById('potenciaP6').value) || 0;

    let feeEnergiaP1 = parseFloat(document.getElementById('feeP1').value) || 0;
    let feeEnergiaP2 = parseFloat(document.getElementById('feeP2').value) || 0;
    let feeEnergiaP3 = parseFloat(document.getElementById('feeP3').value) || 0;
    let feeEnergiaP4 = parseFloat(document.getElementById('feeP4').value) || 0;
    let feeEnergiaP5 = parseFloat(document.getElementById('feeP5').value) || 0;
    let feeEnergiaP6 = parseFloat(document.getElementById('feeP6').value) || 0;

    let feePotenciaP1 = parseFloat(document.getElementById('feePotenciaP1').value) || 0;
    let feePotenciaP2 = parseFloat(document.getElementById('feePotenciaP2').value) || 0;
    let feePotenciaP3 = parseFloat(document.getElementById('feePotenciaP3').value) || 0;
    let feePotenciaP4 = parseFloat(document.getElementById('feePotenciaP4').value) || 0;
    let feePotenciaP5 = parseFloat(document.getElementById('feePotenciaP5').value) || 0;
    let feePotenciaP6 = parseFloat(document.getElementById('feePotenciaP6').value) || 0;

    // Guardar estos valores en un objeto
    let datosEntrada = {
        tarifaAcceso,
        producto,
        consumo: [consumoP1, consumoP2, consumoP3, consumoP4, consumoP5, consumoP6],
        potencia: [potenciaP1, potenciaP2, potenciaP3, potenciaP4, potenciaP5, potenciaP6],
        feeEnergia: [feeEnergiaP1, feeEnergiaP2, feeEnergiaP3, feeEnergiaP4, feeEnergiaP5, feeEnergiaP6],
        feePotencia: [feePotenciaP1, feePotenciaP2, feePotenciaP3, feePotenciaP4, feePotenciaP5, feePotenciaP6]
    };

    // Inicializar los arrays
    let consumoEnergia = new Array(6).fill(0);
    let comisionPotencia = new Array(6).fill(0);

    // Calcular el consumo de energía según la tarifa de acceso
    if (producto === "FIJO") {
        for (let i = 0; i < datosEntrada.consumo.length; i++) {
            consumoEnergia[i] = datosEntrada.consumo[i] * (datosEntrada.feeEnergia[i] / 1000);
        }
    } else {
        for (let i = 0; i < datosEntrada.consumo.length; i++) {
            consumoEnergia[i] = datosEntrada.consumo[i] * (datosEntrada.feeEnergia[0] / 1000);
        }
    }

    // Calcular la comisión de potencia
    for (let i = 0; i < comisionPotencia.length; i++) {
        comisionPotencia[i] = (datosEntrada.feePotencia[i] * 12) * datosEntrada.potencia[i];
    }

    // Calcular los totales
    let totalConsumoEnergia = (consumoEnergia.reduce((acumulador, currentValue) => acumulador + currentValue, 0)) * 0.6;
    let totalComisionPotencia = (comisionPotencia.reduce((acumulador, currentValue) => acumulador + currentValue, 0)) * 0.6;

    // Calcular la comisión final
    let comisionFinal = (totalConsumoEnergia + totalComisionPotencia) * 0.70;

    // Mostrar el resultado en el elemento HTML
    document.getElementById('comisionResultado').textContent = comisionFinal.toFixed(2) + " €";

    console.log(totalComisionPotencia);
    console.log(totalConsumoEnergia);
});

