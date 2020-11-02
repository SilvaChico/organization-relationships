import { insertOrg } from "../services/insert-orgs";
import { Organization } from '../models/organization';
import sinon from 'sinon';
import * as dbQueries from "../services/db-query";
import * as connectToDb from '../services/db-connection';
import { InsertStatements } from "../environment/db-data";

let sandbox: sinon.SinonSandbox;
let queryStub: sinon.SinonStub;
let connStub: sinon.SinonStub;

beforeEach(() => {
    sandbox = sinon.createSandbox();
    queryStub = sandbox.stub(dbQueries, 'dbQueryArgs');
    connStub = sandbox.stub(connectToDb, 'connectToDb');
    connStub.resolves({ end: () => '' });
});

afterEach(() => {
    sandbox.restore();
});


describe('Insert Organizations', () => {

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

        const connection = await connectToDb.connectToDb();
        await insertOrg(orgs, connection);
        setTimeout(() => {
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Paradise Island"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Banana tree"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Big Banana tree"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Yellow Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Brown Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Black Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Green Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_TABLE, ["Phoneutria Spider"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Paradise Island", "Banana tree"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Paradise Island", "Big Banana tree"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Banana tree", "Yellow Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Banana tree", "Brown Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Banana tree", "Black Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Big Banana tree", "Yellow Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Big Banana tree", "Brown Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Big Banana tree", "Green Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Big Banana tree", "Black Banana"]);
            sinon.assert.calledWith(queryStub, connection, InsertStatements.ORGS_REL_TABLE, ["Black Banana", "Phoneutria Spider"]);
            sinon.assert.callCount(queryStub, 21);
        }, 1000);
    });
});
