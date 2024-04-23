const incomeContainer = document.querySelector("#income-container");
const expensesContainer = document.querySelector("#expenses-container");
const incomeForm = document.querySelector("#income-form");
const expensesForm = document.querySelector("#expenses-form");

const baseURL = `${window.location.protocol}//${window.location.hostname}${
	window.location.port ? `:${window.location.port}` : ""
}`;

const incomeCallback = ({ data: income }) => displayIncomes(income);
const expensesCallback = ({ data: expenses }) => displayExpenses(expenses);
const errCallback = (err) => console.log(err.response.data);

const getAllIncome = () =>
	axios.get(baseURL).then(incomeCallback).catch(errCallback);
const createIncome = (body) =>
	axios.post(baseURL, body).then(incomeCallback).catch(errCallback);
const deleteIncome = (id) =>
	axios.delete(`${baseURL}/${id}`).then(incomeCallback).catch(errCallback);
const updateIncome = (id, type) =>
	axios
		.put(`${baseURL}/${id}`, { type })
		.then(incomeCallback)
		.catch(errCallback);

const getAllExpenses = () =>
	axios.get(baseURL).then(expensesCallback).catch(errCallback);
const createExpenses = (body) =>
	axios.post(baseURL, body).then(expensesCallback).catch(errCallback);
const deleteExpenses = (id) =>
	axios.delete(`${baseURL}/${id}`).then(expensesCallback).catch(errCallback);
const updateExpenses = (id, type) =>
	axios
		.put(`${baseURL}/${id}`, { type })
		.then(expensesCallback)
		.catch(errCallback);

function submitHandler(e) {
	e.preventDefault();

	// Income
	let payrollAmount = document.querySelector("#payroll-amount");
	let selfEmploymentAmount = document.querySelector("#self-employment-amount");
	let propertyRentAmount = document.querySelector("#property-rent-amount");
	let financialSupportAmount = document.querySelector(
		"#financial-support-amount"
	);
	let pensionAmount = document.querySelector("#pension-amount");
	let otherAmount = document.querySelector("#other-amount");

	// Expenses (existing)
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

	// Expenses (additional)
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

	// Reset all input fields after form submission
	const allInputs = [
		payrollAmount,
		selfEmploymentAmount,
		propertyRentAmount,
		financialSupportAmount,
		pensionAmount,
		otherAmount,
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

	allInputs.forEach((input) => {
		if (input) input.value = ""; // Only reset if the element exists
	});
}
