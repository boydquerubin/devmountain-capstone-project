let incomes = {}; // Stores income amounts by their input IDs

document.addEventListener("DOMContentLoaded", function () {
  setupIncomeInputs();
  setupInputBillsButton();
});

function setupIncomeInputs() {
  const incomeInputs = document.querySelectorAll(
    ".income-section .form-control"
  );

  incomeInputs.forEach((input) => {
    incomes[input.id] = {
      amount: parseFloat(input.value) || 0,
      frequency: "Monthly",
    };

    input.addEventListener("input", function () {
      incomes[this.id].amount = parseFloat(this.value) || 0;
      updateTotalIncome();
    });
  });
}

function updateIncomeFrequency(frequency, dropdownId) {
  const button = document.getElementById(dropdownId);
  if (button) {
    button.innerText = frequency;
  }

  const inputId = dropdownId.replace("-frequency-dropdown", "-amount");
  if (incomes[inputId]) {
    incomes[inputId].frequency = frequency;
    updateTotalIncome();
  }
}

function setupInputBillsButton() {
  const inputBillsButton = document.querySelector(".input-bills-button");

  if (inputBillsButton) {
    inputBillsButton.addEventListener("click", function (event) {
      event.preventDefault();

      const nextTabSelector = this.getAttribute("data-next");
      const nextTab = document.querySelector(
        `.nav-link[href='${nextTabSelector}']`
      );
      if (nextTab) {
        new bootstrap.Tab(nextTab).show();
        window.scrollTo(0, 0);
      } else {
        console.error(
          "Target tab for Input Bills button not found:",
          nextTabSelector
        );
      }
    });
  } else {
    console.error("Input Bills button not found on the page.");
  }
}

function updateTotalIncome() {
  let totalMonthlyIncome = 0;

  Object.keys(incomes).forEach((id) => {
    let income = incomes[id];
    // Apply frequency multiplier to the amount
    let multiplier = income.frequency === "Bi-Weekly" ? 2 : 1;
    totalMonthlyIncome += income.amount * multiplier;
  });

  document.getElementById(
    "total-income"
  ).textContent = `$${totalMonthlyIncome.toFixed(2)}`;

  maybeUpdateCharts();
}

function maybeUpdateCharts() {
  const summaryTabIsActive = document
    .querySelector('.nav-link[href="#summary"]')
    .classList.contains("active");
  if (summaryTabIsActive) {
    drawChartsAndSummary();
  }
}

function calculateTotalMonthlyIncome() {
  let totalMonthlyIncome = 0;
  Object.keys(incomes).forEach((id) => {
    let income = incomes[id];
    let multiplier = getFrequencyMultiplier(income.frequency);
    let monthlyIncome = income.amount * multiplier;
    // console.log(
    // 	`ID: ${id}, Amount: ${income.amount}, Multiplier: ${multiplier}, MonthlyIncome: ${monthlyIncome}`
    // );
    totalMonthlyIncome += monthlyIncome;
  });
  // console.log(`Total Monthly Income: ${totalMonthlyIncome}`);
  return totalMonthlyIncome;
}

function getFrequencyMultiplier(frequency) {
  switch (frequency) {
    case "Bi-Weekly":
      return 2;
    case "Weekly":
      return 1;
    default:
      // Monthly
      return 1;
  }
}
