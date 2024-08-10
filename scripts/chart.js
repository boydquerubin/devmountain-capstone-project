// Global scope for chart references
var incomeExpensesChart;
var expensesDonutChart;

function drawChartsAndSummary() {
  const totalIncome = calculateTotalMonthlyIncome(); // Assumes this function is defined in income.js
  const expenseDetails = calculateTotalMonthlyExpenses(); // Assumes this function returns total and details

  // Update summary message based on income and expenses comparison
  const summaryMessage = document.getElementById("summaryMessage");
  if (totalIncome > expenseDetails.total) {
    summaryMessage.textContent = "Good job! Your budget looks great.";
    summaryMessage.style.color = "green";
  } else if (expenseDetails.total > totalIncome) {
    // Updated to use innerHTML for including a link
    summaryMessage.innerHTML =
      'Uh-oh! Your expenses exceed your income. <br/ >Check out some money saving tips <a href="./tips.html" target="_blank" style="color: red;">here</a>.';
    summaryMessage.style.color = "red";
  } else {
    summaryMessage.textContent = "Your income and expenses are balanced.";
    summaryMessage.style.color = "blue";
  }

  // Prepare to update or recreate bar chart
  const ctxBar = document.getElementById("budgetSummaryChart").getContext("2d");
  if (incomeExpensesChart) {
    incomeExpensesChart.destroy(); // Ensure previous chart is destroyed
  }
  incomeExpensesChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: "Amount in $",
          data: [totalIncome, expenseDetails.total],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Prepare to update or recreate donut chart
  const ctxDonut = document
    .getElementById("expenseBreakdownPieChart")
    .getContext("2d");
  const data = expenseDetails.details.map(
    (exp) => (exp.amount / expenseDetails.total) * 100
  ); // Convert amounts to percentages
  const labels = expenseDetails.details.map((exp) => exp.name);
  const colors = generateColorArray(expenseDetails.details.length);
  const borderColor = generateColorArray(expenseDetails.details.length, true);

  if (expensesDonutChart) {
    expensesDonutChart.destroy(); // Ensure previous chart is destroyed
  }
  expensesDonutChart = new Chart(ctxDonut, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Expenses Breakdown",
          data: data,
          backgroundColor: colors,
          borderColor: borderColor,
          borderWidth: 1,
          // hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(0)}%`;
            },
          },
        },
      },
    },
  });
}

function generateColorArray(count, isBorder = false) {
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  const borders = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  return Array.from({ length: count }, (_, i) =>
    isBorder ? borders[i % borders.length] : colors[i % colors.length]
  );
}
