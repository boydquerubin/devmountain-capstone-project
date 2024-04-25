const express = require("express");
const cors = require("cors");
const controller = require("./controller/tips-controller");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tips", controller.getTips);
app.post("/tips", controller.createTip);
app.put("/tips/:id", controller.updateTip);
app.delete("/tips/:id", controller.deleteTip);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
