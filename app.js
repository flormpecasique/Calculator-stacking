document.getElementById("staking-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const provider = document.getElementById("provider").value;

    // Información de plataformas con tasas de APY, duración mínima y restricciones
    const platforms = {
        "stackingdao": { apy: 0.0994, duration: "2 semanas", restrictions: "Sin mínimo", method: "STX, rendimiento compuesto", liquidity: "Disponible con DeFi" },
        "binance": { apy: 0.0033, duration: "Flexible", restrictions: "Mínimo 0.1 STX", method: "STX, pagado en STX", liquidity: "Disponible en cualquier momento" },
        "xverse": { apy: 0.10, duration: "2 semanas", restrictions: "Mínimo 100 STX", method: "Satoshis", liquidity: "No disponible hasta fin de ciclo" }
    };

    // Limpiar resultados anteriores
    const tbody = document.getElementById("comparison-table").querySelector("tbody");
    tbody.innerHTML = "";

    // Verificar si el proveedor seleccionado tiene información
    if (platforms[provider]) {
        const apy = platforms[provider].apy;

        // Si el proveedor tiene un ciclo de 2 semanas, calculamos el rendimiento estimado para ese periodo
        let estimatedRewards = 0;
        if (provider === "binance") {
            // Binace es flexible, rendimiento diario
            estimatedRewards = (amount * apy * 365 / 12).toFixed(2);  // APY diario multiplicado por días
        } else {
            // Otros proveedores tienen un ciclo de 2 semanas
            estimatedRewards = (amount * apy * 2 / 14).toFixed(2);  // Rendimiento por 2 semanas
        }

        // Mostrar los resultados para el proveedor seleccionado
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${provider.charAt(0).toUpperCase() + provider.slice(1)}</td>
            <td>${(apy * 100).toFixed(2)}%</td>
            <td>${estimatedRewards} STX</td>
            <td>${platforms[provider].duration}</td>
            <td>${platforms[provider].restrictions}</td>
            <td>${platforms[provider].method}</td>
        `;
        tbody.appendChild(row);
    } else {
        alert("Proveedor no encontrado.");
    }
});
