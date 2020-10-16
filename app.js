const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/insertOrgs", (req, res) => {
    //TODO
});

app.get("/getRelatedOrgs:org", (req, res) => {
    //TODO
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);