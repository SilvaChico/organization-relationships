export class Organization {

    constructor(
        private readonly name: string,
        private daughters: Array<Organization>
    ) { }

    /**
     * getName
     */
    public getName() {
        return this.name;
    }
    /**
     * getDaughters
     */
    public getDaughters() {
        return this.daughters;
    }

    /**
     * addDaughter
     */
    public addDaughter(org: Organization) {
        this.daughters.push(org);
    }


}