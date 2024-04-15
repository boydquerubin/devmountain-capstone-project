document.addEventListener("DOMContentLoaded", function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedFrequency = this.innerText.trim();
            updateIncomeFrequency(selectedFrequency); // Update income frequency
            updateExpensesFrequency(selectedFrequency); // Update expenses frequency
            updateTotalIncome(); // Update total income
            updateTotalExpenses(selectedFrequency); // Update total expenses
        });
    });
});

const incomeIds = [
    'primary-income-frequency', "self-employment-frequency", "property-rent-frequency", "financial-support-frequency", 
    "pension-frequency", "other-frequency"
];

const expenseIds = [
    'mortgage-rent', 'house-insurance', 'car-payments',
    'car-insurance', 'health-insurance', 'vision', 'dental',
    'electricity', 'water', 'sewer', 'gas', 'waste-disposal',
    'internet', 'shopping', 'ordering-in-dining-out', 'date-nights', 'family-date-nights',
    'clothes', 'shoes', 'haircuts', 'transportation', 'daycare',
    'savings', 'emergency-fund', 'miscellaneous'
];

function updateIncomeFrequency(incomeFrequency) {
    incomeIds.forEach(id => {
        document.getElementById(id).innerText = incomeFrequency;
    });
}

function updateExpensesFrequency(expensesFrequency) {
    expenseIds.forEach(id => {
        document.getElementById(`${id}-frequency`).innerText = expensesFrequency;
    });
}

function updateTotal(selector, frequency) {
    let total = 0;
    document.querySelectorAll(selector).forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    return frequency === 'Bi-Weekly' ? total * 2 : total;
}

function updateTotalIncome() {
    const selectedFrequency = document.getElementById('select-frequency').innerText.trim();
    const totalIncome = updateTotal('#payroll-amount, #self-employment-amount, #property-rent-amount, #financial-support-amount, #pension-amount, #other-amount', selectedFrequency);
    document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
}

function updateTotalExpenses(expensesFrequency) {
    const totalExpenses = updateTotal('#mortgage-rent-amount, #house-insurance-amount, #car-payments-amount, #car-insurance-amount, #health-insurance-amount, #vision-amount, #dental-amount, #electricity-amount, #water-amount, #sewer-amount, #gas-amount, #waste-disposal-amount, #internet-amount, #shopping-amount, #ordering-in-dining-out-amount, #date-nights-amount, #family-date-nights-amount, #clothes-amount, #shoes-amount, #haircuts-amount, #transportation-amount, #daycare-amount, #savings-amount, #emergency-fund-amount, #miscellaneous-amount', expensesFrequency);
    document.getElementById('total-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
}
