export default class level_2_1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_2_1' });
    }

    preload() {
        this.load.image('LV2', './lib/LV2.png');
        this.load.image('LV3', './lib/LV3.png');
        this.load.image('LV4', './lib/LV4.png');
        this.currentSlide = 0; // 初始化 currentSlide 变量
    }

    create() {
        // 创建一个数组来存储游戏说明的图像键名
        this.slides = [ 'LV2', 'LV3','LV4',]; // 添加其他图像键名

        // 显示第一张图像并缩小一倍
        this.slideImage = this.add.image(600, 337, this.slides[this.currentSlide]).setScale(1);

        // 创建一个 "Next" 按钮
        const nextButton = this.add.image(1100, 640, 'next').setScale(0.4)
            .setInteractive({ useHandCursor: true });

        nextButton.on('pointerup', () => {
            this.showNextSlide();
        });

        // 创建一个 "Skip" 按钮
        const skipButton = this.add.image(200, 640, 'skip').setScale(0.4)
            .setInteractive({ useHandCursor: true });

        skipButton.on('pointerup', () => {
            this.scene.start('level_2_2'); // 跳过说明，返回到游戏地图场景
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
            this.scene.start('level_2_2');
        }
    }
}
