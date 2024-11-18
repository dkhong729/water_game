export default class Educ extends Phaser.Scene {
    constructor() {
        super({ key: 'Educ' });
    }

    preload() {
        // 加载游戏说明所需的图像资源，并缩小它们
        this.load.image('slide1', './assets/Hola_1.png');
        this.load.image('slide2', './assets/watch_2.png');
        this.load.image('slide3', './assets/changes_3.png');
        this.load.image('slide4', './assets/magicMachine_4.png');
        this.load.image('slide5', './assets/LETNEW_5.png');
        this.load.image('next','./css/next page.png');
        this.load.image('skip','./css/skip.png');
        for (let i = 1; i <= 5; i++) {
            this.load.image(`text${i}`, `./assets/story_${i}.png`);
        }
        // 初始化当前显示的图像索引
        this.currentSlide = 0;
    }

    create() {
        // 创建一个数组来存储游戏说明的图像键名
        this.slides = ['text1','slide1','text2', 'slide2','text3','slide3',
                    'text4','slide4','text5','slide5']; // 添加其他图像键名

        // 显示第一张图像并缩小一倍
        this.slideImage = this.add.image(600, 337, this.slides[this.currentSlide]).setScale(1);

        // 创建一个 "Skip" 按钮
        const skipButton = this.add.image(400, 560, 'skip').setScale(0.6)
            .setInteractive({ useHandCursor: true });

        skipButton.on('pointerup', () => {
            this.scene.start('world_map'); // 跳过说明，返回到游戏地图场景
        });
        // 创建一个 "Next" 按钮
        const nextButton = this.add.image(1050, 560, 'next').setScale(0.65)
            .setInteractive({ useHandCursor: true });

        nextButton.on('pointerup', () => {
            this.showNextSlide();
        });
    }

    showNextSlide() {
        // 增加当前显示的图像索引
        this.currentSlide++;
    
        // 检查是否已经显示了所有图像
        if (this.currentSlide < this.slides.length) {
            // 显示下一张图像并与第一张图像设置相同的缩放比例
            this.slideImage.setTexture(this.slides[this.currentSlide]).setScale(1);
        } else {
            // 所有图像都已显示完毕，返回到游戏地图场景
            this.scene.start('world_map');
        }
    }
}

