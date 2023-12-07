export class Like {
    constructor(
        public id: number,
        public publicationId: string,
        public userId: string,
        public timestamp: Date
    ) {}
}
