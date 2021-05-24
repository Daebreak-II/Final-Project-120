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
      this.load.image('fog', './Assets/sprites/fogSprite1.png');
      this.load.image('smell', './Assets/sprites/scentSprite.png');

      // load audio
      this.load.audio('scream1', './Assets/sfx/scream_1.mp3');
      this.load.audio('scream2', './Assets/sfx/scream_2.mp3');
      this.load.audio('music', './Assets/sfx/ambient_music.wav');
      this.load.audio('walking', './Assets/sfx/Walking.wav');
      //why is this not working
      //load animations
    }

        
    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      
        // add background
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'groundTile').setOrigin(0, 0);
        this.add.image(0, 0, 'border').setOrigin(0,0);


        // adding background objects
        this.campfire = this.add.image(gameWidth/2, gameHeight/2, 'campfire').setScale(0.1);

        this.treeGroup = this.physics.add.group();
        this.treeGroup.runChildUpdate = true;

        for(let i = 0; i < 200; i++) {
          // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
          this.tree = this.treeGroup.create(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree');
          this.tree.setSize(200, 1500);
          this.tree.setOffset(580, 910); // needs to be changed for proper scaling
          this.tree.body.immovable = true;
          this.tree.body.moves = false;
        }
        this.treeGroup.setOrigin(0.5, 0.5);
        // this.treeGroup.rotate(Phaser.Math.Between(-2, 2) * Math.PI / 180);
        this.treeGroup.scaleXY(-0.8); // this ADDS to the scale, so to scale down we need to subtract

        

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

        this.walking = this.sound.add('walking', { volume: 0.1 * volumeMultiplier, loop: false});
        this.walking.setRate(0.75);

        // fog handling
        // this.emitZone = new Phaser.Geom.Rectangle(this.player.x, this.player.y, 3600, 2400);
        this.emitZone = new Phaser.Geom.Rectangle(0, 0, gameWidth, gameHeight);
        this.smellLine = new Phaser.Geom.Line(this.player.x, this.player.y, this.prey.x, this.prey.y);
        
        this.deathZone = new Phaser.Geom.Circle(0, 0, 200);
        this.deathZone2 = new Phaser.Geom.Circle(0, 0, 800);
        //this.image = this.add.image(gameHeight/2, gameWidth/2, 'smell');
        // let a = this.deathZone;
        // let b = this.deathZone2;
        // let superDeathZone = {
        //   contains(x, y){
        //     return a.contains(x,y) || b.contains(x,y);
        //   }
        // }        
        

        // this.particles = this.add.particles('fog');
         this.smellParticles = this.add.particles('smell');
        // this.emitter = this.particles.createEmitter({
        //   speed: { min: -100, max: 100 },
        //   lifespan: 20000,
        //   quantity: 1,
        //   //frequency: 0.5,
        //   scale: { min: 0.5, max: 9 },
        //   //alpha: { start: 0, end: 1 },
        //   blendMode: 'ADD',
        //   emitZone: { source: trandomemitZone },
        //   type: 'onEnter', source: superDeathZone },
        // });
        this.smellEmitter = this.smellParticles.createEmitter({
          speed: { min: -100, max: 100 },
          //x: this.smellLine.x, y: this.smellLine.y,
          lifespan: 2000,
          //radial = true,
          //angle: ,
          //rotate: 0,
          //quantity: 1,
          frequency: 100,
          scale: 0.05,
          alpha: { start: 1, end: 0 },
          blendMode: 'ADD',
          emitZone: { type: 'random', source: this.smellLine},
          //deathZone: { type: 'onEnter', source: superDeathZone },
        });

        this.smellEmitter.setAlpha(0);
        this.fade = 0;
        this.fadeOut = 0;
        //this.smellEmitter.setAngle(Phaser.Math.Angle.Between(this.player.x, this.player.y, this.prey.x, this.prey.y));

        // this.emitter.setAlpha(function (p, k, t) {
        //   return 1 - 2 * Math.abs(t - 0.5);
        // });
        

        this.graphics = this.add.graphics();
        this.deathZone2.x = this.campfire.x;
        this.deathZone2.y = this.campfire.y;
        
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
        this.playerSpeaking = this.add.text(this.player.x, this.player.y, '', textConfig).setOrigin(0.5, 3.5);
      }

    update() {
      // updating objects
      this.player.update();
      this.prey.update();
      

      this.emitZone.x = this.player.x - 3600 / 2;
      this.emitZone.y = this.player.y - 2400 / 2;

      this.deathZone.x = this.player.x;
      this.deathZone.y = this.player.y;
      this.rotation = (Phaser.Math.Angle.Between(this.player.x, this.player.y, this.prey.x, this.prey.y) + Math.PI / 2) * 10;
      
      //this.smellParticles.angle = this.rotation;

      //console.log(this.rotation);

      this.smellLine.setTo(this.player.x, this.player.y, this.prey.x, this.prey.y);

      this.graphics.clear();

      this.graphics.lineStyle(1, 0x00ff00, 1);

      this.graphics.strokeLineShape(this.smellLine);

      // option to restart
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.ambientMusic.stop();
        this.walking.stop();
        moving = false;
        movingAway = false;
        this.scene.start('menuScene');
      }

      this.playerSpeaking.x = this.player.x;
      this.playerSpeaking.y = this.player.y;
      
      // Smell mechanic
      if(Phaser.Input.Keyboard.JustDown(keyS) && !smellUse){
        smellUse = true;

        // for(this.fade = 0; this.fade < 10; this.fade += 0.01){
        //   //console.log(this.fade);
        //   this.smellEmitter.setAlpha(this.fade);
        // }

        this.smellEmitter.setAlpha(0);
        this.clock = this.time.delayedCall(1000, () => {
          this.smellEmitter.setAlpha(0.2);
        }, null, this);
        this.clock = this.time.delayedCall(2000, () => {
          this.smellEmitter.setAlpha(0.4);
        }, null, this);
        this.clock = this.time.delayedCall(3000, () => {
          this.smellEmitter.setAlpha(0.6);
        }, null, this);
        this.clock = this.time.delayedCall(4000, () => {
          this.smellEmitter.setAlpha(0.8);
        }, null, this);
        this.clock = this.time.delayedCall(6000, () => {
          this.smellEmitter.setAlpha(function (p, k, t) {
            return 1 - 2 * Math.abs(t - 0.5);
          });
        }, null, this);
        
        

        this.clock = this.time.delayedCall(15000, () => {
          this.clock = this.time.delayedCall(1000, () => {
            this.smellEmitter.setAlpha(0.8);
          }, null, this);
          this.clock = this.time.delayedCall(2000, () => {
            this.smellEmitter.setAlpha(0.6);
          }, null, this);
          this.clock = this.time.delayedCall(3000, () => {
            this.smellEmitter.setAlpha(0.4);
          }, null, this);
          this.clock = this.time.delayedCall(4000, () => {
            this.smellEmitter.setAlpha(0.2);
          }, null, this);
          this.clock = this.time.delayedCall(5000, () => {
            this.smellEmitter.setAlpha(0);
          }, null, this);
          this.clock = this.time.delayedCall(15000, () => {
            smellUse = false;
            this.fade = 0;
          }, null, this);
        }, null, this);

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

      
      if(Phaser.Math.Distance.BetweenPoints(this.player, this.prey) <= 250){
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

    this.physics.collide(this.player, this.treeGroup);

    // walking sounds
    if(playerMoving == true && this.walking.isPlaying == false) {
      this.walking.play();
    }
    
  }
}