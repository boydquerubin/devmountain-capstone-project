import { baseURL } from "./baseURL.js";

const expensesContainer = document.querySelector("#expenses-container");
const expensesForm = document.querySelector("#expenses-form");

const expensesCallback = ({ data: expenses }) => displayExpenses(expenses);
const errCallback = (err) => console.error(err.response.data);

const getAllExpenses = () =>
	axios.get(`${baseURL}/expenses`).then(expensesCallback).catch(errCallback);
const createExpenses = (body) =>
	axios
		.post(`${baseURL}/expenses`, body)
		.then(expensesCallback)
		.catch(errCallback);
const deleteExpenses = (id) =>
	axios
		.delete(`${baseURL}/expenses/${id}`)
		.then(expensesCallback)
		.catch(errCallback);
const updateExpenses = (id, type) =>
	axios
		.put(`${baseURL}/expenses/${id}`, { type })
		.then(expensesCallback)
		.catch(errCallback);

function submitExpensesHandler(e) {
	e.preventDefault();

	let mortgageRentAmount = document.querySelector("#mortgage-rent-amount");
	let houseInsuranceAmount = document.querySelector("#house-insurance-amount");
	let carPaymentsAmount = document.querySelector("#car-payments-amount");
	let carInsuranceAmount = document.querySelector("#car-insurance-amount");
	let healthInsuranceAmount = document.querySelector(
		"#health-insurance-amount"
	);
	let visionAmount = document.querySelector("#vision-amount");
	let dentalAmount = document.querySelector("#dental-amount");
	let electricityAmount = document.querySelector("#electricity-amount");
	let waterAmount = document.querySelector("#water-amount");
	let sewerAmount = document.querySelector("#sewer-amount");
	let gasAmount = document.querySelector("#gas-amount");
	let wasteDisposalAmount = document.querySelector("#waste-disposal-amount");
	let internetAmount = document.querySelector("#internet-amount");
	let shoppingAmount = document.querySelector("#shopping-amount");
	let orderingInDiningOutAmount = document.querySelector(
		"#ordering-in-dining-out-amount"
	);
	let dateNightsAmount = document.querySelector("#date-nights-amount");
	let familyDateNightsAmount = document.querySelector(
		"#family-date-nights-amount"
	);
	let clothesAmount = document.querySelector("#clothes-amount");
	let shoesAmount = document.querySelector("#shoes-amount");
	let haircutsAmount = document.querySelector("#haircuts-amount");
	let transportationAmount = document.querySelector("#transportation-amount");
	let daycareAmount = document.querySelector("#daycare-amount");
	let savingsAmount = document.querySelector("#savings-amount");
	let emergencyFundAmount = document.querySelector("#emergency-fund-amount");
	let miscellaneousAmount = document.querySelector("#miscellaneous-amount");

	const allExpenseInputs = [
		mortgageRentAmount,
		houseInsuranceAmount,
		carPaymentsAmount,
		carInsuranceAmount,
		healthInsuranceAmount,
		visionAmount,
		dentalAmount,
		electricityAmount,
		waterAmount,
		sewerAmount,
		gasAmount,
		wasteDisposalAmount,
		internetAmount,
		shoppingAmount,
		orderingInDiningOutAmount,
		dateNightsAmount,
		familyDateNightsAmount,
		clothesAmount,
		shoesAmount,
		haircutsAmount,
		transportationAmount,
		daycareAmount,
		savingsAmount,
		emergencyFundAmount,
		miscellaneousAmount,
	];

	allExpenseInputs.forEach((input) => {
		if (input) input.value = "";
	});

	// Further processing like sending data to the server can be added here
}

expensesForm.addEventListener("submit", submitExpensesHandler);

document
	.querySelector("#loadExpensesData")
	.addEventListener("click", getAllExpenses);
