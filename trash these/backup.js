var budgetSummaryChart; // Global variable to hold the chart instance
var isSummaryListenerSet = false; // Ensure this is defined at the top level to track event binding
var expenseBreakdownChart;

function initializeBudgetSummaryChart() {
  const canvas = document.getElementById("budgetSummaryChart");
  const ctx = canvas.getContext("2d");

  // Destroy the existing chart instance if it exists
  if (budgetSummaryChart) {
    budgetSummaryChart.destroy();
  }

  // Create a new instance of the chart
  budgetSummaryChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: "Amount in $",
          data: [
            parseFloat(
              document
                .getElementById("total-income")
                .textContent.replace("$", "")
            ),
            parseFloat(
              document
                .getElementById("total-expenses")
                .textContent.replace("$", "")
            ),
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

function initializeExpenseBreakdownPieChart() {
  const canvas = document.getElementById("expenseBreakdownPieChart");
  const ctx = canvas.getContext("2d");

  if (expenseBreakdownChart) {
    expenseBreakdownChart.destroy();
  }

  const data = gatherExpenseData();
  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);

  // More visually appealing color palette
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
    "#4D5360",
    "#C9CBFF",
    "#FFB347",
    "#C7C7C7",
    "#BDB76B",
  ];

  // Generate dynamic colors if needed
  while (colors.length < data.length) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colors.push(`#${randomColor}`);
  }

  expenseBreakdownChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: data.map((e) => e.name),
      datasets: [
        {
          data: data.map((e) => e.amount),
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.5", "1")),
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const label = data[tooltipItem.dataIndex].name || "";
              const currentValue = tooltipItem.raw;
              const percentage = ((currentValue / totalAmount) * 100).toFixed(
                0
              );
              return `${label}: ${percentage}%`;
            },
          },
        },
      },
    },
  });
}

function gatherExpenseData() {
  const data = [
    {
      name: "Mortgage or Rent",
      amount: getAdjustedAmount(
        "mortgage-rent-amount",
        "mortgage-rent-frequency"
      ),
    },
    {
      name: "House Insurance",
      amount: getAdjustedAmount(
        "house-insurance-amount",
        "house-insurance-frequency"
      ),
    },
    {
      name: "Car Payments",
      amount: getAdjustedAmount(
        "car-payments-amount",
        "car-payments-frequency"
      ),
    },
    {
      name: "Car Insurance",
      amount: getAdjustedAmount(
        "car-insurance-amount",
        "car-insurance-frequency"
      ),
    },
    {
      name: "Health Insurance",
      amount: getAdjustedAmount(
        "health-insurance-amount",
        "health-insurance-frequency"
      ),
    },
    {
      name: "Vision",
      amount: getAdjustedAmount("vision-amount", "vision-frequency"),
    },
    {
      name: "Dental",
      amount: getAdjustedAmount("dental-amount", "dental-frequency"),
    },
    {
      name: "Electricity",
      amount: getAdjustedAmount("electricity-amount", "electricity-frequency"),
    },
    {
      name: "Water",
      amount: getAdjustedAmount("water-amount", "water-frequency"),
    },
    {
      name: "Sewer",
      amount: getAdjustedAmount("sewer-amount", "sewer-frequency"),
    },
    { name: "Gas", amount: getAdjustedAmount("gas-amount", "gas-frequency") },
    {
      name: "Waste Disposal",
      amount: getAdjustedAmount(
        "waste-disposal-amount",
        "waste-disposal-frequency"
      ),
    },
    {
      name: "Internet",
      amount: getAdjustedAmount("internet-amount", "internet-frequency"),
    },
    {
      name: "Shopping",
      amount: getAdjustedAmount("shopping-amount", "shopping-frequency"),
    },
    {
      name: "Ordering In or Dining Out",
      amount: getAdjustedAmount(
        "ordering-in-dining-out-amount",
        "ordering-in-dining-out-frequency"
      ),
    },
    {
      name: "Date Nights",
      amount: getAdjustedAmount("date-nights-amount", "date-nights-frequency"),
    },
    {
      name: "Family Date Nights",
      amount: getAdjustedAmount(
        "family-date-nights-amount",
        "family-date-nights-frequency"
      ),
    },
    {
      name: "Clothes",
      amount: getAdjustedAmount("clothes-amount", "clothes-frequency"),
    },
    {
      name: "Shoes",
      amount: getAdjustedAmount("shoes-amount", "shoes-frequency"),
    },
    {
      name: "Haircut",
      amount: getAdjustedAmount("haircuts-amount", "haircuts-frequency"),
    },
    {
      name: "Transportation",
      amount: getAdjustedAmount(
        "transportation-amount",
        "transportation-frequency"
      ),
    },
    {
      name: "Daycare",
      amount: getAdjustedAmount("daycare-amount", "daycare-frequency"),
    },
    {
      name: "Savings",
      amount: getAdjustedAmount("savings-amount", "savings-frequency"),
    },
    {
      name: "Emergency Fund",
      amount: getAdjustedAmount(
        "emergency-fund-amount",
        "emergency-fund-frequency"
      ),
    },
    {
      name: "Miscellaneous",
      amount: getAdjustedAmount(
        "miscellaneous-amount",
        "miscellaneous-frequency"
      ),
    },
  ].filter((item) => item.amount > 0);

  // console.log("Expense Data for Chart:", data);
  return data;
}

