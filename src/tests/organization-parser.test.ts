import 'mocha';

import * as chai from 'chai';
import { organizationParser } from "../services/organization-parser";
import { Organization } from '../models/organization';

const expect: Chai.ExpectStatic = chai.expect;

describe('Parses Organization JSON Object', () => {


    it('returns an organization object from a JSON object', async () => {
        const orgsObj: Object = {
            "org_name": "Paradise Island",
            "daughters": [{
                "org_name": "Banana tree",
                "daughters": [{
                    "org_name": "Yellow Banana"
                }, {
                    "org_name": "Brown Banana"
                }, {
                    "org_name": "Black Banana"
                }]
            }, {
                "org_name": "Big Banana tree",
                "daughters": [{
                    "org_name": "Yellow Banana"
                }, {
                    "org_name": "Brown Banana"
                }, {
                    "org_name": "Green Banana"
                }, {
                    "org_name": "Black Banana",
                    "daughters": [{
                        "org_name": "Phoneutria Spider"
                    }]
                }]
            }]
        };

        const orgsOutput: Organization = new Organization(
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

        expect(
            organizationParser(orgsObj),
        ).to.eql(orgsOutput);

    });

    it('returns an organization object from a JSON object with no daughters', async () => {
        const orgsObj: Object = {
            "org_name": "Paradise Island"
        };

        const orgsOutput: Organization = new Organization(
            "Paradise Island",
            []
        );

        expect(
            organizationParser(orgsObj),
        ).to.eql(orgsOutput);

    });

    it('returns an organization object from a JSON object with a wrong format', async () => {
        const orgsObj: Object = {
            "org_name_wrong_format": "Paradise Island"
        };

        expect(
            organizationParser(orgsObj),
        ).to.be.null;

    });

    it('returns an organization object from a JSON object with a wrong format on a daughter', async () => {
        const orgsObj: Object = {
            "org_name": "Paradise Island",
            "daughters": [{
                "org_name_wrong_format": "Paradise Island1"
            }]
        };

        const orgsOutput: Organization = new Organization(
            "Paradise Island",
            []
        );

        expect(
            organizationParser(orgsObj),
        ).to.eql(orgsOutput);

    });


});
