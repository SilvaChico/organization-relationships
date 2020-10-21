import express from "express";
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());

app.use("*", (req: any, res: any) => {
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.post("/insertOrgs", (req: any, res: any) => {
    //TODO
});

app.get("/getRelatedOrgs:org", (req: any, res: any) => {
    //TODO
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);