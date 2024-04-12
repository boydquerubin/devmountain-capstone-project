document.addEventListener("DOMContentLoaded", function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });
});

function setFrequency(frequency, dropdownId) {
    if (dropdownId) {
        document.getElementById(dropdownId).innerText = frequency;
    } else {
        document.getElementById("primary-income-frequency").innerText = frequency;
        document.getElementById("primary-expenses-frequency").innerText = frequency;
    }
}

// Example function to calculate and update total income
function updateTotalIncome() {
  // Get all the income input fields
  const incomeInputs = document.querySelectorAll(
    '.income-section input[type="text"]'
  );

  let totalIncome = 0;
  // Loop through each input field and sum up the values
  incomeInputs.forEach((input) => {
    const value = parseFloat(input.value) || 0; // Convert input value to a number
    totalIncome += value;s
  });

  // Update the total income display
  document.getElementById("total-income").textContent =
    "$" + totalIncome.toFixed(2);
}

function updateTotalIncome() {
    const payrollAmount = parseFloat(document.getElementById('payroll-amount').value) || 0;
    const selfEmploymentAmount = parseFloat(document.getElementById('self-employment-amount').value) || 0;
    const propertyRentAmount = parseFloat(document.getElementById('property-rent-amount').value) || 0;
    const financialSupportAmount = parseFloat(document.getElementById('financial-support-amount').value) || 0;
    const pensionAmount = parseFloat(document.getElementById('pension-amount').value) || 0;
    const otherAmount = parseFloat(document.getElementById('other-amount').value) || 0;

    const totalIncome = payrollAmount+ selfEmploymentAmount + propertyRentAmount + financialSupportAmount + pensionAmount + otherAmount;
    document.getElementById("total-income").textContent = "$" + totalIncome.toFixed(2);
}

function setFrequency(frequency, dropdownId) {
    if (dropdownId) {
        document.getElementById(dropdownId).innerText = frequency;
    } else {
        document.getElementById("primary-income-frequency").innerText = frequency;
        document.getElementById("primary-expenses-frequency").innerText = frequency;
    }
}
