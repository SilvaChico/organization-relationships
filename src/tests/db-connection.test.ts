import 'mocha';
import mysql from 'mysql';

import * as chai from 'chai';
import { connectToDb } from '../services/db-connection';


const expect: Chai.ExpectStatic = chai.expect;


describe('Connect to database', () => {
    let conn: mysql.Connection;

    before(async () => {
        conn = await connectToDb();
    });

    after(() => conn.end());

    it('returns connection state authenticated for a sucessfull db connection', async () => {
        expect(
            conn.state,
        ).to.equal('authenticated');
    });
});
