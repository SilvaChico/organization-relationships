import mysql from 'mysql';
import { TableCreationStatements } from '../environment/db-data'
import { connectToDb } from './db-connection';
import { dbQuery } from './db-query'


export async function createModel() {
    const connection = await connectToDb();
    await dbQuery(connection, TableCreationStatements.OrgsTable);
    await dbQuery(connection, TableCreationStatements.OrgsRelTable);
    connection.end();
};