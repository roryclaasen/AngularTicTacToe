import * as howlerjs from 'howler';

export class Howler {

    private static click: howlerjs.Howl[];
    public static load(): void {
        this.click = new Array<howlerjs.Howl>(9);
        for (let i = 1; i <= 9; i++) {
            if (this.click[i] !== undefined) {
                this.click[i] = new howlerjs.Howl({
                    src: ['./assets/note' + i + '.mp3']
                });
            } else {
                console.log('Attempted to load sound that has allready been initilized');
            }
        }
    }

    public static playClick(num: number = 0) {
        this.click[num].play();
    }
}
