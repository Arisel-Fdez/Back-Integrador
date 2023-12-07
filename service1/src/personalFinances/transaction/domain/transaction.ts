export class Transaction {
    constructor(
        readonly id: number,
        public date: Date,
        public type: boolean,
        public amount: number,
        public description: string,
        public categoriId: number,
        public accountId: number
    ) {}
}
