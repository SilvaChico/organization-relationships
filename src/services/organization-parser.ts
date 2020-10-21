import { Organization } from "../models/organization";

export function organizationParser(organizationObj: any) {

    if (!organizationObj['org_name'])
        return null;

    let parsedOrganization: Organization = new Organization(organizationObj['org_name'], []);

    if (organizationObj['daughters'])
        organizationObj['daughters'].forEach((daughterObj: any) => {
            parseDaughters(daughterObj, parsedOrganization);
        });

    return parsedOrganization;
}

function parseDaughters(organizationObj: any, parentOrganization: Organization) {

    if (!organizationObj['org_name'])
        return null;

    const daughter: Organization = new Organization(organizationObj['org_name'], []);
    parentOrganization.addDaughter(daughter);

    if (organizationObj['daughters'])
        organizationObj['daughters'].forEach((grandDaughterObj: any) => {
            parseDaughters(grandDaughterObj, daughter);
        });

}