function getAdjustedAmount(amountId, frequencyId) {
  let amount = parseFloat(document.getElementById(amountId).value) || 0; // Use 0 as default if the value is not a number
  const frequencyElement = document.getElementById(frequencyId);
  const frequency = frequencyElement ? frequencyElement.value : "Monthly"; // Default to "Monthly" if frequency isn't specified

  // console.log(`Fetching amount for ${amountId}, frequency: ${frequency}, original amount: ${amount}`);

  if (frequency === "Bi-Weekly") {
    amount *= 26; // Adjust the amount for bi-weekly payments (26 bi-weekly periods in a year)
    console.log(`Adjusted amount for bi-weekly: ${amount}`);
  }

  return amount;
}

document.addEventListener("DOMContentLoaded", function () {
  // Setup listeners for all dropdown items and form inputs
  document
    .querySelectorAll(
      ".income-section .dropdown-menu .dropdown-item, .total-expenses-section .dropdown-menu .dropdown-item"
    )
    .forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        const selectedFrequency = this.innerText.trim();
        const dropdownId =
          this.closest(".dropdown-menu").getAttribute("aria-labelledby");
        if (this.closest(".income-section")) {
          updateIncomeFrequency(selectedFrequency, dropdownId);
          updateTotalIncome(selectedFrequency);
        } else if (this.closest(".total-expenses-section")) {
          updateExpensesFrequency(selectedFrequency, dropdownId);
          updateTotalExpenses(selectedFrequency);
        }
      });
    });

  document
    .querySelectorAll(".expense-frequency-selector")
    .forEach((selector) => {
      selector.addEventListener("change", function () {
        initializeExpenseBreakdownPieChart(); // Recalculate the chart when frequency changes
        updateSummaryMessage();
      });
    });

  // Input change listeners for updating the pie chart
  document.querySelectorAll(".form-control.mb-3").forEach((input) => {
    input.addEventListener("input", function () {
      initializeExpenseBreakdownPieChart(); // Update chart whenever an input changes
    });
  });

  // Tab button listeners
  document.querySelectorAll(".next-tab-button").forEach((button) => {
    button.addEventListener("click", function () {
      const nextTabSelector = this.getAttribute("data-next");
      const nextTab = document.querySelector(
        `.nav-link[href='${nextTabSelector}']`
      );
      new bootstrap.Tab(nextTab).show(); // Use Bootstrap's Tab class to show the next tab
    });
  });

  // Listener for when the summary tab is shown
  if (!isSummaryListenerSet) {
    document
      .querySelector('[href="#summary"]')
      .addEventListener("shown.bs.tab", function () {
        console.log("Summary tab shown, initializing chart");
        initializeBudgetSummaryChart();
        initializeExpenseBreakdownPieChart();
        updateSummaryMessage();
      });
    isSummaryListenerSet = true;
  }

  document.querySelectorAll(".frequency-selector").forEach((selector) => {
    selector.addEventListener("change", initializeExpenseBreakdownPieChart);
  });
});

function testAdjustments() {
  console.log(getAdjustedAmount("test-amount-id", "test-frequency-id"));
}

const incomeIds = [
  "payroll-frequency",
  "self-employment-frequency",
  "property-rent-frequency",
  "financial-support-frequency",
  "pension-frequency",
  "other-frequency",
];

const expenseIds = [
  "mortgage-rent-frequency",
  "house-insurance-frequency",
  "car-payments-frequency",
  "car-insurance-frequency",
  "health-insurance-frequency",
  "vision-frequency",
  "dental-frequency",
  "electricity-frequency",
  "water-frequency",
  "sewer-frequency",
  "gas-frequency",
  "waste-disposal-frequency",
  "internet-frequency",
  "shopping-frequency",
  "ordering-in-dining-out-frequency",
  "date-nights-frequency",
  "family-date-nights-frequency",
  "clothes-frequency",
  "shoes-frequency",
  "haircuts-frequency",
  "transportation-frequency",
  "daycare-frequency",
  "savings-frequency",
  "emergency-fund-frequency",
  "miscellaneous-frequency",
];

