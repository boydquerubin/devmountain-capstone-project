function setFrequency(frequency, dropdownId) {
    if (dropdownId) {
        document.getElementById(dropdownId).innerText = frequency;
    } else {
        document.getElementById('primary-income-frequency').innerText = frequency;
    }
}

// Example function to calculate and update total income
function updateTotalIncome() {
    // Get all the income input fields
    const incomeInputs = document.querySelectorAll('.income-section input[type="text"]');
    
    let totalIncome = 0;
    // Loop through each input field and sum up the values
    incomeInputs.forEach(input => {
        const value = parseFloat(input.value) || 0; // Convert input value to a number
        totalIncome += value;
    });
    
    // Update the total income display
    document.getElementById('total-income').textContent = '$' + totalIncome.toFixed(2);
}
