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
    width: 800,  // originally 480
    height: 1000,  // originally 600
    scene: [ Menu, Play, GameOver ],
    physics: {
        default: 'arcade',
        arcade: {debug: false} ,
    }
}

// creating gaem
let game = new Phaser.Game(config);


// reserving keys
let keyF, keyR, keyLEFT, keyRIGHT;

// game dimension variables
let borderUISize = game.config.height / 45;
let borderPadding = borderUISize / 9;

// gameplay variables

//Control Variables


// volume variables
let volumeMultiplier = 1;
