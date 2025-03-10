document.getElementById("staking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const provider = document.getElementById("provider").value;

  // Información de plataformas con tasas de APY, duración mínima y restricciones
  const platforms = {
    "stackingdao": { 
      apy: 0.0994, // 9.94% anual
      duration: "Ciclos de 2 semanas",
      restrictions: "Flexible, sin mínimo. Necesitas esperar al próximo ciclo.",
      getReward: function(amount) {
        const annualReward = amount * this.apy; // Rendimiento anual estimado
        const biweeklyReward = annualReward / 26; // Dividir por 26 para obtener el rendimiento cada 2 semanas
        return biweeklyReward.toFixed(4); // Recompensa estimada por ciclo de 2 semanas
      }
    },
    "xverse": { 
      apy: 0.10, // Aproximadamente 10% anual
      duration: "Ciclos de 2 semanas",
      restrictions: "No se puede retirar hasta finalizar el ciclo. Mínimo 100 STX.",
      getReward: function(amount) {
        if (amount < 100) return "Debes ingresar al menos 100 STX";
        const annualReward = amount * this.apy; // Rendimiento anual estimado
        const biweeklyReward = annualReward / 26; // Dividir por 26 para obtener el rendimiento cada 2 semanas
        return biweeklyReward.toFixed(4); // Recompensa estimada por ciclo de 2 semanas
      }
    },
    "binance": { 
      apr: 0.0033, // 0.33% diario (APR)
      duration: "Flexible, sin mínimo",
      restrictions: "Sin restricciones, puedes retirar en cualquier momento.",
      getReward: function(amount) {
        const dailyReward = amount * this.apr; // 0.33% diario
        return dailyReward.toFixed(4); // Recompensa diaria
      }
    }
  };

  // Limpiar resultados anteriores
  const tbody = document.getElementById("comparison-table").querySelector("tbody");
  tbody.innerHTML = "";

  // Verificar si el proveedor seleccionado tiene información
  if (platforms[provider]) {
    const reward = platforms[provider].getReward(amount);

    // Mostrar los resultados para el proveedor seleccionado
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${provider.charAt(0).toUpperCase() + provider.slice(1)}</td>
      <td>${provider === 'binance' ? (this.apr * 100).toFixed(2) + "%" : (platforms[provider].apy * 100).toFixed(2) + "%"}</td>
      <td>${reward} STX</td>
      <td>${platforms[provider].duration}</td>
      <td>${platforms[provider].restrictions}</td>
    `;
    tbody.appendChild(row);
  } else {
    alert("Proveedor no encontrado.");
  }
});
