export class Board {
    names: String[];
    token: number;
    turn: number;
    tiles: Object[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    userId(name: string): number {
        if (this.players > 0) {
            return this.names.indexOf(name);
        }
        return null;
    }

    get players(): number {
        if (this.names) {
            return this.names.length;
        }
        return 0;
    }
}
