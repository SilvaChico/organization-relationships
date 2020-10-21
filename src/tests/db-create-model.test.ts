import 'mocha';
import mysql from 'mysql';

import * as chai from 'chai';
import { connectToDb } from '../services/db-connection';
import { createModel } from "../services/db-create-model";
import { dbQuery } from "../services/db-query";
import { TableNames } from "../environment/db-data";


const expect: Chai.ExpectStatic = chai.expect;

describe('Create model', async () => {
    let conn: mysql.Connection;

    before(async () => {
        conn = await connectToDb();
    });

    after(() => conn.end());

    it('creates required tables if they do not exist already', async () => {
        await createModel(conn);
        expect(
            await dbQuery(conn, `select * from ${TableNames.OrgsTable}`),
        ).to.be;
        expect(
            await dbQuery(conn, `select * from ${TableNames.OrgsRelTable}`),
        ).to.be;
    });
});

