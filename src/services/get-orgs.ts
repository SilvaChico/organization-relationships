import { Connection } from "mysql";
import { GetStatements } from "../environment/db-data";
import { connectToDb } from "./db-connection";
import { dbQueryArgs } from "./db-query";


export async function getOrgs(org: string, page: number) {
    const connection = await connectToDb();
    let orgs = [];
    orgs.push(...await getRelatives(connection, org, 'parent'));
    orgs.push(...await getRelatives(connection, org, 'sister'));
    orgs.push(...await getRelatives(connection, org, 'daughter'));
    sortOrgs(orgs);
    connection.end();
    return orgs;
}

async function getRelatives(connection: Connection, org: string, relationship_type: string) {

    let queryOutput: Array<any> = [];

    if (relationship_type === 'parent')
        queryOutput = await dbQueryArgs(connection, GetStatements.Parents, [org]);

    else if (relationship_type === 'daughter')
        queryOutput = await dbQueryArgs(connection, GetStatements.Daughters, [org]);

    else if (relationship_type === 'sister')
        queryOutput.push(...await dbQueryArgs(connection, GetStatements.Sisters, [org, org]));

    let relatives: Array<any> = [];

    queryOutput.forEach(element => {
        const relative = {
            'relationship_type': relationship_type,
            'org_name': element['relative_name']
        };
        relatives.push(relative);
    });

    return relatives;
}

function sortOrgs(orgs: Array<any>) {
    orgs.sort((a: any, b: any) => {
        let fa = a.org_name.toLowerCase(),
            fb = b.org_name.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}

function filterUniqueOrgs(orgs: Array<any>) {
    let filteredOrgs: Array<any> = [];

    orgs.forEach(function (item) {
        let i = filteredOrgs.findIndex(x => x.org_name == item.org_name);
        if (i <= -1) {
            filteredOrgs.push({ org_name: item.org_name, relationship_type: item.relationship_type });
        }
    });

    return filteredOrgs;
}