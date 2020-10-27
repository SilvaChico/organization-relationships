import { Organization } from "../models/organization";
import { dbQueryArgs } from "./db-query";
import { InsertStatements } from "../environment/db-data";
import { connectToDb } from "./db-connection";

export async function insertOrg(org: Organization, parentOrgName: string = '') {
    const connection = await connectToDb();
    console.log(`Inserting: ${parentOrgName === '' ? 'Root' : parentOrgName} - ${org.name}`);
    dbQueryArgs(connection, InsertStatements.ORGS_TABLE, [org.name]);

    if (parentOrgName !== '')
        dbQueryArgs(connection, InsertStatements.ORGS_REL_TABLE, [parentOrgName, org.name]);

    org.daughters.forEach((daughterOrg) => {
        insertOrg(daughterOrg, org.name);
    });
    connection.end();
}