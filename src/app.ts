import express from "express";
import { connectToDb } from "./services/db-connection";
import { createModel } from "./services/db-create-model";
import { insertOrg } from "./services/insert-orgs";
import { organizationParser } from "./services/organization-parser";
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

createModel();

app.post("/insertOrgs", async (req: any, res: any) => {
    const organization = organizationParser(req.body);
    if (organization) {
        await insertOrg(organization);
        res.status(200).send(`Organizations inserted`);
    }
    else
        res.status(400).send(`Bad Request`);

});

app.get("/getRelatedOrgs:org", (req: any, res: any) => {
    //TODO
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
