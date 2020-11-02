import { Organization } from "../models/organization";
import { dbQueryArgs } from "./db-query";
import { InsertStatements } from "../environment/db-data";
import { Connection } from "mysql";

export async function insertOrg(org: Organization, connection: Connection, parentOrgName: string = '') {
    console.log(`Inserting: ${parentOrgName === '' ? 'Root' : parentOrgName} - ${org.name}`);
    dbQueryArgs(connection, InsertStatements.ORGS_TABLE, [org.name]);

    if (parentOrgName !== '')
        dbQueryArgs(connection, InsertStatements.ORGS_REL_TABLE, [parentOrgName, org.name]);

    org.daughters.forEach((daughterOrg) => {
        insertOrg(daughterOrg, connection, org.name);
    });
}