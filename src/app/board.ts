export class Board {
    names: String[];
    token: number;
    turn: number;
    tiles: Object[];
    results: Object[];
    currentX: number;
    currentY: number;
    winner: number;
    moves: Object[];

    constructor(values: Object = {}) {
        this.update(values);
    }

    update(values: Object = {}) {
        Object.assign(this, values);
    }

    userId(name: String): number {
        if (this.players > 0) {
            return this.names.indexOf(name);
        }
        return undefined;
    }

    get players(): number {
        if (this.names) {
            return this.names.length;
        }
        return 0;
    }
}
