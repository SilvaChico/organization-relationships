import mysql from "mysql";
import { Organization } from "../models/organization";
import { dbQueryArgs } from "./db-query";
import { InsertStatements } from "../environment/db-data";

export async function insertOrg(connection: mysql.Connection, org: Organization, parentOrgName: string = '') {

    console.log(`Inserting: ${parentOrgName === '' ? 'Root' : parentOrgName} - ${org.getName()}`);
    dbQueryArgs(connection, InsertStatements.OrgsTable, [org.getName()]);

    if (parentOrgName !== '')
        dbQueryArgs(connection, InsertStatements.OrgsRelTable, [parentOrgName, org.getName()]);

    org.getDaughters().forEach((daughterOrg) => {
        insertOrg(connection, daughterOrg, org.getName());
    });

}