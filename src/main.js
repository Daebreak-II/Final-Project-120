/*
Trail Behind

Riley Dix - Producer
Keenan Rea - Head Programmer
Juan Alverado - UI Programming and Design, Sound Designer
Max Mollison - Head Artist

completed ???
*/

let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    scene: [ Menu, Play, GameOver, Options, Tutorial ],
    physics: {
        default: 'arcade',
        arcade: {debug: true} ,
    }
}

// creating gaem
let game = new Phaser.Game(config);


// reserving keys
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyS, keyENTER;

// game dimension variables
let gameWidth = 8000;
let gameHeight = 8000;
let spriteScale = 1;
let playerScale = 0.07;

// gameplay variables
let moving = false;
let movingAway = false;
let playerMoving = false;
let smellUse = false;
let echoUse = false;
let smellCooldown = false;
let echoCooldown = false;
let timesUP = false;
let fadeVariable = false;
let echoSound = false;
let smellGoing = false;
let treeFade = 0;
let logFade = 0;
let rockFade = 0;

//Control Variables


// volume variables
let volumeMultiplier = 1;

// font for the text (not final)
let textConfig = {
    fontFamily: 'Monotype Corsiva',
    fontSize: '36px',
    color: '#000',
    stroke: '#000',
    strokeThickness: 2,
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
    },
    width: 100
}