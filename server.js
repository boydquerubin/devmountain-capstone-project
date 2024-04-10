// {
//     "name": "capstone-project",
//     "version": "1.0.0",
//     "description": "budget planner web application",
//     "main": "server.js",
//     "scripts": {
//       "test": "jest",
//       "start": "npm-run-all -p nodemon browser-sync",
//       "nodemon": "nodemon server.js",
//       "browser-sync": ""
//     },
//     "author": "Boyd Querubin",
//     "license": "ISC",
//     "dependencies": {
//     //   "express": "^4.19.2",
//     //   "jest": "^29.5.0",
//     //   "nodemon": "^3.1.0"
//     }
//   }

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public2test")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public2test", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
