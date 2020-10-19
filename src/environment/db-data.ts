export class TableNames {
    public static OrgsTable = 'orgs';
    public static OrgsRelTable = 'orgs_relationships';
}

export class TableCreationStatements {
    public static OrgsTable = `CREATE TABLE IF NOT EXISTS ${TableNames.OrgsTable} (org_name VARCHAR(255) NOT NULL, PRIMARY KEY(org_name));`;
    public static OrgsRelTable = `CREATE TABLE IF NOT EXISTS ${TableNames.OrgsRelTable} (parent_org VARCHAR(255),daughter_org VARCHAR(255),PRIMARY KEY(parent_org, daughter_org), FOREIGN KEY(parent_org) REFERENCES orgs(org_name), FOREIGN KEY(daughter_org) REFERENCES orgs(org_name));`;
}
