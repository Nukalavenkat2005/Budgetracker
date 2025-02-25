let transactions = [];

function updateBalance() {
    const income = transactions
        .filter(item => item.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expense = transactions
        .filter(item => item.amount < 0)
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

    const balance = income - expense;

    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
    document.getElementById("income-amount").textContent = `$${income.toFixed(2)}`;
    document.getElementById("expense-amount").textContent = `$${expense.toFixed(2)}`;
}

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description.trim() === "" || isNaN(amount)) {
        alert("Please enter a valid description and amount!");
        return;
    }

    const transaction = {
        id: transactions.length + 1,
        description,
        amount: type === "expense" ? -amount : amount, // Negative for expenses
        type
    };

    transactions.push(transaction);
    displayTransactions();
    updateBalance();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    displayTransactions();
    updateBalance();
}

function displayTransactions() {
    const transactionList = document.getElementById("transactions");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.classList.add(transaction.type);
        li.innerHTML = `${transaction.description}: $${Math.abs(transaction.amount).toFixed(2)}
                        <button onclick="deleteTransaction(${transaction.id})">X</button>`;
        transactionList.appendChild(li);
    });
}
