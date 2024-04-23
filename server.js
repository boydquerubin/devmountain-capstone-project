const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.post("/income", (req, res) => {
	// Logic to add income to the database
});

app.put("/income/:id", (req, res) => {
	// Logic to update income in the database
});

app.delete("/income/:id", (req, res) => {
	// Logic to delete income from the database
});
