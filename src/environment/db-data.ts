export class TableNames {
    public static ORGS_TABLE = 'orgs';
    public static ORGS_REL_TABLE = 'orgs_relationships';
}

export class TableCreationStatements {
    public static ORGS_TABLE = `CREATE TABLE IF NOT EXISTS ${TableNames.ORGS_TABLE} (org_name VARCHAR(255) NOT NULL, PRIMARY KEY(org_name));`;
    public static ORGS_REL_TABLE = `CREATE TABLE IF NOT EXISTS ${TableNames.ORGS_REL_TABLE} (parent_org VARCHAR(255),daughter_org VARCHAR(255),PRIMARY KEY(parent_org, daughter_org), FOREIGN KEY(parent_org) REFERENCES orgs(org_name), FOREIGN KEY(daughter_org) REFERENCES orgs(org_name));`;
}

export class InsertStatements {
    public static ORGS_TABLE = `INSERT INTO ${TableNames.ORGS_TABLE} VALUES (?) ON DUPLICATE KEY UPDATE org_name=org_name;`;
    public static ORGS_REL_TABLE = `INSERT INTO ${TableNames.ORGS_REL_TABLE} VALUES (?,?) ON DUPLICATE KEY UPDATE parent_org=parent_org;`;
}

export class GetStatements {
    public static PARENTS = `SELECT distinct parent_org as relative_name FROM ${TableNames.ORGS_REL_TABLE} WHERE daughter_org = ?`
    public static DAUGHTERS = `SELECT distinct daughter_org as relative_name FROM ${TableNames.ORGS_REL_TABLE} WHERE parent_org = ?`
    public static SISTERS = `SELECT distinct daughter_org as relative_name FROM ${TableNames.ORGS_REL_TABLE} WHERE parent_org in (SELECT distinct parent_org FROM ${TableNames.ORGS_REL_TABLE} WHERE daughter_org = ?) and daughter_org != ?;`
}