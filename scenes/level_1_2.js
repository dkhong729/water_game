let puller1; // 第一组拉杆
let ruler1; // 第一组直尺
let puller1Text; // 第一组拉杆上的文本对象
let puller2; // 第二组拉杆
let ruler2; // 第二组直尺
let puller2Text; // 第二组拉杆上的文本对象

let icebergs;
let cursors; // 游标键

let failWindow; // 失败视窗

export default class level_1_2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_1_2' });
    }

    preload() {
        // 预加载拉杆和直尺图片
        this.load.image('puller', './assets/Ehandle.png');
        this.load.image('ruler', './assets/Etrack.png');
        
        // 预加载冰山图片
        for (let i = 1; i <= 7; i++) {
            this.load.image(`iceberg${i}`, `./assets/Eiceberg${8-i}.png`);
        }
        
        this.load.image('backice', './assets/EiceBackground.png');
        this.load.image('submit', './css/submit.png');
        this.load.image('closeButton', './css/closeButton.png'); // 关闭按钮的图片资源
    }

    create() {
        // 创建背景
        this.add.image(600, 337, 'backice');

        // 创建冰山图层
        icebergs = [];
        for (let i = 1; i <= 7; i++) {
            const iceberg = this.add.sprite(800, 237, `iceberg${i}`);
            iceberg.setVisible(false);
            icebergs.push(iceberg);
        }

        // 创建第一组直尺和拉杆
        ruler1 = this.createPuller(600, 430);
        puller1 = ruler1.puller;

        // 创建第二组直尺和拉杆
        ruler2 = this.createPuller(600, 510);
        puller2 = ruler2.puller;

        // 创建失败视窗，设置为不可见
        failWindow = this.add.container(600, 337);
        const failMessage = this.add.text(0, -50, 'Please try again', { fontSize: '24px', fill: '#FF0000' });
        failMessage.setOrigin(0.5);
        const closeButton = this.add.image(0, 0, 'closeButton');
        closeButton.setOrigin(0.5);
        closeButton.setScale(0.5);

        failWindow.add(failMessage);
        failWindow.add(closeButton);
        failWindow.setVisible(false);

        // 点击关闭按钮来关闭失败视窗
        closeButton.setInteractive({ useHandCursor: true });
        closeButton.on('pointerup', () => {
            failWindow.setVisible(false);
        });

        const startButton = this.add.image(1100, 550, 'submit').setScale(0.5)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        startButton.on('pointerup', () => {
            // 获取拉杆的位置
            const puller1X = puller1.x;
            const puller2X = puller2.x;

            // 进行运算，例如相加或相乘
            let result =  2.5**((puller2.x-500)*3.077/500) + 2**((((puller1.x-500)*2.646) - 440)/70); // 这里可以根据需要修改运算方式

            // 计算出的结果分为七等分
            const clampedIndex = this.calculateClampedIndex(result);

            if (clampedIndex === 0) {
                // 成功，进入下一场景
                this.scene.start('level_1_3');
            } else {
                // 失败，显示失败视窗
                failWindow.setVisible(true);
            }
        });

        // 创建游标键
        cursors = this.input.keyboard.createCursorKeys();
    }

    createPuller(x, y) {
        // 创建直尺
        const ruler = this.add.sprite(x, y, 'ruler');
        ruler.setOrigin(0.4);
        ruler.setScale(0.5, 0.5);

        // 创建拉杆
        const puller = this.add.sprite(x + 64, y + 40, 'puller');
        puller.setOrigin(0.5);
        puller.setScale(0.3);
        puller.setInteractive();

        puller.on('pointerover', () => {
            puller.setTint(0x00ff00);
            this.input.setDefaultCursor('pointer');
        });

        puller.on('pointerout', () => {
            puller.clearTint();
            this.input.setDefaultCursor('auto');
        });

        // 添加文本对象用于显示拉杆位置
        const pullerText = this.add.text(x + 200, y +50, '0%', { fontSize: '32px', fill: '#000000' });
        pullerText.setOrigin(0.5);
        pullerText.setScale(0.8);

        // 返回拉杆和文本对象的引用
        return { puller, pullerText };
    }

    handlePullerMovement(puller, ruler) {
        if (cursors.left.isDown) {
            if (puller.isTinted) {
                puller.x -= 3;
            }
        }

        if (cursors.right.isDown) {
            if (puller.isTinted) {
                puller.x += 3;
            }
        }

        // 修正拉杆的移动范围
        puller.x = Phaser.Math.Clamp(puller.x, 500, 825);

        // 更新文本显示
        const percentage = Math.round(((puller.x - 500) / 325) * 100).toString() + '%';
        ruler.pullerText.setText(percentage);
    }

    calculateClampedIndex(result) {
        // 根据计算结果将范围分为七等分，返回对应的索引
        for (let i = 0; i <= 6; i++) {
            if (result >= 2 ** i && result <= 2 ** (i + 1)) {
                return i;
            } 
        }
        return 0; // 默认值
    }

    setIcebergsVisibility(clampedIndex) {
        // 根据索引设置冰山图层的可见性
        icebergs.forEach((iceberg, index) => {
            iceberg.setVisible(index === clampedIndex);
        });
    }

    update() {
        // 处理拖动逻辑
        this.handlePullerMovement(puller1, ruler1);
        this.handlePullerMovement(puller2, ruler2);

        // 获取拉杆的位置
        const puller1X = puller1.x;
        const puller2X = puller2.x;

        // 进行运算，例如相加或相乘
        let result =  2.5**((puller2.x-500)*3.077/500) + 2**((((puller1.x-500)*2.646) - 440)/70); // 这里可以根据需要修改运算方式
        console.log(result);
        // 计算出的结果分为七等分
        const clampedIndex = this.calculateClampedIndex(result);

        // 根据计算结果设置冰山的可见性
        this.setIcebergsVisibility(clampedIndex);
    }
}
