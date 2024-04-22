// Example: Fetching data from the server
function fetchBudgetItems() {
	axios
		.get("/api/budget-items")
		.then(function (response) {
			console.log(response.data);
			// Handle the response data (e.g., display it in the UI)
		})
		.catch(function (error) {
			console.error("Error fetching budget items:", error);
		});
}

// Example: Sending data to the server
function addBudgetItem(item) {
	axios
		.post("/api/budget-items", item)
		.then(function (response) {
			console.log("Added new item:", response.data);
			// Maybe refresh the list of budget items
		})
		.catch(function (error) {
			console.error("Error adding item:", error);
		});
}

// Example usage within a form submit handler
// document
// 	.getElementById("budgetForm")
// 	.addEventListener("submit", function (event) {
// 		event.preventDefault();
// 		const newItem = {
// 			type: document.getElementById("type").value,
// 			amount: parseFloat(document.getElementById("amount").value),
// 			category: document.getElementById("category").value,
// 		};
// 		addBudgetItem(newItem);
// 	});
