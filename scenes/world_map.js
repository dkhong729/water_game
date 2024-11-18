let globalSuccess = [false, false, false];
let sceneKeys = ['level_1_1', 'level_2_1', 'level_3_1'];

export default class WorldMap extends Phaser.Scene {
    constructor() {
        super({ key: 'world_map' });
    }

    preload() {
        this.load.image('map', './assets/CEarth_map.png');
        this.load.image('title', './assets/CTitle.png');
        this.load.image('warning', './assets/CWarning.png');
        this.load.image('reward', './assets/CReward.png');
        this.load.image('LV1_1', './lib/LV1.png');
        this.load.image('start', './assets/Start.png');
        this.load.image('LV_2_1', './lib/LV2_1.png');
        this.load.image('LV_3_1','./lib/LV3_1.png');
        //this.load.video('movie', './assets/Timeline.mov', 'canplaythrough', false, true);

    }

    create() {
        this.add.image(600, 337, 'map').setScale(0.2);
        this.add.image(350, 70, 'title').setScale(0.15);

        const buttons = [
            { x: 460, y: 180, sceneKey: 'level_1_intro' },
            { x: 310, y: 470, sceneKey: 'level_2_intro' },
            { x: 900, y: 360, sceneKey: 'level_3_intro' }
        ];

        buttons.forEach((buttonInfo, index) => {
            const showReward = globalSuccess[index];
            const button = this.createButton(buttonInfo.x, buttonInfo.y, showReward);

            button.on('pointerdown', () => {
                if (buttonInfo.sceneKey === 'level_2_intro') {
                    this.showWarningDialog('LV1_1');
                } else if (buttonInfo.sceneKey === 'level_1_intro') {
                    this.showWarningDialog('LV_2_1');
                } else if(buttonInfo.sceneKey === 'level_3_intro'){
                    this.showWarningDialog('LV_3_1');
                }
            });

            button.on('pointerover', () => {
                button.setTint(0x00ff00);
                document.body.style.cursor = 'pointer';
            });

            button.on('pointerout', () => {
                button.clearTint();
                document.body.style.cursor = 'auto';
            });
        });

        this.add.image(1000, 600, 'reward').setScale(0.08);
        this.add.image(150, 600, 'progress').setScale(0.15);
    }

    createButton(x, y, showReward) {
        const buttonKey = showReward ? 'reward' : 'warning';
        const button = this.add.image(x, y, buttonKey).setScale(0.08).setInteractive();

        return button;
    }

    showWarningDialog(imageKey) {
        const dialogContainer = this.add.container(600, 337);

        const image = this.add.image(0, -50, imageKey);
        dialogContainer.add(image);

        const startButton = this.add.image(100, 230, 'start').setScale(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            const sceneKey = this.getSceneKeyForImage(imageKey);
            this.scene.start(sceneKey);
        });

        dialogContainer.add(startButton);

        const closeButton = this.add.text(500,-325, 'X', {
            fontSize: '24px',
            color: '#ff0000',
            backgroundColor: '#333333',
            padding: {
                x: 5,
                y: 5,
            },
        }).setInteractive({ useHandCursor: true });

        closeButton.on('pointerup', () => {
            dialogContainer.destroy();
        });

        dialogContainer.add(closeButton);

        dialogContainer.setScale(0.8);
        dialogContainer.setDepth(1);

        //const watchMovieButton = this.add.text(100, 600, 'Watch Movie', { fontSize: '32px', fill: '#ffffff' })
        //.setInteractive({ useHandCursor: true });

        //watchMovieButton.on('pointerup', () => {
        //    const video = this.add.video(600, 337, 'movie');
        //    video.play();
        //    video.addToWorld();
        //});

    }

    getSceneKeyForImage(imageKey) {
        // 根据图片键返回对应的场景键
        switch (imageKey) {
            case 'LV1_1':
                return 'level_2_1';
            case 'LV_2_1':
                return 'level_1_1';
            case 'LV_3_1':
                return 'level_3_1'; // 或者返回其他场景键
            default:
                return '';
        }
    }

    update() {}
}





