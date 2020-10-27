import mysql from 'mysql';
import { TableCreationStatements } from '../environment/db-data'
import { connectToDb } from './db-connection';
import { dbQuery } from './db-query'


export async function createModel() {
    const connection = await connectToDb();
    await dbQuery(connection, TableCreationStatements.ORGS_TABLE);
    await dbQuery(connection, TableCreationStatements.ORGS_REL_TABLE);
    connection.end();
};