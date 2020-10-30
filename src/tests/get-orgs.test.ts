import * as chai from 'chai';
import sinon from 'sinon';
import { getOrgs, slicePage } from '../services/get-orgs';
import * as dbQueries from "../services/db-query";
import * as connectToDb from '../services/db-connection';

const expect: Chai.ExpectStatic = chai.expect;
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

describe('Gets Organizations (Parents, daughters, sisters)', () => {

    it('returns oganization\'s parents sisters and daughters', async () => {
        const expectedResult = [{
            "relationship_type": "parent",
            "org_name": "Banana tree"
        }, {
            "relationship_type": "parent",
            "org_name": "Big Banana tree"
        }, {
            "relationship_type": "sister",
            "org_name": "Brown Banana"
        }, {
            "relationship_type": "sister",
            "org_name": "Green Banana"
        }, {
            "relationship_type": "daughter",
            "org_name": "Phoneutria Spider"
        }, {
            "relationship_type": "sister",
            "org_name": "Yellow Banana"
        }];

        queryStub.onCall(0).resolves(
            [{ 'relative_name': "Banana tree" },
            { 'relative_name': "Big Banana tree" }]
        );
        queryStub.onCall(1).resolves(
            [{ 'relative_name': "Yellow Banana" },
            { 'relative_name': "Green Banana" },
            { 'relative_name': "Brown Banana" }]
        );
        queryStub.onCall(2).resolves(
            [{ 'relative_name': "Phoneutria Spider" }]
        );

        expect(
            await getOrgs('Black Banana', 1),
        ).to.eql(expectedResult);

    });

    it('returns oganization\'s parent', async () => {
        const expectedResult = [{
            "relationship_type": "parent",
            "org_name": "Black Banana"
        }];

        queryStub.onCall(0).resolves(
            [{ 'relative_name': "Black Banana" }]
        );
        queryStub.onCall(1).resolves([]);
        queryStub.onCall(2).resolves([]);

        expect(
            await getOrgs('Phoneutria Spider', 1),
        ).to.eql(expectedResult);
    });

    it('returns oganization\'s daughters', async () => {
        const expectedResult = [
            {
                "relationship_type": "daughter",
                "org_name": "Banana tree"
            }, {
                "relationship_type": "daughter",
                "org_name": "Big Banana tree"
            },
        ];

        queryStub.onCall(0).resolves([]);
        queryStub.onCall(1).resolves(
            []
        );
        queryStub.onCall(2).resolves(
            [{ 'relative_name': "Banana tree" },
            { 'relative_name': "Big Banana tree" }]
        );

        expect(
            await getOrgs('Paradise Island', 1),
        ).to.eql(expectedResult);

    });


});
describe('Pagination', () => {

    it('gets first page', () => {
        const inputArray = Array(500).fill(0).map((x, i) => i);
        const outputArray = slicePage(inputArray, 1);
        expect(
            outputArray,
        ).to.eql(Array(100).fill(0).map((x, i) => i));

    });

    it('gets third page', () => {
        const inputArray = Array(500).fill(0).map((x, i) => i);
        const outputArray = slicePage(inputArray, 3);
        expect(
            outputArray,
        ).to.eql(Array(100).fill(200).map((x, i) => x + i));
    });

});