// Initialize total expense
let totalExpense = 0;

// Function to add expense
function addExpense(name, amount) {
  // Add expense to the list
  const expenseList = document.getElementById("expense-list");
  const listItem = document.createElement("li");
  listItem.className = "list-group-item";
  listItem.textContent = `${name}: $${amount}`;
  expenseList.appendChild(listItem);

  // Update total expense
  totalExpense += parseFloat(amount);
  document.getElementById(
    "total-expense"
  ).textContent = `Total Expense: $${totalExpense.toFixed(2)}`;
}

// Event listener for form submission
document
  .getElementById("expense-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = document.getElementById("expenseAmount").value;
    addExpense(expenseName, expenseAmount);
    // Clear input fields
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
  });
