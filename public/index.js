document.addEventListener("DOMContentLoaded", function () {
	// Handling dropdown item clicks in the income section
	const incomeDropdownItems = document.querySelectorAll(
		".income-section .dropdown-menu .dropdown-item"
	);
	incomeDropdownItems.forEach(function (item) {
		item.addEventListener("click", function (event) {
			event.preventDefault();
			const selectedFrequency = this.innerText.trim();
			const dropdownId =
				this.closest(".dropdown-menu").getAttribute("aria-labelledby");
			console.log("Selected Income Frequency:", selectedFrequency);
			updateIncomeFrequency(selectedFrequency, dropdownId);
			updateTotalIncome(selectedFrequency);
		});
	});

	// Handling dropdown item clicks in the expenses section
	const expenseDropdownItems = document.querySelectorAll(
		".total-expenses-section .dropdown-menu .dropdown-item"
	);
	expenseDropdownItems.forEach(function (item) {
		item.addEventListener("click", function (event) {
			event.preventDefault();
			const selectedFrequency = this.innerText.trim();
			const dropdownId =
				this.closest(".dropdown-menu").getAttribute("aria-labelledby");
			console.log("Selected Expense Frequency:", selectedFrequency);
			updateExpensesFrequency(selectedFrequency, dropdownId);
			updateTotalExpenses(selectedFrequency);
		});
	});

	// Handling click events for "Next" buttons on each tab
	const nextTabButtons = document.querySelectorAll(".next-tab-button");
	nextTabButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const nextTabSelector = this.getAttribute("data-next"); // Get the selector of the next tab from data attribute
			const nextTab = document.querySelector(
				`.nav-link[href='${nextTabSelector}']`
			);
			new bootstrap.Tab(nextTab).show(); // Use Bootstrap's Tab class to show the next tab
		});
	});
});

// Declare the chart variable outside of any function to make it globally accessible
var incomeExpenseChart;

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    if (incomeExpenseChart) {
        incomeExpenseChart.destroy(); // Destroy the existing chart instance if it exists
    }
    incomeExpenseChart = new Chart(ctx, {
        type: 'pie',
        // your chart configuration...
    });
    
    // Update chart function
    function updateChart(income, expenses) {
        if (incomeExpenseChart) {
            incomeExpenseChart.destroy(); // Ensure the old chart is destroyed
        }
        incomeExpenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Total Income', 'Total Expenses'],
                datasets: [{
                    label: 'Financial Overview',
                    data: [income, expenses],
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }
});


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
	const dropdownElement = document.getElementById(dropdownId);
	if (dropdownElement) {
		dropdownElement.innerText = incomeFrequency;
		updateTotalIncome(incomeFrequency);
	} else {
		console.error("Dropdown element not found:", dropdownId);
	}
}

function updateExpensesFrequency(expensesFrequency, dropdownId) {
	// Correct the ID to match the button's ID used in the HTML
	const dropdownElement = document.getElementById(dropdownId + "-dropdown");
	if (dropdownElement) {
		// Update the visible dropdown label
		dropdownElement.innerText = expensesFrequency;

		// Updating the active class for dropdown items if necessary
		const dropdownItems =
			dropdownElement.nextElementSibling.querySelectorAll(".dropdown-item");
		dropdownItems.forEach((item) => {
			if (item.innerText.trim() === expensesFrequency) {
				item.classList.add("active"); // Adding 'active' class or whatever class your CSS uses
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
