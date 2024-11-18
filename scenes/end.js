export default class EndScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScreen' });
    }
    preload(){
        this.load.image('restart','./css/restart.png')
        this.load.image('end_1', './assets/end_1.png');
        this.load.image('end_2', './assets/end_2.png');
        this.load.image('end_end', './assets/end_end.png');
        for (let i = 1; i<=4;i++){
            this.load.image(`story_${i}`,`./assets/storyend_${i}.png`)
        }
        this.load.image('member','./js/member list.png')
        this.currentSlide = 0;
    }
    create() {
        // 创建一个数组来存储游戏说明的图像键名
        this.slides = [ 'story_1','end_1','story_2', 'end_2','story_3','member','story_4','end_end']; // 添加其他图像键名

        // 显示第一张图像并缩小一倍
        this.slideImage = this.add.image(600, 337, this.slides[this.currentSlide]).setScale(1);

        // 创建一个 "Next" 按钮
        const nextButton = this.add.image(1100, 640, 'next').setScale(0.4)
            .setInteractive({ useHandCursor: true });

        nextButton.on('pointerup', () => {
            this.showNextSlide();
        });


        // 创建游戏结束画面的代码
        const gameOverText = this.add.text(1000, 500, 'Game Over', {
            color: '#fff',
            fontSize: '48px',
            fontFamily: 'Tahoma'
        }).setOrigin(0.5);

        const restartButton = this.add.image(300, 640, 'restart')
            .setOrigin(0.5).setInteractive({ useHandCursor: true }).setScale(0.4);

        restartButton.on('pointerup', () => {
            this.scene.start('world_map'); // 点击按钮后重新开始游戏
            //gameOver = false; // 重置游戏状态
            //score = 0; // 重置分数
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