import 'mocha';
import mysql from 'mysql';

import * as chai from 'chai';
import { connectToDb } from '../services/db-connection';
import { insertOrg } from "../services/insert-orgs";
import { Organization } from '../models/organization';
import { dbQuery } from '../services/db-query';
import { TableNames } from '../environment/db-data';


const expect: Chai.ExpectStatic = chai.expect;


describe('Insert Organizations', () => {
    let conn: mysql.Connection;

    before(async () => {
        conn = await connectToDb();
    });

    after(() => conn.end());

    it('inserts all orgs in the database', async () => {
        const orgs: Organization = new Organization(
            "Paradise Island",
            [
                new Organization(
                    "Banana tree",
                    [
                        new Organization("Yellow Banana", []),
                        new Organization("Brown Banana", []),
                        new Organization("Black Banana", []),
                    ]),
                new Organization(
                    "Big Banana tree",
                    [
                        new Organization("Yellow Banana", []),
                        new Organization("Brown Banana", []),
                        new Organization("Green Banana", []),
                        new Organization("Black Banana", [
                            new Organization("Phoneutria Spider", []),
                        ]),
                    ])
            ]
        );
        await insertOrg(orgs);

        expect(
            await dbQuery(conn, `SELECT COUNT(*) AS RESULT FROM ${TableNames.OrgsRelTable}`),
        ).to.eql([{ RESULT: 10 }]);

        expect(
            await dbQuery(conn, `SELECT COUNT(*) AS RESULT FROM ${TableNames.OrgsTable}`),
        ).to.eql([{ RESULT: 8 }]);
    });
});
