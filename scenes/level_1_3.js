let globalSuccess1 = false;

export default class level_1_3 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_1_3' });
    }

    preload() {
        this.load.image('POST1','./lib/LV21.png')
        this.load.image('POST2','./lib/LV22.png')
        this.load.image('next','./css/next page.png')
        this.load.image('skip','./css/skip.png')
        this.currentSlide = 0;
    }

    create() {
        // 创建一个数组来存储游戏说明的图像键名
        this.slides = ['POST1','POST2']; // 添加其他图像键名

        // 显示第一张图像并缩小一倍
        this.slideImage = this.add.image(600, 337, this.slides[this.currentSlide]).setScale(1);

        // 创建一个 "Skip" 按钮
        const skipButton = this.add.image(775, 600, 'skip').setScale(0.5)
            .setInteractive({ useHandCursor: true });

        skipButton.on('pointerup', () => {
            this.scene.start('EndScreen'); // 跳过说明，返回到游戏地图场景
        });

        // 创建一个 "Next" 按钮
        const nextButton = this.add.image(1050, 600, 'next').setScale(0.5)
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
            this.scene.start('EndScreen');
        }
    }
}


