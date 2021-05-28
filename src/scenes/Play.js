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
      this.load.image('fog1', './Assets/sprites/fogSprite1.png');
      this.load.image('fog2', './Assets/sprites/fogSprite2.png');
      this.load.image('fog3', './Assets/sprites/fogSprite3.png');
      this.load.image('fog4', './Assets/sprites/fogSprite4.png');
      this.load.image('smell', './Assets/sprites/scentSprite.png');
      this.load.image('fogOverlay', './Assets/sprites/fogOverlay.png');
      this.load.image('cabin', './Assets/sprites/cabinSprite.png');
      this.load.image('river', './Assets/sprites/riverSprite.png');
      

      // load audio
      this.load.audio('scream1', './Assets/sfx/scream_1.mp3');
      this.load.audio('scream2', './Assets/sfx/scream_2.mp3');
      this.load.audio('music', './Assets/sfx/ambient_music.wav');
      this.load.audio('walking', './Assets/sfx/Walking.wav');
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
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
        // add background
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'groundTile').setOrigin(0, 0);
        this.river1 = this.add.image(gameWidth/2, gameHeight/2 + 600, 'river').setScale(2, 0.7);
        this.add.image(0, 0, 'border').setOrigin(0,0);

        // add overlay
        this.overlay = this.add.image(0, 0, 'fogOverlay').setOrigin(0.5, 0.5);
        this.overlay.setScale(1.1);
        this.overlay.setAlpha(1);
        this.overlay.depth = 10; // temporary, need a way to bring to absolute top


        //adding the hitboxes of the river 

        this.leftBoundary1 = this.add.rectangle(0, 0, 1500, gameHeight*1500);
        this.leftBoundary2 = this.add.rectangle(500 , gameHeight / 2 * 2 + 800, 1500, gameHeight);
        this.upperBoundary1 = this.add.rectangle(0, 0, gameWidth - 800, 1800);
        this.upperBoundary2 = this.add.rectangle(gameWidth/2, 0, gameWidth - 800, 800);
        this.rightBoundary1 = this.add.rectangle(gameWidth - 800, 0, 1200, gameHeight+600);
        this.rightBoundary2 = this.add.rectangle(gameWidth, gameHeight/2, 800, gameHeight+600);
        this.downBoundary1 = this.add.rectangle(0, gameHeight, gameWidth * 2, 1500);
        
        
        this.physics.add.existing(this.leftBoundary1);
        this.leftBoundary1.body.immovable = true;
        this.leftBoundary1.body.moves = false;
        this.physics.add.existing(this.leftBoundary2);
        this.leftBoundary2.body.immovable = true;
        this.leftBoundary2.body.moves = false;
        this.physics.add.existing(this.upperBoundary1);
        this.upperBoundary1.body.immovable = true;
        this.upperBoundary1.body.moves = false;
        this.physics.add.existing(this.upperBoundary2);
        this.upperBoundary2.body.immovable = true;
        this.upperBoundary2.body.moves = false;
        this.physics.add.existing(this.rightBoundary1);
        this.rightBoundary1.body.immovable = true;
        this.rightBoundary1.body.moves = false;
        this.physics.add.existing(this.rightBoundary2);
        this.rightBoundary2.body.immovable = true;
        this.rightBoundary2.body.moves = false;
        this.physics.add.existing(this.downBoundary1);
        this.downBoundary1.body.immovable = true;
        this.downBoundary1.body.moves = false;


        // adding background objects
        this.campfire = this.add.sprite(gameWidth/2, gameHeight/2, 'campfire').setScale(0.1);
        this.cabin = this.physics.add.image(gameWidth / 2 + 1400, 1100 ,'cabin');
        // this.add.existing(this.cabin);
        // this.physics.add.existing(this.cabin);
        
        this.cabin.setScale(0.5);
        this.cabin.setSize(1200, 600);
        this.cabin.setOffset(130, 910);
        this.cabin.setOrigin(0.5,0);
        this.cabin.body.immovable = true;
        this.cabin.body.moves = false;
        

        this.treeGroup = this.physics.add.group();
        this.treeGroup.runChildUpdate = true;

        for(let i = 0; i < 200; i++) {
          // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
          this.tree = this.treeGroup.create(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree');
          this.tree.setSize(200, 1500);
          this.tree.setOffset(580, 910); // needs to be changed for proper scaling
          this.tree.body.immovable = true;
          this.tree.body.moves = false;
          if(this.physics.collide(this.tree, this.cabin)) {
            this.tree.destroy();
          }

        }
        this.treeGroup.setOrigin(0.5, 0.5);
        // this.treeGroup.rotate(Phaser.Math.Between(-2, 2) * Math.PI / 180);
        this.treeGroup.scaleXY(-0.8); // this ADDS to the scale, so to scale down we need to subtract

        
        this.logGroup = this.physics.add.group();
        this.logGroup.runChildUpdate = true;
        for(let i = 0; i < 50; i++) {
          this.log = this.logGroup.create(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'log').setScale(0.2);
          this.log.body.immovable = true;
          this.log.body.moves = false;
          // setAngle(Phaser.Math.Between(-5, 5))
        }

        // adding in moving objects
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

        // Particles
        this.blackScreen = this.add.rectangle(0, 0, 2400, 1600, 0x000000);
        this.blackScreen.alpha = 0;

        this.fogEmitZone = new Phaser.Geom.Rectangle(this.player.x, this.player.y, game.config.width, game.config.height);
        this.emitZone = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        this.smellLine = new Phaser.Geom.Line(this.player.x, this.player.y, this.prey.x, this.prey.y);
        this.deathZone = new Phaser.Geom.Circle(0, 0, 200);
        this.deathZone2 = new Phaser.Geom.Circle(0, 0, 800);
        let a = this.deathZone;
        let b = this.deathZone2;
        let superDeathZone = {
          contains(x, y){
            return a.contains(x,y) || b.contains(x,y);
          }
        }        
        


        this.fogParticle1 = this.add.particles('fog1');
        this.fogParticle2 = this.add.particles('fog2');
        this.fogParticle3 = this.add.particles('fog3');
        this.fogParticle4 = this.add.particles('fog4');
        this.smellParticles = this.add.particles('smell');

        this.fogEmitter1 = this.fogParticle1.createEmitter({
          speed: { min: -10, max: 10 },
          lifespan: 20000,
          quantity: 1,
          frequency: 1600,
          scale: { min: 2 , max: 4 },
          alpha: { start: 0, end: 0.8 },
          blendMode: 'ADD',
          emitZone: { source: this.fogEmitZone },
          on: false,
          deathzone: {type:  'onEnter', source: superDeathZone },
        });
        this.fogEmitter2 = this.fogParticle2.createEmitter({
          speed: { min: -10, max: 10 },
          lifespan: 20000,
          quantity: 1,
          frequency: 1600,
          scale: { min: 2 , max: 4 },
          alpha: { start: 0, end: 0.8 },
          blendMode: 'ADD',
          emitZone: { source: this.fogEmitZone },
          on: false,
          deathzone: {type:  'onEnter', source: superDeathZone },
        });
        this.fogEmitter3 = this.fogParticle3.createEmitter({
          speed: { min: -10, max: 10 },
          lifespan: 20000,
          quantity: 1,
          frequency: 1600,
          scale: { min: 2 , max: 4 },
          alpha: { start: 0, end: 0.8 },
          blendMode: 'ADD',
          emitZone: { source: this.fogEmitZone },
          on: false,
          deathzone: {type:  'onEnter', source: superDeathZone },
        });
        this.fogEmitter4 = this.fogParticle4.createEmitter({
          speed: { min: -10, max: 10 },
          lifespan: 20000,
          quantity: 1,
          frequency: 1600,
          scale: { min: 2 , max: 4 },
          alpha: { start: 0, end: 0.8 },
          blendMode: 'ADD',
          emitZone: { source: this.fogEmitZone },
          on: false,
          deathzone: {type:  'onEnter', source: superDeathZone },
        });

        this.smellEmitter = this.smellParticles.createEmitter({
          //speed: { min: -10, max: 10 },
          //x: this.smellLine.x, y: this.smellLine.y,
          lifespan: 1500,
          //radial = true,
          //angle: ,
          //rotate: 45,
          //quantity: 1,
          frequency: 500,
          scale: 0.08,
          alpha: { start: 1, end: 0 },
          blendMode: 'ADD',
          emitZone: { type: 'random', source: this.smellLine},
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
      // updating overlay
      // this.overlay.x = this.player.x;
      // this.overlay.y = this.player.y;

      this.fogEmitZone.x = this.player.x - game.config.width / 2;
      this.fogEmitZone.y = this.player.y - game.config.height / 2;

      this.blackScreen.x = this.player.x;
      this.blackScreen.y = this.player.y;

      

      this.emitZone.x = this.player.x - 3600 / 2;
      this.emitZone.y = this.player.y - 2400 / 2;

      this.deathZone.x = this.player.x;
      this.deathZone.y = this.player.y;
      this.rotation = (Phaser.Math.Angle.Between(this.player.x, this.player.y, this.prey.x, this.prey.y));
      
      this.smellEmitter.forEachAlive((particle) => {
          particle.rotation = this.rotation;
        
      });
      //this.smellParticles.angle = this.rotation;

      //console.log(this.rotation);

      this.smellLine.setTo(this.player.x, this.player.y, this.prey.x, this.prey.y);

      this.graphics.clear();

      // this.graphics.lineStyle(1, 0x00ff00, 1);

      // this.graphics.strokeLineShape(this.smellLine);

      // option to restart
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.ambientMusic.stop();
        this.walking.stop();
        moving = false;
        movingAway = false;
        echoCooldown = false;
        smellUse =  false;
        this.scene.start('menuScene');
      }

      this.playerSpeaking.x = this.player.x;
      this.playerSpeaking.y = this.player.y;
      
      // echolocation Mechanic
      if (keySPACE.isDown && !echoCooldown) {
        echoCooldown = true;
        this.clock = this.time.delayedCall(333, () => {
          this.overlay.setScale(this.overlay.scale + 0.1);
          this.overlay.setAlpha(this.overlay.alpha - 0.1);
        }, null, this);
        this.clock = this.time.delayedCall(666, () => {
          this.overlay.setScale(this.overlay.scale + 0.1);
          this.overlay.setAlpha(this.overlay.alpha - 0.1);
        }, null, this);
        this.clock = this.time.delayedCall(1000, () => {
          this.overlay.setScale(this.overlay.scale + 0.1);
          this.overlay.setAlpha(this.overlay.alpha - 0.1);
        }, null, this);
        this.clock = this.time.delayedCall(2000, () => {
          this.overlay.setScale(this.overlay.scale - 0.1);
          this.overlay.setAlpha(this.overlay.alpha + 0.1);
        }, null, this);
        this.clock = this.time.delayedCall(2333, () => {
          this.overlay.setScale(this.overlay.scale - 0.1);
          this.overlay.setAlpha(this.overlay.alpha + 0.1);
        }, null, this);
        this.clock = this.time.delayedCall(2666, () => {
          this.overlay.setScale(this.overlay.scale - 0.1);
          this.overlay.setAlpha(this.overlay.alpha + 0.1);
          echoCooldown = false;
        }, null, this);
      }

      // Smell mechanic
      if(keyS.isDown && !smellUse){
        smellUse = true;
        //fading in the smell particle
        // this.smellEmitter.setAlpha(0);
        // this.clock = this.time.delayedCall(1000, () => {
        //   this.smellEmitter.setAlpha(0.2);
        // }, null, this);
        // this.clock = this.time.delayedCall(2000, () => {
        //   this.smellEmitter.setAlpha(0.4);
        // }, null, this);
        // this.clock = this.time.delayedCall(3000, () => {
        //   this.smellEmitter.setAlpha(0.6);
        // }, null, this);
        // this.clock = this.time.delayedCall(4000, () => {
        //   this.smellEmitter.setAlpha(0.8);
        // }, null, this);

        // //this helps the particles fade in and out instead of popping of existance
        // this.clock = this.time.delayedCall(6000, () => {
          this.blackScreen.alpha = 0.8;
          this.smellEmitter.setAlpha(function (p, k, t) {
            return 1 - 2 * Math.abs(t - 0.5);
          });
          
        // }, null, this);
        
        
        
      }

      //Once the smell key is not being pressed the smell should start dissapearing
      if(!keyS.isDown && smellUse){
        smellUse = false;
        this.blackScreen.alpha = 0;
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
    this.physics.collide(this.prey, this.treeGroup);
    this.physics.collide(this.player, this.logGroup);
    this.physics.collide(this.prey, this.logGroup);
    this.physics.collide(this.player, this.cabin);
    this.physics.collide(this.prey, this.cabin);

    //Boundaries for player
    this.physics.collide(this.player, this.rightBoundary1);
    this.physics.collide(this.player, this.rightBoundary2);
    this.physics.collide(this.player, this.upperBoundary1);
    this.physics.collide(this.player, this.upperBoundary2);
    this.physics.collide(this.player, this.leftBoundary1);
    this.physics.collide(this.player, this.leftBoundary2);
    this.physics.collide(this.player, this.downBoundary1);
    //boundaries for prey
    this.physics.collide(this.prey, this.rightBoundary1);
    this.physics.collide(this.prey, this.rightBoundary2);
    this.physics.collide(this.prey, this.upperBoundary1);
    this.physics.collide(this.prey, this.upperBoundary2);
    this.physics.collide(this.prey, this.leftBoundary1);
    this.physics.collide(this.prey, this.leftBoundary2);
    this.physics.collide(this.prey, this.downBoundary1);
    

    // walking sounds
    if(playerMoving == true && this.walking.isPlaying == false) {
      this.walking.play();
    }
    
  }
}