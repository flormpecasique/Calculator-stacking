document.addEventListener("DOMContentLoaded", function() {
  // Obtener los elementos del DOM
  const stakingForm = document.getElementById("staking-form");
  const amountInput = document.getElementById("amount");
  const providerSelect = document.getElementById("provider");
  const cycleSelect = document.getElementById("cycle");
  const comparisonTable = document.getElementById("comparison-table").getElementsByTagName("tbody")[0];

  // Tasas de interés y parámetros por proveedor
  const stakingData = {
    stackingdao: {
      apy: "9.94%",
      apr: null,
      duration: "2 weeks",
      restrictions: "No minimum deposit",
      paymentMethod: "STX"
    },
    xverse: {
      apy: "10%",
      apr: null,
      duration: "2 weeks",
      restrictions: "Minimum deposit: 100 STX",
      paymentMethod: "STX"
    },
    binance: {
      apy: null,
      apr: {
        flexible: "0.33% per day",
        "30_days": "2.1% per year (paid in Satoshis)",
        "60_days": "2.8% per year (paid in Satoshis)",
        "90_days": "3.99% per year (paid in Satoshis)",
        "120_days": "5% per year (paid in Satoshis)"
      },
      duration: "Flexible/30, 60, 90, 120 days",
      restrictions: "Minimum deposit: 0.1 STX",
      paymentMethod: "Satoshis (BTC)"
    }
  };

  // Evento para calcular el rendimiento
  stakingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const amount = parseFloat(amountInput.value);
    const provider = providerSelect.value;
    const cycle = cycleSelect.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Calcular el rendimiento según el proveedor y el ciclo
    let reward = 0;
    let apy = stakingData[provider].apy;
    let apr = stakingData[provider].apr;
    let paymentMethod = stakingData[provider].paymentMethod;

    if (apy) {
      // Calcular con APY (para StakingDao y Xverse)
      reward = (amount * parseFloat(apy) / 100) / 365 * 14; // para 2 semanas
    } else if (apr) {
      // Calcular con APR (para Binance, dependiendo del ciclo seleccionado)
      if (provider === "binance") {
        switch (cycle) {
          case "flexible":
            reward = (amount * parseFloat(apr.flexible.replace("%", "")) / 100) * 14; // 14 días
            paymentMethod = "Satoshis (BTC)";
            break;
          case "30_days":
            reward = (amount * parseFloat(apr["30_days"].replace("%", "")) / 100) / 365 * 30;
            paymentMethod = "Satoshis (BTC)";
            break;
          case "60_days":
            reward = (amount * parseFloat(apr["60_days"].replace("%", "")) / 100) / 365 * 60;
            paymentMethod = "Satoshis (BTC)";
            break;
          case "90_days":
            reward = (amount * parseFloat(apr["90_days"].replace("%", "")) / 100) / 365 * 90;
            paymentMethod = "Satoshis (BTC)";
            break;
          case "120_days":
            reward = (amount * parseFloat(apr["120_days"].replace("%", "")) / 100) / 365 * 120;
            paymentMethod = "Satoshis (BTC)";
            break;
        }
      }
    }

    // Mostrar los resultados en la tabla
    const row = comparisonTable.insertRow();
    row.innerHTML = `
      <td>${capitalizeFirstLetter(provider)}</td>
      <td>${apy || apr[cycle]}</td>
      <td>${reward.toFixed(4)} STX</td>
      <td>${stakingData[provider].duration}</td>
      <td>${stakingData[provider].restrictions}</td>
      <td>${paymentMethod}</td>
    `;
  });

  // Función para capitalizar la primera letra del nombre del proveedor
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
