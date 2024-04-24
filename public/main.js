const incomeContainer = document.querySelector("#income-container");
const incomeForm = document.querySelector("#income-form");
const baseURL = "http://localhost:3000";

// Function to display all incomes in the UI
const displayIncome = (incomes) => {
	incomeContainer.innerHTML = ""; // Clear existing content
	incomes.forEach((inc) => {
		const div = document.createElement("div");
		div.textContent = `${inc.description || "Income"}: $${inc.amount} (${
			inc.frequency
		})`;
		incomeContainer.appendChild(div);
	});
};

const errCallback = (err) => console.error("Error:", err.response.data);

// Function to fetch all incomes from the server
const getAllIncome = () =>
	axios
		.get(`${baseURL}/income`)
		.then(({ data }) => displayIncome(data))
		.catch(errCallback);

// Function to create or update income
const createOrUpdateIncome = (data, id) => {
	const url = `${baseURL}/income${id ? `/${id}` : ""}`;
	axios[id ? "put" : "post"](url, data)
		.then(({ data }) => {
			console.log(id ? "Updated income" : "Created income");
			getAllIncome(); // Refresh the list of incomes
		})
		.catch(errCallback);
};

// Function to delete an income
const deleteIncome = (id) => {
	axios
		.delete(`${baseURL}/income/${id}`)
		.then(() => {
			console.log("Deleted income");
			getAllIncome(); // Refresh the list
		})
		.catch(errCallback);
};

// Event handler for form submission
incomeForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const formData = new FormData(incomeForm);
	const incomeData = {
		payroll: formData.get("payroll-amount"),
		selfEmployment: formData.get("self-employment-amount"),
		propertyRent: formData.get("property-rent-amount"),
		financialSupport: formData.get("financial-support-amount"),
		pension: formData.get("pension-amount"),
		other: formData.get("other-amount"),
	};
	const incomeId = incomeForm.dataset.incomeId; // Get the income ID if it's an update
	createOrUpdateIncome(incomeData, incomeId);
});

// Load all incomes when the page loads
document
	.getElementById("loadIncomeData")
	.addEventListener("click", getAllIncome);

// Additional functionality for saving 'Other' income
document.getElementById("saveOther").addEventListener("click", function () {
	const otherIncomeData = {
		description: document.getElementById("other-income").value,
		amount: document.getElementById("other-amount").value,
		frequency: document
			.querySelector("#other-frequency-dropdown")
			.textContent.trim(),
	};
	const otherIncomeId =
		document.getElementById("other-income").dataset.incomeId;
	createOrUpdateIncome(otherIncomeData, otherIncomeId);
});

// Functionality for deleting 'Other' income
document.getElementById("deleteOther").addEventListener("click", function () {
	const otherIncomeId =
		document.getElementById("other-income").dataset.incomeId;
	if (otherIncomeId) {
		deleteIncome(otherIncomeId);
	} else {
		alert("No 'Other' income selected for deletion.");
	}
});
