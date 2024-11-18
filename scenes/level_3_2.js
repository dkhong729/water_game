let puller1; // 第一组拉杆
let ruler1; // 第一组直尺
let puller2; // 第二组拉杆
let ruler2; // 第二组直尺
let puller3; // 第三组拉杆
let ruler3; // 第三组直尺
let cursors; // 游标键
let redarrows;
let pinkarrows;
let submitButton; // 提交按钮
let taskCompleted = false; // 标记任务是否已完成

const correctAnswers = [
    [3, 9, 7],
[3, 10, 7],
[3, 10, 8],
[4, 9, 6],
[4, 10, 6],
[4, 8, 7],
[4, 9, 7],
[4, 10, 7],
[4, 9, 8],
[5, 9, 5],
[5, 10, 5],
[5, 8, 6],
[5, 9, 6],
[5, 10, 6],
[5, 7, 7],
[5, 8, 7],
[5, 9, 7],
[5, 8, 8],
[6, 8, 5],
[6, 9, 5],
[6, 10, 5],
[6, 7, 6],
[6, 8, 6],
[6, 9, 6],
[6, 6, 7],
[6, 7, 7],
[6, 8, 7],
[6, 7, 8],
[7, 7, 5],
[7, 8, 5],
[7, 9, 5],
[7, 6, 6],
[7, 7, 6],
[7, 8, 6],
[7, 6, 7],
[7, 7, 7],
[8, 6, 5],
[8, 7, 5],
[8, 8, 5],
[8, 6, 6],
[8, 7, 6],
[9, 6, 5],
[9, 7, 5],
];

