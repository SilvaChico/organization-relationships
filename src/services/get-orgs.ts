import { Connection } from "mysql";
import { GetStatements } from "../environment/db-data";
import { Pagination } from "../environment/pagination-constants";
import { connectToDb } from "./db-connection";
import { dbQueryArgs } from "./db-query";


export async function getOrgs(org: string, page: number) {
    const connection = await connectToDb();
    let orgs = [];
    orgs.push(...await getRelatives(connection, org, 'parent'));
    orgs.push(...await getRelatives(connection, org, 'sister'));
    orgs.push(...await getRelatives(connection, org, 'daughter'));
    connection.end();
    sortOrgs(orgs);
    orgs = slicePage(orgs, page);
    return orgs;
}

async function getRelatives(connection: Connection, org: string, relationship_type: string) {

    let queryOutput: Array<any> = [];

    if (relationship_type === 'parent')
        queryOutput = await dbQueryArgs(connection, GetStatements.PARENTS, [org]);

    else if (relationship_type === 'daughter')
        queryOutput = await dbQueryArgs(connection, GetStatements.DAUGHTERS, [org]);

    else if (relationship_type === 'sister')
        queryOutput.push(...await dbQueryArgs(connection, GetStatements.SISTERS, [org, org]));

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

export function slicePage(orgs: Array<any>, page: number) {
    const offset = (page - 1) * Pagination.MAX_ROW_NUMBER;
    return orgs.slice(offset, offset + Pagination.MAX_ROW_NUMBER);
}
