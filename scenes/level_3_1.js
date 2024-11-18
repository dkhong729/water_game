export default class level_3_1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_3_1' });
    }

    preload() {
        this.load.image('LV3_2', './lib/LV3_2.png');
        this.load.image('LV3_3', './lib/LV3_3.png');
        this.load.image('LV3_4', './lib/LV3_4.png');
        this.currentSlide = 0; // 初始化 currentSlide 变量
    }

    create() {
        // 创建一个数组来存储游戏说明的图像键名
        this.slides = [ 'LV3_2', 'LV3_3','LV3_4']; // 添加其他图像键名

        // 显示第一张图像并缩小一倍
        this.slideImage = this.add.image(600, 337, this.slides[this.currentSlide]).setScale(1);

        // 创建一个 "Next" 按钮
        const nextButton = this.add.image(1100, 640, 'next').setScale(0.38)
            .setInteractive({ useHandCursor: true });

        nextButton.on('pointerup', () => {
            this.showNextSlide();
        });

        // 创建一个 "Skip" 按钮
        const skipButton = this.add.image(800, 640, 'skip').setScale(0.38)
            .setInteractive({ useHandCursor: true });

        skipButton.on('pointerup', () => {
            this.scene.start('level_3_2'); // 跳过说明，返回到游戏地图场景
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
            this.scene.start('level_3_2');
        }
    }
}