export default class level_3_2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_3_2' });
    }

    preload() {
        // 加载资源
        this.load.image('puller', './assets/Ehandle.png');
        this.load.image('ruler', './assets/Etrack.png');
        for (let i = 1; i <= 10; i++) {
            this.load.image(`redarrow${i}`, `./css/E.2 Ele_red_arrow${i}.png`);
        }
        for (let i = 1; i <= 10; i++) {
            this.load.image(`pinkarrow${i}`, `./assets/E.2 arrow_pink${i}.png`);
        }
        this.load.image('3b', './assets/3background.png');
        this.load.image('submit', './css/submit.png');
        this.load.image('C','./assets/C.png')
    }

    create() {
        // 创建第一组拉杆和直尺
        this.add.image(600, 337, '3b');
        
        // 创建直尺
        ruler1 = this.add.sprite(605, 438, 'C');
        ruler1.setOrigin(0.4);
        ruler1.setScale(0.5, 0.5);

        // 创建拉杆
        puller1 = this.add.sprite(400, 480, 'puller');
        puller1.setOrigin(0.5);
        puller1.setScale(0.3);
        puller1.setInteractive();

        // 设置触发区域，这里缩小了感应范围，可以根据需要调整数值
        const hitArea1 = new Phaser.Geom.Rectangle(-20, -20, puller1.width - 100, puller1.height - 100);
        puller1.setInteractive(hitArea1);

        puller1.on('pointerover', () => {
            puller1.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });

        puller1.on('pointerout', () => {
            puller1.clearTint();
            document.body.style.cursor = 'auto';
        });

        // 创建第二组拉杆和直尺
        // 创建直尺
        ruler2 = this.add.sprite(605, 508, 'C');
        ruler2.setOrigin(0.4);
        ruler2.setScale(0.5, 0.5);

        // 创建拉杆
        puller2 = this.add.sprite(605, 550, 'puller');
        puller2.setOrigin(0.5);
        puller2.setScale(0.3);
        puller2.setInteractive();

        // 设置触发区域，这里缩小了感应范围，可以根据需要调整数值
        const hitArea2 = new Phaser.Geom.Rectangle(-20, -20, puller2.width - 100, puller2.height - 100);
        puller2.setInteractive(hitArea2);

        puller2.on('pointerover', () => {
            puller2.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });

        puller2.on('pointerout', () => {
            puller2.clearTint();
            document.body.style.cursor = 'auto';
        });

        // 创建第三组拉杆和直尺
        // 创建直尺
        ruler3 = this.add.sprite(605, 578, 'C');
        ruler3.setOrigin(0.4);
        ruler3.setScale(0.5, 0.5);

        // 创建拉杆
        puller3 = this.add.sprite(605, 620, 'puller');
        puller3.setOrigin(0.5);
        puller3.setScale(0.3);
        puller3.setInteractive();

        // 设置触发区域，这里缩小了感应范围，可以根据需要调整数值
        const hitArea3 = new Phaser.Geom.Rectangle(-20, -20, puller3.width - 100, puller3.height - 100);
        puller3.setInteractive(hitArea3);

        puller3.on('pointerover', () => {
            puller3.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });

        puller3.on('pointerout', () => {
            puller3.clearTint();
            document.body.style.cursor = 'auto';
        });

        cursors = this.input.keyboard.createCursorKeys();

        redarrows = [];
        pinkarrows = [];
        for (let i = 1; i <= 10; i++) {
            const redarrow = this.add.sprite(800, 300, `redarrow${i}`);
            redarrow.setVisible(false);
            redarrows.push(redarrow);
        }
        for (let i = 1; i <= 10; i++) {
            const pinkarrow = this.add.sprite(1000, 290, `pinkarrow${i}`);
            pinkarrow.setVisible(false);
            pinkarrows.push(pinkarrow);
        }

        submitButton = this.add.image(1100, 640, 'submit').setScale(0.4)
            .setInteractive({ useHandCursor: true });

        submitButton.on('pointerup', () => {
            // 如果任务已经完成，则不处理
            if (taskCompleted) {
                return;
            }

            // 获取当前三个拉杆的位置并转化为1到10的整数范围
            const pullerValue1 = Phaser.Math.Clamp(Math.floor(((puller1.x - 540) / 250) * 10) + 1, 1, 10);
            const pullerValue2 = Phaser.Math.Clamp(Math.floor(((puller2.x - 540) / 250) * 10) + 1, 1, 10);
            const pullerValue3 = Phaser.Math.Clamp(Math.floor(((puller3.x - 540) / 250) * 10) + 1, 1, 10);

            // 检查答案数组中是否有匹配的组合
            const isCorrect = correctAnswers.some(answer => {
                return answer[0] === pullerValue1 && answer[1] === pullerValue2 && answer[2] === pullerValue3;
            });

            if (isCorrect) {
                // 成功，进入下一个画面
                this.scene.start('level_2_3');
                // 标记任务已完成
                taskCompleted = true;
            } else {
                // 失败，显示警告消息
                this.showWarningMessage('Please try again.');
            }
        });
    } 

    update() {
        // 检查第一组拉杆是否悬停

        const cursorKeys = this.input.keyboard.createCursorKeys();
        
        if (cursorKeys.left.isDown) {
            if (puller1.isTinted) {
                puller1.x -= 3;
            }
        }

        if (cursorKeys.right.isDown) {
            if (puller1.isTinted) {
                puller1.x += 3;
            }
        }

        // 检查第二组拉杆是否悬停
        if (cursorKeys.left.isDown) {
            if (puller2.isTinted) {
                puller2.x -= 3;
            }
        }

        if (cursorKeys.right.isDown) {
            if (puller2.isTinted) {
                puller2.x += 3;
            }
        }

        // 检查第三组拉杆是否悬停
        if (cursorKeys.left.isDown) {
            if (puller3.isTinted) {
                puller3.x -= 3;
            }
        }

        if (cursorKeys.right.isDown) {
            if (puller3.isTinted) {
                puller3.x += 3;
            }
        }

        puller1.x = Phaser.Math.Clamp(puller1.x, 540, 790);
        puller2.x = Phaser.Math.Clamp(puller2.x, 540, 790);
        puller3.x = Phaser.Math.Clamp(puller3.x, 540, 790);

        // 获取拉杆的位置
        const pullerX = puller1.x;
        const pullerX2 = puller2.x;
        const pullerX3 = puller3.x;
        const pullerXX = pullerX2 - pullerX3;
        // 根据拉杆位置计算应该可见的箭头索引
        const arrowIndex = Math.floor(((pullerX - 540) / 250) * 10);
        const arrowIndex2 = Math.floor(((pullerXX + 250) / 500) * 10);
        // 限制索引在有效范围内
        const clampedIndex = Phaser.Math.Clamp(arrowIndex, 0, 9);
        const clampedIndex2 = Phaser.Math.Clamp(arrowIndex2, 0, 9);

        // 设置箭头的可见性和缩放
        redarrows.forEach((redarrow, index) => {
            if (index === clampedIndex) {
                redarrow.setVisible(true);
            } else {
                redarrow.setVisible(false);
            }
        });
        pinkarrows.forEach((pinkarrow, index) => {
            if (index === clampedIndex2) {
                pinkarrow.setVisible(true);
            } else {
                pinkarrow.setVisible(false);
            }
        });
    }
    showWarningMessage(message) {
        // 在这里添加显示警告消息的逻辑，例如弹出一个提示框
        alert(message);
    }
}

