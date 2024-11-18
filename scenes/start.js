export default class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    preload() {
        this.load.image('back','./js/Cover.png')
        this.load.image('start','./css/start_1.png')
    }

    create() {
        this.add.image(600, 337, 'back').setScale(1);

        const startButton = this.add.image(950, 550, 'start' )
            .setOrigin(0.3).setInteractive({ useHandCursor: true });

        startButton.on('pointerup', () => {
            this.scene.start('Educ'); 
        });
    }
}