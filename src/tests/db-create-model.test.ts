import 'mocha';

import * as chai from 'chai';
import { createModel } from "../services/db-create-model";
import * as dbQueries from "../services/db-query";
import { TableCreationStatements, TableNames } from "../environment/db-data";
import sinon from 'sinon';
import * as connectToDb from '../services/db-connection';


const expect: Chai.ExpectStatic = chai.expect;
let sandbox: sinon.SinonSandbox;
let queryStub: sinon.SinonStub;
let connStub: sinon.SinonStub;


beforeEach(() => {
    sandbox = sinon.createSandbox();
    queryStub = sandbox.stub(dbQueries, 'dbQuery');
    connStub = sandbox.stub(connectToDb, 'connectToDb');
    connStub.resolves({ end: () => '' });
});

afterEach(() => {
    sandbox.restore();
});

describe('Create model', () => {

    it('creates required tables if they do not exist already', async () => {
        const conn = await connectToDb.connectToDb();
        await createModel();
        sinon.assert.calledWith(queryStub, conn, TableCreationStatements.ORGS_TABLE);
        sinon.assert.calledWith(queryStub, conn, TableCreationStatements.ORGS_REL_TABLE);
        sinon.assert.calledTwice(queryStub);
    });

});

