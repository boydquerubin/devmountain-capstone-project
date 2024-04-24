const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 unless specified

app.use(express.json()); // Corrected the usage of express.json()
app.use(cors());
app.use(express.static("public")); // Correctly serve static files from 'public'

// Route to serve the homepage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST endpoint to create an income entry
app.post("/income", (req, res) => {
	// Here, you would typically handle the logic to save the income data received from the client
	console.log(req.body); // Log the received data to console
	// Simulate data creation and respond with simulated data
	res
		.status(201)
		.json({ message: "Income created successfully", data: req.body });
});

// GET endpoint to fetch all incomes (example setup)
app.get("/income", (req, res) => {
	// Simulated response for demonstration, you'd replace this with database retrieval logic
	res.status(200).json([
		{
			id: 1,
			description: "id",
		},
	]);
});

// PUT endpoint to update an income
app.put("/income/:id", (req, res) => {
	// Simulate updating an income
	const { id } = req.params;
	console.log(`Updating income with ID ${id} with data:`, req.body);
	res.status(200).json({
		id,
		...req.body,
	});
});

// DELETE endpoint to delete an income
app.delete("/income/:id", (req, res) => {
	const { id } = req.params;
	console.log(`Deleting income with ID ${id}`);
	res.status(204).send(); // No content to send back after deletion
});

// Listen on a single port
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
