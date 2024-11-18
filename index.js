import StartScreen from './scenes/start.js';
import world_map from './scenes/world_map.js';
import EndScreen from './scenes/end.js';
import Educ from './scenes/educ.js'
import level_1_1 from './scenes/level_1_1.js';
import level_1_2 from './scenes/level_1_2.js';
import level_1_3 from './scenes/level_1_3.js';
import level_2_1 from './scenes/level_2_1.js';
import level_2_2 from './scenes/level_2_2.js';
import level_2_3 from './scenes/level_2_3.js';
import level_3_1 from './scenes/level_3_1.js';
import level_3_2 from './scenes/level_3_2.js';
import level_3_3 from './scenes/level_3_3.js';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [StartScreen,Educ, world_map,
        level_1_1,level_1_2,level_1_3,
        level_2_1,level_2_2,level_2_3,
        level_3_1,level_3_2,level_3_3,
        EndScreen], // 使用三个场景
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

const game = new Phaser.Game(config);
