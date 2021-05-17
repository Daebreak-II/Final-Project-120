class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    

    preload() {
      // load sprites
      this.load.image('player', './Assets/sprites/playerSprite.png');
      this.load.image('prey', './Assets/sprites/preySprite.png');
      this.load.image('tree', './Assets/sprites/treeSprite.png');
      this.load.image('log', './Assets/sprites/logSprite.png');
      this.load.image('campfire', './Assets/sprites/campfireSprite.png');
      this.load.image('groundTile', './Assets/sprites/groundTile.png');
      this.load.image('border', './Assets/sprites/border.png');
      this.load.image('ground', './Assets/sprites/ground.png');

      // load audio
      this.load.audio('scream1', './Assets/sfx/scream_1.mp3');
      this.load.audio('scream2', './Assets/sfx/scream_2.mp3');
      this.load.audio('music', './Assets/sfx/ambient_music.wav');
      this.load.audio('walking', './Assets/sfx/walking.wav');
      //load animations
    }

        
    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      
        // add background
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'groundTile').setOrigin(0, 0);
        this.add.image(0, 0, 'border').setOrigin(0,0);


        // adding background objects
        this.add.image(gameWidth/2, gameHeight/2, 'campfire').setScale(0.1);

        for(let i = 0; i < 200; i++) {
          this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
        }

        for(let i = 0; i < 50; i++) {
          this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'log').setScale(0.2).setAngle(Phaser.Math.Between(-25, 25));
        }

        // adding in objects
        this.player = new Player(this, gameWidth/2, gameHeight/2, 'player', 0).setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);
        this.player.setSize(this.player.width, this.player.height);


        this.prey = new Prey(this, Phaser.Math.Between(gameWidth * 0.2, gameWidth * 0.8), Phaser.Math.Between(gameHeight * 0.2, gameHeight * 0.8), 'prey', 0).setOrigin(0.5, 0.5);
        this.prey.setScale(0.1);
        this.prey.setSize(this.prey.width, this.prey.height);

        // set up camera
        this.cameras.main.setSize(1200, 800);
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(this.player);

        //adding boundaries
        this.physics.world.bounds.setTo(0, 0, gameWidth, gameHeight);
        this.player.body.collideWorldBounds = true;
        this.prey.body.collideWorldBounds = true;

        // play music
        this.ambientMusic = this.sound.add('music', { volume: 1 * volumeMultiplier, loop: true });
        this.ambientMusic.play();

        this.walking = this.sound.add('walking', { volume: 0.1 * volumeMultiplier, loop: true});
        this.walking.setRate(0.75);
        this.walking.play();
        this.walking.pause();

        //adding text explaining your goal
        let textConfig = {
          fontFamily: 'Courier',
          fontSize: '24px',
          color: '#FFFFFF',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          Width: 0
        }
        this.explain = this.add.text(gameWidth/2, gameHeight/2 + 70, 'Find your friend by moving with the arrow keys', textConfig).setOrigin(0.5,0);

      }

    update() {
      // updating objects
      this.player.update();
      this.prey.update();


      // option to restart
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.ambientMusic.stop();
        this.walking.stop();
        moving = false;
        movingAway = false;
        this.scene.start('menuScene');
      }


      //Prey's movement
      if(!moving) {
      moving = true;
      let changeDirection = Phaser.Math.Between(1, 4);
      if(changeDirection <= 1) {
        this.prey.setVelocityX(500);
      } else if(changeDirection <= 2) {
        this.prey.setVelocityX(-500);
      } else if (changeDirection <= 3) {
        this.prey.setVelocityY(500);
      } else if (changeDirection <= 4) {
        this.prey.setVelocityY(-500);
      }

      this.prey.setVelocityX(Phaser.Math.Between(-100, 100));
      this.prey.setVelocityY(Phaser.Math.Between(-100, 100));

      this.clock = this.time.delayedCall(1000, () => {
        moving = false;
      }, null, this);
      }

      if(Phaser.Math.Distance.BetweenPoints(this.player, this.prey) <= 150){
        if(!movingAway) {
          movingAway = true;
          moving = true;
          if(keyLEFT.isDown){
            this.prey.setVelocityX(-480);                
          }
          else if(keyRIGHT.isDown){
            this.prey.setVelocityX(480);
          }
          else{
            this.prey.setVelocityX(0);
          }
          if(keyUP.isDown){
            this.prey.setVelocityY(-480);                
          }
          else if(keyDOWN.isDown){
            this.prey.setVelocityY(480);
          }
          else{
            this.prey.setVelocityY(0);
          }

          this.clock = this.time.delayedCall(50, () => {
            movingAway = false;
          }, null, this);
        }
      }
    

    // collisions 
    if(this.physics.collide(this.player, this.prey)) {
      let i = Phaser.Math.Between(1, 2);
      if(i == 1) {
        this.sound.play('scream1', { volume: 1 * volumeMultiplier});
      } else {
        this.sound.play('scream2', { volume: 1 * volumeMultiplier});
      }
      this.ambientMusic.stop();
      this.walking.stop();
      moving = false;
      movingAway = false;
      this.scene.start('gameOverScene');
    }    

    // walking sounds
    if(playerMoving == true && this.walking.isPaused == true) {
      this.walking.resume();
    } else if (playerMoving == false && this.walking.isPlaying == true) {
      this.walking.pause();
    }
  }
}