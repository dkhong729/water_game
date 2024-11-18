export default class level_2_3 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_2_3' });
    }

    preload() {
        this.load.image('LV5', './lib/LV1POST.png');
    }

    create() {
        this.add.image(600, 337, 'LV5');

        // 創建文本按鈕
        const startButton = this.add.text(1000, 600, 'Next', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 20,
                y: 10
            }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        startButton.on('pointerup', () => {
            this.scene.start('EndScreen');
        });
    }
}

