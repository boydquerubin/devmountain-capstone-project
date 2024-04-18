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
            datasets: [{
                label: "Amount in $",
                data: [
                    parseFloat(document.getElementById("total-income").textContent.replace('$', '')),
                    parseFloat(document.getElementById("total-expenses").textContent.replace('$', ''))
                ],
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function initializeExpenseBreakdownPieChart() {
    const canvas = document.getElementById("expenseBreakdownPieChart");
    const ctx = canvas.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (expenseBreakdownChart) {
        expenseBreakdownChart.destroy();
    }

    // Create a new instance of the chart
    expenseBreakdownChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: gatherExpenseData().map(e => e.name),
            datasets: [{
                label: "Expense Breakdown",
                data: gatherExpenseData().map(e => e.amount),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    // More colors as needed
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}


function gatherExpenseData() {
    const data = [
        { name: "Mortgage or Rent", amount: getAdjustedAmount("mortgage-rent-amount", "mortgage-rent-frequency") },
        { name: "House Insurance", amount: getAdjustedAmount("house-insurance-amount", "house-insurance-frequency") },
        { name: "Car Payments", amount: getAdjustedAmount("car-payments-amount", "car-payments-frequency") },
        { name: "Car Insurance", amount: getAdjustedAmount("car-insurance-amount", "car-insurance-frequency") },
        { name: "Health Insurance", amount: getAdjustedAmount("health-insurance-amount", "health-insurance-frequency") },
        // Add more categories as needed...
    ];
    console.log("Expense Data for Chart:", data);
    return data;
}

function getAdjustedAmount(amountId, frequencyId) {
    let amount = parseFloat(document.getElementById(amountId).value) || 0;
    const frequencyElement = document.getElementById(frequencyId);
    const frequency = frequencyElement ? frequencyElement.value : "Monthly";

    console.log(`Fetching amount for ${amountId}, frequency: ${frequency}, original amount: ${amount}`);

    if (frequency === "Bi-Weekly") {
        amount *= 2;  // Double the amount for bi-weekly
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

        document.querySelectorAll('.expense-frequency-selector').forEach(selector => {
            selector.addEventListener('change', function() {
                initializeExpenseBreakdownPieChart();  // Recalculate the chart when frequency changes
            });
        });        

	// Input change listeners for updating the pie chart
	document.querySelectorAll('.form-control.mb-3').forEach(input => {
        input.addEventListener('input', function() {
            initializeExpenseBreakdownPieChart();  // Update chart whenever an input changes
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
			});
		isSummaryListenerSet = true;
	}

    document.querySelectorAll('.frequency-selector').forEach(selector => {
    selector.addEventListener('change', initializeExpenseBreakdownPieChart);
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
}
