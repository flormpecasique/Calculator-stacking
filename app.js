document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos del DOM
  const stakingForm = document.getElementById("staking-form");
  const amountInput = document.getElementById("amount");
  const providerSelect = document.getElementById("provider");
  const comparisonTable = document.getElementById("comparison-table").getElementsByTagName("tbody")[0];

  // Tasas de interés y parámetros por proveedor
  const stakingData = {
    stackingdao: {
      apy: 9.94,
      apr: null,
      duration: "2 weeks",
      paymentMethod: "STX",
      restrictions: "No minimum deposit"
    },
    xverse: {
      apy: 10,
      apr: null,
      duration: "2 weeks",
      paymentMethod: "STX",
      restrictions: "Minimum deposit: 100 STX"
    },
    binance: {
      flexible: {
        apy: null,
        apr: 0.33,
        duration: "Flexible",
        paymentMethod: "STX",
        restrictions: "Minimum deposit: 0.1 STX"
      },
      locked: {
        "30": { apr: 2.1, duration: "30 days", paymentMethod: "BTC satoshis" },
        "60": { apr: 2.8, duration: "60 days", paymentMethod: "BTC satoshis" },
        "90": { apr: 3.99, duration: "90 days", paymentMethod: "BTC satoshis" },
        "120": { apr: 5, duration: "120 days", paymentMethod: "BTC satoshis" }
      }
    }
  };

  // Evento para calcular el rendimiento
  stakingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const amount = parseFloat(amountInput.value);
    const provider = providerSelect.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Verificar si ya hay una fila para este proveedor y actualizar en lugar de duplicar
    let existingRow = [...comparisonTable.rows].find(row => row.cells[0].textContent.toLowerCase() === provider);

    let reward = 0;
    let apy = stakingData[provider]?.apy;
    let apr = stakingData[provider]?.apr;
    let duration = stakingData[provider]?.duration;
    let paymentMethod = stakingData[provider]?.paymentMethod;
    let restrictions = stakingData[provider]?.restrictions;

    if (provider === "binance") {
      const lockPeriod = prompt("Enter Binance Staking duration: Flexible, 30, 60, 90, or 120 days");
      if (!lockPeriod) return;

      if (lockPeriod.toLowerCase() === "flexible") {
        apr = stakingData.binance.flexible.apr;
        duration = stakingData.binance.flexible.duration;
        paymentMethod = stakingData.binance.flexible.paymentMethod;
      } else if (stakingData.binance.locked[lockPeriod]) {
        apr = stakingData.binance.locked[lockPeriod].apr;
        duration = stakingData.binance.locked[lockPeriod].duration;
        paymentMethod = stakingData.binance.locked[lockPeriod].paymentMethod;
      } else {
        alert("Invalid Binance Staking duration.");
        return;
      }
    }

    if (apy) {
      reward = (amount * apy / 100) / 365 * 14; // para 2 semanas
    } else if (apr) {
      reward = (amount * apr / 100) * (duration.includes("day") ? parseInt(duration) : 14);
    }

    if (existingRow) {
      existingRow.cells[1].textContent = apy ? `${apy}%` : `${apr}%`;
      existingRow.cells[2].textContent = `${reward.toFixed(4)} STX`;
      existingRow.cells[3].textContent = duration;
      existingRow.cells[4].textContent = restrictions;
      existingRow.cells[5].textContent = paymentMethod;
    } else {
      // Agregar una nueva fila si es una plataforma nueva
      const row = comparisonTable.insertRow();
      row.innerHTML = `
        <td>${capitalizeFirstLetter(provider)}</td>
        <td>${apy ? `${apy}%` : `${apr}%`}</td>
        <td>${reward.toFixed(4)} STX</td>
        <td>${duration}</td>
        <td>${restrictions}</td>
        <td>${paymentMethod}</td>
      `;
    }
  });

  // Función para capitalizar la primera letra del nombre del proveedor
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
