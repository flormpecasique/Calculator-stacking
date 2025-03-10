document.addEventListener("DOMContentLoaded", function() {
  // Obtener los elementos del DOM
  const stakingForm = document.getElementById("staking-form");
  const amountInput = document.getElementById("amount");
  const providerSelect = document.getElementById("provider");
  const comparisonTable = document.getElementById("comparison-table").getElementsByTagName("tbody")[0];

  // Tasas de interés y parámetros por proveedor
  const stakingData = {
    stackingdao: {
      apy: "9.94%",
      apr: null,
      duration: "2 weeks",
      restrictions: "No minimum deposit"
    },
    xverse: {
      apy: "10%",
      apr: null,
      duration: "2 weeks",
      restrictions: "Minimum deposit: 100 STX"
    },
    binance: {
      apy: null,
      apr: "0.33% per day",
      duration: "Flexible",
      restrictions: "Minimum deposit: 0.1 STX"
    }
  };

  // Evento para calcular el rendimiento
  stakingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const amount = parseFloat(amountInput.value);
    const provider = providerSelect.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Calcular el rendimiento según el proveedor
    let reward = 0;
    let apy = stakingData[provider].apy;
    let apr = stakingData[provider].apr;

    if (apy) {
      reward = (amount * parseFloat(apy) / 100) / 365 * 14; // para 2 semanas
    } else if (apr) {
      reward = (amount * parseFloat(apr.replace("%", "")) / 100) * 14; // 14 días
    }

    // Mostrar los resultados en la tabla
    const row = comparisonTable.insertRow();
    row.innerHTML = `
      <td>${capitalizeFirstLetter(provider)}</td>
      <td>${apy || apr}</td>
      <td>${reward.toFixed(4)} STX</td>
      <td>${stakingData[provider].duration}</td>
      <td>${stakingData[provider].restrictions}</td>
    `;
  });

  // Función para capitalizar la primera letra del nombre del proveedor
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
