export default class level_3_3 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_3_3' });
    }

    preload() {
        this.load.image('LV3', './lib/LV3_POST.png');
        this.load.image('next','./css/next page.js')
    }

    create() {
        this.add.image(600,337,'LV3')
        const startButton = this.add.text(600, 337, 'next')
        .setOrigin(0.5).setInteractive({ useHandCursor: true });

        startButton.on('pointerup', () => {
            this.scene.start('EndScreen'); 
        });
    }
}