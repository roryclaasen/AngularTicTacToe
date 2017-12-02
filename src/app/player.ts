export class Player {
    id: number;
    name: string;
    score = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
