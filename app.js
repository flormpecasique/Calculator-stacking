document.getElementById("staking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);

  // Información de plataformas con APY, duración mínima y restricciones
  const platforms = {
    "StackingDAO": { apy: 0.09, duration: "Sin mínimo", restrictions: "Ninguna" },
    "Xverse": { apy: 0.07, duration: "30 días", restrictions: "Sin retiro antes de 30 días" },
    "Planbetter": { apy: 0.11, duration: "90 días", restrictions: "Bloqueo de 90 días" },
    "Fastpool by Ryder": { apy: 0.08, duration: "Sin mínimo", restrictions: "Sin restricciones" }
  };

  // Limpiar resultados anteriores
  const tbody = document.getElementById("comparison-table").querySelector("tbody");
  tbody.innerHTML = "";

  // Calcular las recompensas estimadas
  for (const platform in platforms) {
    const apy = platforms[platform].apy;
    const estimatedRewards = (amount * apy).toFixed(2);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${platform}</td>
      <td>${(apy * 100).toFixed(2)}%</td>
      <td>${estimatedRewards} STX</td>
      <td>${platforms[platform].duration}</td>
      <td>${platforms[platform].restrictions}</td>
    `;
    tbody.appendChild(row);
  }
});
