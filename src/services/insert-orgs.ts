import mysql from "mysql";
import { Organization } from "../models/organization";
import { dbQueryArgs } from "./db-query";
import { InsertStatements } from "../environment/db-data";
import { connectToDb } from "./db-connection";

export async function insertOrg(org: Organization, parentOrgName: string = '') {
    const connection = await connectToDb();
    console.log(`Inserting: ${parentOrgName === '' ? 'Root' : parentOrgName} - ${org.getName()}`);
    dbQueryArgs(connection, InsertStatements.OrgsTable, [org.getName()]);

    if (parentOrgName !== '')
        dbQueryArgs(connection, InsertStatements.OrgsRelTable, [parentOrgName, org.getName()]);

    org.getDaughters().forEach((daughterOrg) => {
        insertOrg(daughterOrg, org.getName());
    });
    connection.end();
}