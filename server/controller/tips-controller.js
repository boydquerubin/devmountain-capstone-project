const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.json");

function readDb() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

const tips = {
  getTips: (req, res) => {
    const db = readDb();
    res.status(200).json(db.tips);
  },
  createTip: (req, res) => {
    const { text } = req.body;
    const db = readDb();
    const newTip = { id: Date.now(), text };
    db.tips.push(newTip);
    writeDb(db);
    res.status(201).json(newTip);
  },
  updateTip: (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const db = readDb();
    const index = db.tips.findIndex((tip) => tip.id === parseInt(id));
    if (index !== -1) {
      db.tips[index].text = text;
      writeDb(db);
      res.status(200).json(db.tips[index]);
    } else {
      res.status(404).json({ error: "Tip not found" });
    }
  },
  deleteTip: (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const newTips = db.tips.filter((tip) => tip.id !== parseInt(id));
    db.tips = newTips;
    writeDb(db);
    res.status(204).send();
  },
};

module.exports = tips;
