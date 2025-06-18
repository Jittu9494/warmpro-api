const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

let jobs = [
  {
    id: 1,
    customerName: "Mike Lloyd",
    address: "Vine Cottage Fen Road, Pakenham, Bury St Edmunds, Suffolk, IP31 2LS",
    measures: ["Loft Insulation", "CWI Insulation"],
  },
  {
    id: 2,
    customerName: "Kathleen Howe",
    address: "Merrymores Rose, Green Road, Lindsey, Ipswich, IP7 6PU",
    measures: ["EWI Insulation"],
  },
];

app.get("/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/jobs/:id/signatures", (req, res) => {
  const { customerSignature, installerSignature } = req.body;
  const jobId = parseInt(req.params.id);
  const job = jobs.find((j) => j.id === jobId);

  if (job) {
    job.customerSignature = customerSignature;
    job.installerSignature = installerSignature;
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/jobs/:id/photos", upload.single("photo"), (req, res) => {
  const jobId = parseInt(req.params.id);
  const { measure, stage } = req.body;
  const job = jobs.find((j) => j.id === jobId);

  if (job && req.file) {
    if (!job.photos) job.photos = {};
    if (!job.photos[measure]) job.photos[measure] = {};
    job.photos[measure][stage] = req.file.path;
    res.json({ success: true, path: req.file.path });
  } else {
    res.status(400).json({ error: "Upload failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
