import express from "express";
import { connectToDb } from "./services/db-connection";
import { createModel } from "./services/db-create-model";
import { getOrgs } from "./services/get-orgs";
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
        const connection = await connectToDb();
        await insertOrg(organization,connection);
        connection.end();
        res.status(200).send(`Organizations inserted`);
    }
    else
        res.status(400).send(`Bad Request`);

});

app.get("/getRelatedOrgs/:org", async (req: any, res: any) => {
    const page: number = parseInt(req.query.page);
    console.log(`Getting: ${req.params.org}, page: ${page}`);
    res.send(await getOrgs(req.params.org, page));
});

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
