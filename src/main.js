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
    scene: [ Menu, Play, GameOver ],
    physics: {
        default: 'arcade',
        arcade: {debug: true} ,
    }
}

// creating gaem
let game = new Phaser.Game(config);


// reserving keys
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

// game dimension variables
let spriteScale = 1;

// gameplay variables

//Control Variables


// volume variables
let volumeMultiplier = 1;
