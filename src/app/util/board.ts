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

    update(values: Object = {}): void {
        Object.assign(this, values);
    }

    userId(name: String): number {
        if (this.players > 0) {
            return this.names.indexOf(name);
        }
        return undefined;
    }

    sectorSize(sectorX: number = Math.floor(this.currentX / 3), sectorY: number = Math.floor(this.currentY / 3)): number {
        let count = 0;
        for (let y = sectorY * 3; y < (sectorY + 1) * 3; y++) {
            for (let x = sectorX * 3; x < (sectorX + 1) * 3; x++) {
                if (this.tiles[y][x].used) {
                    count++;
                }
            }
        }
        return count;
    }

    reset(): void {
        this.names = [];
        this.token = undefined;
        this.turn = undefined;
        this.tiles = [];
        this.results = [];
        this.currentX = undefined;
        this.currentY = undefined;
        this.winner = undefined;
        this.moves = [];
    }

    get players(): number {
        if (this.names) {
            return this.names.length;
        }
        return 0;
    }
}
