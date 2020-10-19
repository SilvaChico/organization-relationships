import mysql from 'mysql';
import { TableCreationStatements } from '../environment/db-data'
import { dbQuery } from './db-query'

export async function createModel(connection: mysql.Connection) {
    await dbQuery(connection, TableCreationStatements.OrgsTable);
    await dbQuery(connection, TableCreationStatements.OrgsRelTable);
};