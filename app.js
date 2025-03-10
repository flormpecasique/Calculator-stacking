document.getElementById('staking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir envío del formulario

    const amount = parseFloat(document.getElementById('amount').value);
    const provider = document.getElementById('provider').value;
    const tableBody = document.getElementById('comparison-table').querySelector('tbody');

    // Evitar que se repitan los resultados
    if (Array.from(tableBody.rows).some(row => row.cells[0].innerText === provider)) {
        alert("Results for this provider already displayed.");
        return;
    }

    // Llamada a la función de cálculo dependiendo de la plataforma seleccionada
    let rewardData;
    switch (provider) {
        case 'stackingdao':
            rewardData = calculateStackingDAO(amount);
            break;
        case 'xverse':
            rewardData = calculateXverse(amount);
            break;
        case 'binance-flexible':
            rewardData = calculateBinance(amount, 0.33); // 0.33% APR
            break;
        case 'binance-30':
            rewardData = calculateBinance(amount, 0.5); // Ejemplo con otro APR
            break;
        case 'binance-60':
            rewardData = calculateBinance(amount, 0.7); // Ejemplo con otro APR
            break;
        case 'binance-90':
            rewardData = calculateBinance(amount, 0.9); // Ejemplo con otro APR
            break;
        case 'binance-120':
            rewardData = calculateBinance(amount, 1); // Ejemplo con otro APR
            break;
        default:
            rewardData = { apr: 0, apy: 0, reward: 0 };
    }

    // Insertar los resultados en la tabla
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${provider}</td>
        <td>${rewardData.apr}% / ${rewardData.apy}%</td>
        <td>${rewardData.reward} STX</td>
        <td>${rewardData.duration}</td>
        <td>${rewardData.payment}</td>
        <td>${rewardData.restrictions}</td>
    `;
});

function calculateStackingDAO(amount) {
    // Datos aproximados de StackingDAO para el ejemplo
    const apr = 9.4; // APR de ejemplo
    const apy = apr; // En este caso se asume el mismo APR y APY para simplificación
    const reward = (amount * apr / 100) * 1; // Cálculo de rendimiento anual
    const duration = "1 year"; // Duración de la inversión
    const payment = "STX Compound"; // Pagos en STX compuesto
    const restrictions = "None"; // Restricciones
    
    return { apr, apy, reward, duration, payment, restrictions };
}

function calculateXverse(amount) {
    // Cálculos de ejemplo para Xverse, usa datos específicos si tienes
    const apr = 7.0; // APR de ejemplo
    const apy = apr;
    const reward = (amount * apr / 100) * 1;
    const duration = "1 year";
    const payment = "STX Compound";
    const restrictions = "None";
    
    return { apr, apy, reward, duration, payment, restrictions };
}

function calculateBinance(amount, apr) {
    // Cálculos de ejemplo para Binance
    const apy = apr; // Para Binance, se usa el APR proporcionado directamente
    const reward = (amount * apr / 100) * 1; // Estimación de rendimiento anual
    const duration = "Flexible"; // Duración flexible o con base en el plan
    const payment = "STX Compound"; // Pagos en STX compuesto
    const restrictions = "None"; // Restricciones
    
    return { apr, apy, reward, duration, payment, restrictions };
}
