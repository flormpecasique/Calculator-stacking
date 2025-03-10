document.addEventListener("DOMContentLoaded", function() {
    const stakingForm = document.getElementById("staking-form");
    const amountInput = document.getElementById("amount");
    const providerSelect = document.getElementById("provider");
    const comparisonTable = document.querySelector("#comparison-table tbody");
    const resetBtn = document.getElementById("reset-btn");

    // Staking data (hemos quitado "binance-flexible")
    const stakingData = {
        stackingdao: { apy: 9.94, apr: null, duration: 14, payment: "STX", restrictions: "No minimum deposit" },
        xverse: { apy: 10, apr: null, duration: 14, payment: "Satoshis (BTC)", restrictions: "Minimum deposit: 100 STX" },
        "binance-30": { apy: null, apr: 2.1, duration: 30, payment: "Satoshis (BTC)", restrictions: "Locked staking" },
        "binance-60": { apy: null, apr: 2.8, duration: 60, payment: "Satoshis (BTC)", restrictions: "Locked staking" },
        "binance-90": { apy: null, apr: 3.99, duration: 90, payment: "Satoshis (BTC)", restrictions: "Locked staking" },
        "binance-120": { apy: null, apr: 5.0, duration: 120, payment: "Satoshis (BTC)", restrictions: "Locked staking" }
    };

    stakingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const provider = providerSelect.value;

        if (isNaN(amount) || amount <= 0) {
            displayMessage("❌ Please enter a valid amount.", "error");
            return;
        }

        // Obtener datos del proveedor
        const { apy, apr, duration, payment, restrictions } = stakingData[provider];

        // Calcular ganancias
        let reward = 0;
        if (apy) {
            reward = (amount * (apy / 100)) / 365 * duration; // Cálculo basado en duración
        } else if (apr && duration !== "Flexible") {
            reward = (amount * (apr / 100)) / 365 * duration;
        }

        // Insertar resultados en la tabla
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${capitalize(provider)}</td>
            <td>${apy ? `${apy}% APY` : `${apr}% APR`}</td>
            <td>${reward.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} STX</td>
            <td>${typeof duration === "number" ? duration + " days" : duration}</td>
            <td>${payment}</td>
            <td>${restrictions}</td>
        `;

        comparisonTable.appendChild(row);
    });

    // Función para resetear la tabla
    resetBtn.addEventListener("click", function() {
        comparisonTable.innerHTML = "";
    });

    // Función para mostrar mensajes en pantalla
    function displayMessage(message, type) {
        const msgDiv = document.createElement("div");
        msgDiv.textContent = message;
        msgDiv.className = `message ${type}`;
        stakingForm.appendChild(msgDiv);

        setTimeout(() => msgDiv.remove(), 3000);
    }

    // Función para capitalizar nombres de proveedores
    function capitalize(string) {
        return string.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }
});
