export class UserPublication {
    constructor(
        readonly id: number,
        readonly userId: string,
        readonly description: string,
        public multimedia: string,
        public userProfile? : string,
        public userFullName?: string 
    ) {}
}
