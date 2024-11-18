let puller1; // 第一组拉杆
let ruler1; // 第一组直尺
let cursors; // 游戏输入对象
let puller1Text; // 第一组拉杆上的文本对象
let redarrows; // 红色箭头数组
let yellowarrows; // 黄色箭头数组
let bluearrows; // 蓝色箭头数组
let greenarrow; // 绿色箭头
let up; // 上箭头
let upward2; // 上箭头2
const stepWidth = 15; // 每个小步骤的宽度

export default class level_2_2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level_2_2' });

        this.timer = null; // 初始化计时器
        this.taskCompleted = false; // 任务是否完成的标志
    }

    preload() {
        // 加载游戏资源
        this.load.image('background', './assets/EBackground.png');
        this.load.image('puller', './assets/Ehandle.png');
        this.load.image('ruler', './assets/Etrack.png');
        for (let i = 1; i <= 10; i++) {
            this.load.image(`redarrow${i}`, `./css/Eindependent${i}.png`);
            this.load.image(`yellowarrow${i}`, `./css/Edependent${i}.png`);
            this.load.image(`bluearrow${i}`, `./css/Ecirculate${i}.png`);
        }
        this.load.image('upward', './css/Eupward.png');
        this.load.image('green', './css/Egoal.png');
        this.load.image('home', './css/EHome.png');
        this.load.image('downward', './css/Edownward.png');
        this.load.image('submit', './css/submit.png');
    }

    create() {
        // 添加背景
        this.add.image(600, 337, 'background').setScale(1).setDepth(0);
        this.add.image(600, 337, 'downward');

        // 创建upward2并进行旋转
        upward2 = this.add.image(775, 160, 'upward').setScale(0.8).setRotation(Phaser.Math.DegToRad(270));

        // 创建第一组直尺和拉杆
        ruler1 = this.add.sprite(850, 525, 'ruler');
        ruler1.setOrigin(0.4);
        ruler1.setScale(0.5, 0.5);

        puller1 = this.add.sprite(850, 565, 'puller');
        puller1.setOrigin(0.5);
        puller1.setScale(0.3);
        puller1.setInteractive();

        puller1Text = this.add.text(1125, 565, '50%', { fontSize: '32px', fill: '#000000' });
        puller1Text.setOrigin(0.5);
        puller1Text.setScale(0.8);

        // 创建箭头精灵并添加到相应数组
        redarrows = [];
        yellowarrows = [];
        bluearrows = [];

        for (let i = 1; i <= 10; i++) {
            const redarrow = this.add.sprite(600, 337, `redarrow${i}`);
            redarrow.setVisible(false);
            redarrows.push(redarrow);

            const yellowarrow = this.add.sprite(600, 337, `yellowarrow${i}`);
            yellowarrow.setVisible(false);
            yellowarrows.push(yellowarrow);

            const bluearrow = this.add.sprite(600, 337, `bluearrow${i}`);
            bluearrow.setVisible(false);
            bluearrows.push(bluearrow);
        }

        greenarrow = this.add.sprite(600, 337, 'green');
        greenarrow.setVisible(false);

        up = this.add.sprite(600, 337, 'upward');
        up.setVisible(false);

        // 创建游戏输入对象
        cursors = this.input.mousePointer;

        // 添加提交按钮
        const submitButton = this.add.image(750, 525, 'submit').setScale(0.6)
            .setOrigin(0.5).setInteractive({ useHandCursor: true });

        submitButton.on('pointerup', () => {
            // 如果任务已经完成，则不处理
            if (this.taskCompleted) {
                return;
            }

            // 获取当前拉杆的位置
            const pullerX = puller1.x;

            // 计算拉杆的值（假设拉杆的有效范围是750到1075）
            const pullerValue = ((pullerX - 750) / 325) * 100;

            // 判断是否成功
            if (pullerValue > 90) {
                // 成功，进入level_2_3
                this.scene.start('level_2_3');
                // 标记任务已完成
                this.taskCompleted = true;
            } else {
                // 失败，显示警告消息
                this.showWarningMessage('Please try again.');
            }
        });

        // 添加返回按钮
        const returnButton = this.add.image(125, 40, 'home')
            .setOrigin(0.5);
        returnButton.on('pointerup', () => {
            this.scene.start('world_map');
        });

        // 添加倒计时文本
        this.timerText = this.add.text(900, 475, 'Time: 10:00', {
            fontSize: '24px',
            fill: '#000000'
        });

        // 启动计时器，设定十分钟（以毫秒为单位）
        const tenMinutes = 10 * 60 * 1000;
        this.timer = this.time.delayedCall(tenMinutes, this.onTimeUp, [], this);
    }

    update() {
        // 获取直尺的位置
        const ruler1Bounds = new Phaser.Geom.Rectangle(ruler1.x - 25, ruler1.y + 25, 50, 50);

        // 检查鼠标的位置，控制哪个拉杆可以移动
        if (Phaser.Geom.Rectangle.Contains(ruler1Bounds, cursors.x, cursors.y)) {
            puller1.setTint(0x00ff00);
        } else {
            puller1.clearTint();
        }

        // 获取拉杆的位置
        const pullerX = puller1.x;

        // 根据拉杆位置计算应该可见的箭头索引
        const arrowIndex = Math.floor(((pullerX - 750) / 325) * 10);
        // 限制索引在有效范围内
        const clampedIndex = Phaser.Math.Clamp(arrowIndex, 0, 9);

        // 设置箭头的可见性和缩放
        redarrows.forEach((redarrow, index) => {
            if (index === clampedIndex) {
                redarrow.setVisible(true);
            } else {
                redarrow.setVisible(false);
            }
        });

        yellowarrows.forEach((yellowarrow, index) => {
            if (index === clampedIndex) {
                yellowarrow.setVisible(true);
            } else {
                yellowarrow.setVisible(false);
            }
        });

        bluearrows.forEach((bluearrow, index) => {
            if (index === clampedIndex) {
                bluearrow.setVisible(true);
            } else {
                bluearrow.setVisible(false);
            }
        });

        up.setVisible(true);
        up.x = 740 - clampedIndex * stepWidth;

        greenarrow.setVisible(true);

        const initialX = 600;
        greenarrow.x = initialX;

        // 设置绿色箭头的缩放
        const minScale = 0.8;
        const maxScale = 1.00;

        const scaledValue = Phaser.Math.Clamp((clampedIndex + 1) / 0.2, minScale, maxScale);
        greenarrow.setScale(scaledValue);

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

        puller1.x = Phaser.Math.Clamp(puller1.x, 750, 1075);

        const percentage1 = Math.round(((puller1.x - 750) / 325) * 100).toString() + '%';
        puller1Text.setText(percentage1);

        // 根据拉杆位置计算upward2的长度
        const pullerValue = ((pullerX - 750) / 325) * 100; // 将拉杆位置映射到0到100的范围
        const upward2Length = pullerValue; // 计算 upward2 的长度，使其与拉杆位置反比例
        // 假设 pullerValue 是拉杆的位置，范围从0到100
        const scaleFactor = 1.0 - (0.4 * (upward2Length / 100)); // 在1到0.6之间线性变化

        upward2.setScale(0.8, scaleFactor);// 调整y轴的缩放来改变长度

        const remainingTime = this.timer.getRemainingSeconds();
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60); // 使用 Math.floor 来确保秒数是整数
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerText.setText(`Time: ${formattedTime}`);

    }

    onTimeUp() {
        // 时间到，显示警告消息
        this.showWarningMessage('Time is up! Please try again.');
        // 停止计时器
        this.timer.remove();
    }

    showWarningMessage(message) {
        // 弹出警告消息
        const dialog = this.createDialog({
            width: 300,
            height: 200,
            title: 'Warning',
            content: message,
            choices: ['OK'],
            callback: () => {
                dialog.layout();
            },
        });

        dialog.layout();
    }

    createDialog(config) {
        const dialogContainer = this.add.container(400, 300);
        const background = this.add.rectangle(0, 0, config.width, config.height, 0x333333, 1);
        background.setOrigin(0.5);
        dialogContainer.add(background);

        const title = this.add.text(0, -config.height / 2 + 20, config.title, {
            fontSize: '24px',
            color: '#ffffff',
        });
        title.setOrigin(0.5);
        dialogContainer.add(title);

        const content = this.add.text(0, 0, config.content, {
            fontSize: '18px',
            color: '#ffffff',
            wordWrap: { width: config.width - 40 },
        });
        content.setOrigin(0.5);
        dialogContainer.add(content);

        // 添加关闭按钮
        const closeButton = this.add.text(config.width / 2 - 20, -config.height / 2 + 20, 'X', {
            fontSize: '24px',
            color: '#ff0000',
            backgroundColor: '#333333',
            padding: {
                x: 5,
                y: 5,
            },
        });
        closeButton.setOrigin(0.5);
        closeButton.setInteractive({ useHandCursor: true });

        closeButton.on('pointerup', () => {
            dialogContainer.destroy();
        });

        dialogContainer.add(closeButton);

        const buttons = config.choices.map((choice, index) => {
            const button = this.add.text(
                -config.width / 4 + (config.width / 2) * index,
                config.height / 4,
                choice,
                {
                    fontSize: '18px',
                    color: '#ffffff',
                    backgroundColor: '#333333',
                    padding: {
                        x: 10,
                        y: 5,
                    },
                }
            );
            button.setOrigin(0.5);
            button.setInteractive({ useHandCursor: true });

            button.on('pointerup', () => {
                if (config.callback) {
                    config.callback(choice);
                }
                dialogContainer.destroy();
            });

            dialogContainer.add(button);

            return button;
        });

        return dialogContainer;
    }
}





