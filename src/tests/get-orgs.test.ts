import 'mocha';
import * as chai from 'chai';
import { getOrgs } from '../services/get-orgs';

const expect: Chai.ExpectStatic = chai.expect;

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
        expect(
            await getOrgs('Black Banana'),
        ).to.eql(expectedResult);
    });
    it('returns oganization\'s parent', async () => {
        const expectedResult = [{
            "relationship_type": "parent",
            "org_name": "Black Banana"
        }];
        expect(
            await getOrgs('Phoneutria Spider'),
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

        expect(
            await getOrgs('Paradise Island'),
        ).to.eql(expectedResult);

    });

});