function updateIncomeFrequency(incomeFrequency, dropdownId) {
  const dropdownButton = document.getElementById(dropdownId);
  if (dropdownButton) {
    dropdownButton.innerText = incomeFrequency;
    updateTotalIncome(incomeFrequency);
  } else {
    console.error("Dropdown element not found:", dropdownId);
  }
}

function updateExpensesFrequency(expensesFrequency, dropdownId) {
  const dropdownButton = document.getElementById(dropdownId);

  if (dropdownButton) {
    dropdownButton.textContent = expensesFrequency;
    const dropdownItems =
      dropdownButton.nextElementSibling.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      if (item.textContent.trim() === expensesFrequency) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    updateTotalExpenses(expensesFrequency);
  } else {
    console.error("Dropdown element not found:", dropdownId);
  }
}

function updateTotal(selector, frequency) {
  console.log("Calculating total for frequency:", frequency);
  let total = 0;
  document.querySelectorAll(selector).forEach((input) => {
    console.log("Input value:", input.value);
    total += parseFloat(input.value) || 0;
  });
  console.log("Total:", total);
  return total;
}

function updateTotalIncome(selectedFrequency) {
  console.log(
    "updateTotalIncome function called with frequency:",
    selectedFrequency
  );
  const multiplier = selectedFrequency === "Bi-Weekly" ? 2 : 1; // Apply multiplier if frequency is Bi-Weekly
  let totalIncome = updateTotal(
    "#payroll-amount, #self-employment-amount, #property-rent-amount, #financial-support-amount, #pension-amount, #other-amount",
    selectedFrequency
  );
  console.log("Total Income Before Multiplier:", totalIncome);
  if (selectedFrequency === "Bi-Weekly") {
    console.log("Applying multiplier to total income...");
    totalIncome *= 2; // Apply multiplier to the total income
  }
  console.log("Total Income After Multiplier:", totalIncome);
  document.getElementById("total-income").textContent = `$${totalIncome.toFixed(
    2
  )}`;
  document.getElementById("total-income").textContent = `$${totalIncome.toFixed(
    2
  )}`;
  updateSummaryMessage(); // Update the summary message whenever total income updates
}

function updateTotalExpenses(expensesFrequency) {
  let totalExpenses = updateTotal(
    "#mortgage-rent-amount, #house-insurance-amount, #car-payments-amount, #car-insurance-amount, #health-insurance-amount, #vision-amount, #dental-amount, #electricity-amount, #water-amount, #sewer-amount, #gas-amount, #waste-disposal-amount, #internet-amount, #shopping-amount, #ordering-in-dining-out-amount, #date-nights-amount, #family-date-nights-amount, #clothes-amount, #shoes-amount, #haircuts-amount, #transportation-amount, #daycare-amount, #savings-amount, #emergency-fund-amount, #miscellaneous-amount",
    expensesFrequency
  );

  if (expensesFrequency === "Bi-Weekly") {
    totalExpenses *= 2;
  }

  document.getElementById(
    "total-expenses"
  ).textContent = `$${totalExpenses.toFixed(2)}`;
  document.getElementById(
    "total-expenses"
  ).textContent = `$${totalExpenses.toFixed(2)}`;
  updateSummaryMessage(); // Update the summary message whenever total expenses updates
}

function updateSummaryMessage() {
  const income =
    parseFloat(
      document.getElementById("total-income").textContent.replace("$", "")
    ) || 0;
  const expenses =
    parseFloat(
      document.getElementById("total-expenses").textContent.replace("$", "")
    ) || 0;

  const messageElement = document.getElementById("summaryMessage");

  if (income > expenses) {
    messageElement.textContent = "Good job! Your income exceeds your expenses.";
    messageElement.style.color = "green";
  } else if (expenses > income) {
    messageElement.textContent = "Uh-oh! Your expenses exceed your income.";
    messageElement.style.color = "red";
  } else {
    messageElement.textContent = "Your income and expenses are balanced.";
    messageElement.style.color = "black";
  }
}

window.onload = function () {
  initializeBudgetSummaryChart(); // Initial chart setups
  initializeExpenseBreakdownPieChart();
  updateSummaryMessage(); // Initial message update
};

CSSMatrixComponent.js;

//common.js not sure if this is needed, going to delete

// Global variables shared across files
var budgetSummaryChart;
var isSummaryListenerSet = false;
var expenseBreakdownChart;

function gatherExpenseData() {
  // Your existing gatherExpenseData function here
}

function getAdjustedAmount(amountId, frequencyId) {
  // Your existing getAdjustedAmount function here
}

// More shared or utility functions can be added here as needed
