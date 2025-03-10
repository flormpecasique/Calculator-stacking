document.addEventListener("DOMContentLoaded", function() {
    const stakingForm = document.getElementById("staking-form");
    const amountInput = document.getElementById("amount");
    const providerSelect = document.getElementById("provider");
    const comparisonTable = document.getElementById("comparison-table").getElementsByTagName("tbody")[0];

    // Staking data
    const stakingData = {
        stackingdao: { apy: 9.94, apr: null, duration: "2 weeks", payment: "STX", restrictions: "No minimum deposit" },
        xverse: { apy: 10, apr: null, duration: "2 weeks", payment: "Satoshis (BTC)", restrictions: "Minimum deposit: 100 STX" },
        "binance-flexible": { apy: null, apr: 0.33, duration: "Flexible", payment: "STX", restrictions: "Minimum deposit: 0.1 STX" },
        "binance-30": { apy: null, apr: 2.1, duration: "30 days", payment: "Satoshis (BTC)", restrictions: "Locked staking" },
        "binance-60": { apy: null, apr: 2.8, duration: "60 days", payment: "Satoshis (BTC)", restrictions: "Locked staking" },
        "binance-90": { apy: null, apr: 3.99, duration: "90 days", payment: "Satoshis (BTC)", restrictions: "Locked staking" },
        "binance-120": { apy: null, apr: 5.0, duration: "120 days", payment: "Satoshis (BTC)", restrictions: "Locked staking" }
    };

    stakingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const provider = providerSelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // Verificar si ya hay un resultado para el mismo proveedor y reemplazarlo
        const existingRow = document.querySelector(`tr[data-provider="${provider}"]`);
        if (existingRow) {
            existingRow.remove();
        }

        // Calcular ganancias
        let reward = 0;
        const { apy, apr, duration, payment, restrictions } = stakingData[provider];

        if (apy) {
            reward = (amount * (apy / 100)) / 365 * 14; // Para 2 semanas
        } else if (apr) {
            reward = (amount * (apr / 100)) / 365 * duration.split(" ")[0]; // Días
        }

        // Insertar resultados en la tabla
        const row = comparisonTable.insertRow();
        row.setAttribute("data-provider", provider);
        row.innerHTML = `
            <td>${capitalize(provider)}</td>
            <td>${apy ? `${apy}% APY` : `${apr}% APR`}</td>
            <td>${reward.toFixed(4)} STX</td>
            <td>${duration}</td>
            <td>${payment}</td>
            <td>${restrictions}</td>
        `;
    });

    function capitalize(string) {
        return string.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }
});
