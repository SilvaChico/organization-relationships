import 'mocha';
import mysql from 'mysql';

import * as chai from 'chai';
import { dbQuery, dbQueryArgs } from '../services/db-query';
import { connectToDb } from '../services/db-connection';


const expect: Chai.ExpectStatic = chai.expect;

describe('query DB', () => {

    let conn: mysql.Connection;

    before(async () => {
        conn = await connectToDb();
    });

    after(() => conn.end());

    it('returns the result of 1+1 = 2', async () => {
        const expectedResult = [{ solution: 2 }];
        expect(
            await dbQuery(conn, 'SELECT 1 + 1 AS solution'),
        ).to.eql(expectedResult);
    });

    it('returns the result of 1+2 = 3 using a prepared statement', async () => {
        const expectedResult = [{ solution: 3 }];
        const testStatement = 'SELECT 1 + ? AS solution;';
        expect(
            await dbQueryArgs(conn, testStatement, ['2']),
        ).to.eql(expectedResult);
    });

});
