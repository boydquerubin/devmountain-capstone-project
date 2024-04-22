let expenses = {}; // Stores expense amounts by their input IDs

document.addEventListener("DOMContentLoaded", function () {
  setupExpensesInputs();
  setupGetSummaryButton(); // Setup the navigation button at the bottom
});

function setupExpensesInputs() {
  const expenseInputs = document.querySelectorAll(
    ".expenses-section .form-control"
  );

  expenseInputs.forEach((input) => {
    // Initialize expenses object with input IDs
    expenses[input.id] = {
      amount: parseFloat(input.value) || 0,
      frequency: "Monthly", // Default frequency
    };

    // Set up input event listener
    input.addEventListener("input", function () {
      expenses[this.id].amount = parseFloat(this.value) || 0;
      updateTotalExpenses();
    });
  });
}

function updateExpensesFrequency(frequency, dropdownId) {
  const button = document.getElementById(dropdownId);
  if (button) {
    button.innerText = frequency; // Update button text to show the selected frequency
  }

  // Update frequency in expenses object for related input
  const inputId = dropdownId.replace("-frequency-dropdown", "-amount");
  if (expenses[inputId]) {
    expenses[inputId].frequency = frequency;
    updateTotalExpenses();
  }
}

function setupGetSummaryButton() {
  const getSummaryButton = document.querySelector(".get-summary-button");

  if (getSummaryButton) {
    getSummaryButton.addEventListener("click", function (event) {
      // Prevent the default form submission if the button is within a form
      event.preventDefault();

      const nextTabSelector = this.getAttribute("data-next");
      const nextTab = document.querySelector(
        `.nav-link[href='${nextTabSelector}']`
      );
      if (nextTab) {
        new bootstrap.Tab(nextTab).show(); // Use Bootstrap's Tab class to show the next tab
        window.scrollTo(0, 0); // Optionally, scroll to the top of the page
      } else {
        console.error(
          "Target tab for Get Summary button not found:",
          nextTabSelector
        );
      }
    });
  } else {
    console.error("Get Summary button not found on the page.");
  }
}

function updateTotalExpenses() {
  let totalMonthlyExpenses = 0;

  Object.keys(expenses).forEach((id) => {
    let expense = expenses[id];
    // Apply frequency multiplier to the amount
    let multiplier = expense.frequency === "Bi-Weekly" ? 2 : 1;
    totalMonthlyExpenses += expense.amount * multiplier;
  });

  document.getElementById(
    "total-expenses"
  ).textContent = `$${totalMonthlyExpenses.toFixed(2)}`;
}

function calculateTotalMonthlyExpenses() {
  let totalMonthlyExpenses = 0;
  let detailedExpenses = [];
  Object.keys(expenses).forEach((id) => {
    let expense = expenses[id];
    let monthlyAmount =
      expense.amount * getFrequencyMultiplier(expense.frequency);
    if (monthlyAmount > 0) {
      // Include only non-zero expenses
      detailedExpenses.push({ name: id, amount: monthlyAmount });
      totalMonthlyExpenses += monthlyAmount;
    }
  });
  return { total: totalMonthlyExpenses, details: detailedExpenses };
}

function getFrequencyMultiplier(frequency) {
  switch (frequency) {
    case "Bi-Weekly":
      return 2;
    case "Weekly":
      return 1;
    default:
      return 1; // Ensure this is indeed what you want for 'Monthly'
  }
}
