export class Organization {

    constructor(
        private readonly name_: string,
        private daughters_: Array<Organization>
    ) { }

    /**
     * getName
     */
    public get name() {
        return this.name_;
    }
    /**
     * getDaughters
     */
    public get daughters() {
        return this.daughters_;
    }

    /**
     * addDaughter
     */
    public addDaughter(org: Organization) {
        this.daughters.push(org);
    }


}