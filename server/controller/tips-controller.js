const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "./db.json");

function readDb() {
	const data = fs.readFileSync(dbPath);
	return JSON.parse(data);
}

function writeDb(data) {
	fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

exports.getTips = (req, res) => {
	const db = readDb();
	res.send(db.tips);
};

exports.createTip = (req, res) => {
	const db = readDb();
	const newTip = { id: Date.now(), text: req.body.text };
	db.tips.push(newTip);
	writeDb(db);
	res.status(201).send(newTip);
};

exports.updateTip = (req, res) => {
	const db = readDb();
	const index = db.tips.findIndex((tip) => tip.id === parseInt(req.params.id));
	if (index !== -1) {
		db.tips[index].text = req.body.text;
		writeDb(db);
		res.send(db.tips[index]);
	} else {
		res.status(404).send({ error: "Tip not found" });
	}
};

exports.deleteTip = (req, res) => {
	const db = readDb();
	const newTips = db.tips.filter((tip) => tip.id !== parseInt(req.params.id));
	db.tips = newTips;
	writeDb(db);
	res.status(204).send();
};
