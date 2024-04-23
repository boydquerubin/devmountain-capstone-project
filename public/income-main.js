import { baseURL } from "./baseURL.js";

const incomeContainer = document.querySelector("#income-container");
const incomeForm = document.querySelector("#income-form");

const incomeCallback = ({ data: income }) => displayIncome(income);
const errCallback = (err) => console.error(err.response.data);

// Fetch all incomes to display to the user
const getAllIncome = () =>
	axios.get(`${baseURL}/income`).then(incomeCallback).catch(errCallback);

// Create a new income entry
const createIncome = (body) =>
	axios.post(`${baseURL}/income`, body).then(incomeCallback).catch(errCallback);

// Delete an income entry
const deleteIncome = (id) =>
	axios
		.delete(`${baseURL}/income/${id}`)
		.then(incomeCallback)
		.catch(errCallback);

// Update an existing income entry
const updateIncome = (id, data) =>
	axios
		.put(`${baseURL}/income/${id}`, data)
		.then(incomeCallback)
		.catch(errCallback);

// Function to handle form submission
function submitIncomeHandler(e) {
	e.preventDefault();

	// Gather input values
	let payrollAmount = document.querySelector("#payroll-amount").value;
	let selfEmploymentAmount = document.querySelector(
		"#self-employment-amount"
	).value;
	let propertyRentAmount = document.querySelector(
		"#property-rent-amount"
	).value;
	let financialSupportAmount = document.querySelector(
		"#financial-support-amount"
	).value;
	let pensionAmount = document.querySelector("#pension-amount").value;
	let otherAmount = document.querySelector("#other-amount").value;

	// Prepare data for submission
	const incomeData = {
		payroll: payrollAmount,
		selfEmployment: selfEmploymentAmount,
		propertyRent: propertyRentAmount,
		financialSupport: financialSupportAmount,
		pension: pensionAmount,
		other: otherAmount,
	};

	// Optionally, decide whether to create or update based on whether an ID exists
	createIncome(incomeData);

	// Clear the form inputs after submission
	document
		.querySelectorAll("#income-form input")
		.forEach((input) => (input.value = ""));
}

incomeForm.addEventListener("submit", submitIncomeHandler);

document
	.querySelector("#loadIncomeData")
	.addEventListener("click", getAllIncome);
