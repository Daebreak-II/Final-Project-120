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
      this.load.image('sizzle', './Assets/sprites/sizzleSprite2.png');
      this.load.image('smell', './Assets/sprites/scentSprite.png');
      this.load.image('darkOverlay', './Assets/sprites/darknessOverlay.png');
      this.load.image('cabin', './Assets/sprites/cabinSprite.png');
      this.load.image('river', './Assets/sprites/riverSprite.png');
      this.load.image('rock', './Assets/sprites/rockSprite.png');
      this.load.image('tent', './Assets/sprites/tentSprite.png');      
      
      // load audio
      this.load.audio('scream1', './Assets/sfx/scream_1.mp3');
      this.load.audio('scream2', './Assets/sfx/scream_2.mp3');
      this.load.audio('sizzling', './Assets/sfx/sizzling.wav');
      this.load.audio('monsterScreech', './Assets/sfx/monsterScreech.wav');
      this.load.audio('music', './Assets/sfx/ambient_music.wav');
      this.load.audio('walking', './Assets/sfx/Walking.wav');
      this.load.audio('smelling', './Assets/sfx/smelling.wav');
      this.load.audio('preyWalking', './Assets/sfx/prey_walking.wav');

      //load animations
      this.load.atlas('playerAnim', './Assets/animations/playerAnimations-0.png', './Assets/animations/playerAnimations.json');
      this.load.atlas('preyAnim', './Assets/animations/preyAnimations.png', './Assets/animations/preyAnimations.json');
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

        // creating Animations
        this.anims.create({
          key: 'walkRight',
          frames: this.anims.generateFrameNames('playerAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'playerR',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'walkLeft',
          frames: this.anims.generateFrameNames('playerAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'playerL',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'walkUp',
          frames: this.anims.generateFrameNames('playerAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'playerUP',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'walkDown',
          frames: this.anims.generateFrameNames('playerAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'playerU',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });


        this.anims.create({
          key: 'fleeRight',
          frames: this.anims.generateFrameNames('preyAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'preyR',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'fleeLeft',
          frames: this.anims.generateFrameNames('preyAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'preyL',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'fleeDown',
          frames: this.anims.generateFrameNames('preyAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'preyU',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'fleeUp',
          frames: this.anims.generateFrameNames('preyAnim', {
            start: 1,
            end: 4,
            zeroPad: 1,
            prefix: 'preyUP',
            suffix: '.png'
          }),
          frameRate: 8,
          repeat: -1
        });

        // initialize graphics
        this.graphics = this.add.graphics();
      
        // add background
        // this.gameMap = this.add.tilemap('gameMap');
        // this.ground = this.gameMap.addTilesetImage('Tree', 'smallTree');
        //this.jsonBackgroun = this.gameMap.createLayer("Background", this.ground, 0, 0);
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'ground').setOrigin(0, 0);
        this.river1 = this.add.image(gameWidth/2, gameHeight/2 + 600, 'river').setScale(2, 0.7);
        this.border = this.add.image(0, 0, 'border').setOrigin(0,0);

        // add overlays
        this.overlay = this.add.image(0, 0, 'darkOverlay').setOrigin(0.5, 0.5);
        this.overlay.setScale(1.1);
        this.overlay.setAlpha(1);
        this.overlay.depth = 4;

        this.blackScreen = this.add.rectangle(0, 0, game.config.width * 1.1, game.config.height * 1.1, 0x000000);
        this.blackScreen.alpha = 0;

        this.daylight = this.add.rectangle(0, 0, game.config.width * 1.1, game.config.height * 1.1, 0xFFFFFF).setOrigin(0.5, 0.5);
        this.daylight.setAlpha(0);
        this.daylight.setAngle(45);
        this.daylightPositionX = 0;
        this.daylightPositionY = 0;
        // this.daylight = new Phaser.Geom.Rectangle(0, 0, game.config.width * 1.1, game.config.height * 1.1);
        // this.daylight.depth = 5;
        // this.graphics.fillGradientStyle(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 1);
        // this.graphics.fillRect(0, 0, game.config.width * 1.1, game.config.height * 1.1);
        // this.graphics.fillRectShape(this.daylight);

        //adding the boundary hitboxes of the map 

        this.leftBoundary1 = this.add.rectangle(0, 0, 1500, gameHeight*1500);
        this.leftBoundary2 = this.add.rectangle(500 , gameHeight / 2 * 2 + 800, 1500, gameHeight);
        this.upperBoundary1 = this.add.rectangle(0, 0, gameWidth - 800, 1800);
        this.upperBoundary2 = this.add.rectangle(gameWidth/2, 0, gameWidth - 800, 800);
        this.rightBoundary1 = this.add.rectangle(gameWidth - 800, 0, 1200, gameHeight+600);
        this.rightBoundary2 = this.add.rectangle(gameWidth, gameHeight/2, 800, gameHeight+600);
        this.downBoundary1 = this.add.rectangle(0, gameHeight, gameWidth * 2, 1500);
        
        //Adding the physics for said boundaries
        
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
          this.tree.setSize(200, 350);
          this.tree.setOffset(580, 2060); // needs to be changed for proper scaling
          this.tree.body.immovable = true;
          this.tree.body.moves = false;
          if(this.physics.collide(this.tree, this.cabin)) {
            this.tree.destroy();
          }

        }
        this.treeGroup.setOrigin(0.5, 0.5);
        // this.treeGroup.rotate(Phaser.Math.Between(-2, 2) * Math.PI / 180);
        this.treeGroup.scaleXY(-0.8); // this ADDS to the scale, so to scale down we need to subtract
        // this.treeGroup.setAlpha(0);

        
        this.logGroup = this.physics.add.group();
        this.logGroup.runChildUpdate = true;
        for(let i = 0; i < 50; i++) {
          this.log = this.logGroup.create(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'log').setScale(0.2);
          this.log.body.immovable = true;
          this.log.body.moves = false;
          // setAngle(Phaser.Math.Between(-5, 5))
        }
        // this.logGroup.setAlpha(0);

        this.rockGroup = this.physics.add.group();
        this.rockGroup.runChildUpdate = true;
        for(let i = 0; i < 4; i++) {
          this.rock = this.rockGroup.create(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'rock').setScale(0.7);
          this.rock.setSize(680, 100);
          this.rock.setOffset(0, 100);
          this.rock.body.immovable = true;
          this.rock.body.moves = false;
          // setAngle(Phaser.Math.Between(-5, 5))
        }

        // adding in moving objects
        this.player = new Player(this, gameWidth/2, gameHeight/2, 'playerAnim', 0).setOrigin(0.5, 0.5);
        this.player.setScale(playerScale * 3);
        this.player.setSize(this.player.width * 0.45, this.player.height * 0.6);
        this.player.setFrame('playerR4.png');

        this.prey = new Prey(this, Phaser.Math.Between(gameWidth * 0.2, gameWidth * 0.8), Phaser.Math.Between(gameHeight * 0.2, gameHeight * 0.8), 'preyAnim', 0).setOrigin(0.5, 0.5);
        this.prey.setScale(0.2);
        this.prey.setSize(this.prey.width, this.prey.height);

        // set up camera
        this.cameras.main.setSize(1200, 800);
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(this.player);

        //adding boundaries
        this.physics.world.bounds.setTo(0, 0, gameWidth, gameHeight);
        this.player.body.collideWorldBounds = true;
        this.prey.body.collideWorldBounds = true;

        // play music/sfx
        this.ambientMusic = this.sound.add('music', { volume: 1 * volumeMultiplier, loop: true });
        this.ambientMusic.play();

        this.playerWalking = this.sound.add('walking', { volume: 0.1 * volumeMultiplier, loop: false});
        this.playerWalking.setRate(0.75);

        this.preyWalking = this.sound.add('preyWalking', { volume: 0.5 * volumeMultiplier, loop: true});
        this.preyWalking.setRate(1);
        this.preyWalking.play();
        this.preyWalking.pause();

        this.smellSound = this.sound.add('smelling', { volume: 1 * volumeMultiplier, loop: false});

        this.screech = this.sound.add('monsterScreech', { volume: 1 * volumeMultiplier, loop: false});

        this.sizzling = this.sound.add('sizzling', { volume: 1 * volumeMultiplier, loop: true});

        

        // Particles
        this.fogEmitZone = new Phaser.Geom.Rectangle(this.player.x, this.player.y, game.config.width, game.config.height);
        this.sizzleEmitZone = new Phaser.Geom.Rectangle(0, 0, this.player.width * 0.2, this.player.height * 0.2);
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
        this.sizzleParticles = this.add.particles('sizzle');
        this.smellParticles = this.add.particles('smell');
        this.smellParticles.setDepth(5);


        // this.sizzleEmitter1 = this.sizzleParticle1.createEmitter({
        //   speed: { min: -10, max: 10 },
        //   lifespan: 10000,
        //   quantity: 1,
        //   frequency: 5000,
        //   scale: { min: 2 , max: 4 },
        //   alpha: { start: 0, end: 0.8 },
        //   blendMode: 'ADD',
        //   emitZone: { source: this.fogEmitZone },
        //   on: false,
        //   deathzone: {type:  'onEnter', source: superDeathZone },
        // });
        // this.sizzleEmitter2 = this.sizzleParticle2.createEmitter({
        //   speed: { min: -10, max: 10 },
        //   lifespan: 10000,
        //   quantity: 1,
        //   frequency: 5000,
        //   scale: { min: 2 , max: 4 },
        //   alpha: { start: 0, end: 0.8 },
        //   blendMode: 'ADD',
        //   emitZone: { source: this.fogEmitZone },
        //   on: false,
        //   deathzone: {type:  'onEnter', source: superDeathZone },
        // });
        // this.sizzleEmitter3 = this.sizzleParticle3.createEmitter({
        //   speed: { min: -10, max: 10 },
        //   lifespan: 10000,
        //   quantity: 1,
        //   frequency: 5000,
        //   scale: { min: 2 , max: 4 },
        //   alpha: { start: 0, end: 0.8 },
        //   blendMode: 'ADD',
        //   emitZone: { source: this.fogEmitZone },
        //   on: false,
        //   deathzone: {type:  'onEnter', source: superDeathZone },
        // });
        // this.sizzleEmitter4 = this.sizzleParticle4.createEmitter({
        //   speed: { min: -10, max: 10 },
        //   lifespan: 10000,
        //   quantity: 1,
        //   frequency: 5000,
        //   scale: { min: 2 , max: 4 },
        //   alpha: { start: 0, end: 0.8 },
        //   blendMode: 'ADD',
        //   emitZone: { source: this.fogEmitZone },
        //   on: false,
        //   deathzone: {type:  'onEnter', source: superDeathZone },
        // });

        this.sizzleEmitter = this.sizzleParticles.createEmitter({
          speed: { min: -10, max: 10 },
          lifespan: 2000,
          quantity: 1,
          frequency: 700,
          scale: { min: 0.1 , max: 0.3 },
          alpha: { start: 0.8, end: 0 },
          blendMode: 'ADD',
          emitZone: { source: this.sizzleEmitZone },
          on: false,
        });

        // problem: as the line gets shorter, the particles get more concentrated because
        // the spawn area is reduced. Actually maybe not a problem?
        this.smellEmitter = this.smellParticles.createEmitter({
          speed: { min: -5, max: 5 },
          lifespan: { min: 1000, max: 1500 },
          rotate: { min: -90, max: 90 },
          quantity: 1,
          frequency: 20,
          scale: 0.01,
          alpha: { start: 1, end: 0 },
          blendMode: 'ADD',
          on: false,
          emitZone: { type: 'random', source: this.smellLine}, 
        });
        
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

        this.timeRemain = 60000;
        this.clock = this.time.delayedCall(40000, () => {
          this.sizzling.play();
          this.sizzleEmitter.start();
        }, null, this);
        
      }

    update(time, delta) {
      //checking if timer is done
      this.timeRemain -= delta;
      if(this.timeRemain <= 0){
        timesUP = true;
        this.ambientMusic.stop();
        this.playerWalking.stop();
        this.preyWalking.stop();
        this.sizzling.stop()
        moving = false;
        movingAway = false;
        echoCooldown = false;
        smellUse = false;
        this.screech.play();
        this.scene.start('gameOverScene');
      }

      

      // updating objects
      this.player.update();
      this.prey.update();
      // updating overlays
      this.overlay.x = this.player.x;
      this.overlay.y = this.player.y;

      this.blackScreen.x = this.player.x;
      this.blackScreen.y = this.player.y;

      this.daylightPositionX += game.config.width / 60000;
      this.daylightPositionY += game.config.height / 60000;
      this.daylight.x = this.player.x + this.daylightPosition;
      this.daylight.y = this.player.y - this.daylightPosition;

      // updating emitters
      this.fogEmitZone.x = this.player.x - game.config.width / 2;
      this.fogEmitZone.y = this.player.y - game.config.height / 2;
      // this.fogEmitter1.setAlpha(function (p, k, t) {
      //   return 1 - 2 * Math.abs(t - 0.5);
      // });
      // this.fogEmitter2.setAlpha(function (p, k, t) {
      //   return 1 - 2 * Math.abs(t - 0.5);
      // });
      // this.fogEmitter3.setAlpha(function (p, k, t) {
      //   return 1 - 2 * Math.abs(t - 0.5);
      // });
      // this.fogEmitter4.setAlpha(function (p, k, t) {
      //   return 1 - 2 * Math.abs(t - 0.5);
      // });
    
      this.sizzleEmitZone.x = this.player.x - this.player.width * 0.1;
      this.sizzleEmitZone.y = this.player.y - this.player.height * 0.1;

      this.smellLine.setTo(this.player.x, this.player.y, this.prey.x, this.prey.y);
      this.deathZone.x = this.player.x;
      this.deathZone.y = this.player.y;

      var preyDistance = Phaser.Math.Distance.BetweenPoints(this.player, this.prey);

      this.graphics.clear();

      // option to restart
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.ambientMusic.stop();
        this.playerWalking.stop();
        this.preyWalking.stop();
        this.sizzling.stop();
        moving = false;
        movingAway = false;
        echoUse = false;
        smellUse = false;
        smellCooldown = false;
        echoCooldown = false;

        this.scene.start('menuScene');
      }

      // echolocation Mechanic
      if (Phaser.Input.Keyboard.JustDown(keySPACE) && !echoCooldown && !smellCooldown) {
        echoUse = true; 
        echoCooldown = true;
        this.playerWalking.setRate(this.playerWalking.rate / 1.1);
        for (var i = 0; i < 50; i++) {
          this.clock = this.time.delayedCall(i * 20, () => {
            this.overlay.setScale(this.overlay.scale + 0.01);
            this.overlay.setAlpha(this.overlay.alpha - 0.01);
            // groups don't have alphas, so cabin alpha is substituting 
            // for other current alphas cause they're equal here
            // this.treeGroup.setAlpha(this.cabin.alpha + 0.02);
            // this.logGroup.setAlpha(this.cabin.alpha + 0.02);
            // this.rockGroup.setAlpha(this.cabin.alpha + 0.02);
            // this.cabin.setAlpha(this.cabin.alpha + 0.02);
            // this.border.setAlpha(this.border.alpha + 0.02);
          }, null, this);
        }

        this.clock = this.time.delayedCall(2000, () => {
          echoUse = false;
          this.playerWalking.setRate(this.playerWalking.rate * 1.1);
        }, null, this);

        for (var i = 0; i < 50; i++) {
          this.clock = this.time.delayedCall(i * 20 + 2000, () => {
            this.overlay.setScale(this.overlay.scale - 0.01);
            this.overlay.setAlpha(this.overlay.alpha + 0.01);

            // this.treeGroup.setAlpha(this.cabin.alpha - 0.02);
            // this.logGroup.setAlpha(this.cabin.alpha - 0.02);
            // this.rockGroup.setAlpha(this.cabin.alpha - 0.02);
            // this.cabin.setAlpha(this.cabin.alpha - 0.02);
            // this.border.setAlpha(this.border.alpha - 0.02);
          }, null, this);
        }

        this.clock = this.time.delayedCall(3000, () => {
          echoCooldown = false;
        }, null, this);
      }

      // Smell mechanic
      if(Phaser.Input.Keyboard.JustDown(keyS) && !smellCooldown && !echoCooldown){
        smellUse = true;
        smellCooldown = true;
        this.smellEmitter.start();
        this.blackScreen.alpha = 0.5;
        this.smellSound.play();
        this.playerWalking.setRate(this.playerWalking.rate / 1.1);        
      }

      //Once the smell key is not being pressed the smell should start dissapearing
      if(!keyS.isDown && smellUse){
        smellUse = false;
        this.blackScreen.alpha = 0;
        this.smellEmitter.stop();
        this.playerWalking.setRate(this.playerWalking.rate * 1.1);
        
        this.clock = this.time.delayedCall(500, () => {
          smellCooldown = false
        }, null, this);
      }


      //Prey's movement
      if(!moving && !movingAway) {
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

      this.prey.setVelocityX(Phaser.Math.Between(-500, 500));
      this.prey.setVelocityY(Phaser.Math.Between(-500, 500));

      this.clock = this.time.delayedCall(4000, () => {
        moving = false;
      }, null, this);
      }

      
      if(preyDistance <= 250){
        if(!movingAway) {
          movingAway = true;
          //moving = true;
          // if player is on the left makes the prey move to the right faster
          if (this.player.x < this.prey.x && this.prey.body.velocity.x >= 0) {
            // move prey to the right
            this.prey.body.velocity.x = 480;
          }
          // if player is on the right makes the prey move to the left faster
          if (this.player.x > this.prey.x && this.prey.body.velocity.x <= 0) {
            // move prey to left
            this.prey.body.velocity.x -= 480;
          }
          // if player is on the bottom makes the prey moves up faster
          if (this.player.y < this.prey.y && this.prey.body.velocity.y >= 0) {
            // move prey up
            this.prey.body.velocity.y = 480;
          }
          // if player is on the top prey moves downward faster
          if (this.player.y > this.prey.y && this.prey.body.velocity.y <= 0) {
            // move prey downward
            this.prey.body.velocity.y -= 480;
          }
    

          this.clock = this.time.delayedCall(50, () => {
            movingAway = false;
          }, null, this);
        }
      }



      //if prey is on the boudanries move them to either direction depending on the boundary

      //upper boundaries bounces prey diagonally down
      if(this.physics.collide(this.prey, this.upperBoundary1) || this.physics.collide(this.prey, this.upperBoundary2)){
        let changeDirection = Phaser.Math.Between(1, 2);
        if(changeDirection <= 1) {
          this.prey.setVelocityX(500);
          this.prey.setVelocityY(500);
        } else if(changeDirection <= 2) {
          this.prey.setVelocityX(-500);
          this.prey.setVelocityY(500);
        }

      }
      //left boundary bounces prey diagonally right
      if(this.physics.collide(this.prey, this.leftBoundary1) || this.physics.collide(this.prey, this.leftBoundary2)){
        let changeDirection = Phaser.Math.Between(1, 2);
        if(changeDirection <= 1) {
          this.prey.setVelocityX(500);
          this.prey.setVelocityY(-500);
        } else if(changeDirection <= 2) {
          this.prey.setVelocityX(500);
          this.prey.setVelocityY(500);
        }

      }
      //right boundaries bounces prey diagonally left 
      if(this.physics.collide(this.prey, this.rightBoundary1) || this.physics.collide(this.prey,this.rightBoundary2)){
        let changeDirection = Phaser.Math.Between(1, 2);
        if(changeDirection <= 1) {
          this.prey.setVelocityX(-500);
          this.prey.setVelocityY(-500);
        } else if(changeDirection <= 2) {
          this.prey.setVelocityX(-500);
          this.prey.setVelocityY(500);
        }

      }
      //down boundary bounces prey up diagonally
      if(this.physics.collide(this.prey, this.downBoundary1)){
        let changeDirection = Phaser.Math.Between(1, 2);
        if(changeDirection <= 1) {
          this.prey.setVelocityX(500);
          this.prey.setVelocityY(-500);
        } else if(changeDirection <= 2) {
          this.prey.setVelocityX(-500);
          this.prey.setVelocityY(-500);
        }

      }
      
      if(this.physics.collide(this.prey, this.treeGroup)){
        this.prey.body.bounce.x = 1;
        this.prey.body.bounce.x = 1;
      }

      // animation handling based on highest directional velocity of prey
      if (Math.abs(this.prey.body.velocity.x) >= Math.abs(this.prey.body.velocity.y)) {
        if (this.prey.body.velocity.x >= 0) {
          // highest vel is right
          if (this.prey.anims.getName() != 'fleeRight') {
            this.prey.play('fleeRight');
          }
        } else {
          // highest vel is left
          if (this.prey.anims.getName() != 'fleeLeft') {
            this.prey.play('fleeLeft');
          }
        }
      } else {
        if (this.prey.body.velocity.y >= 0) {
          // highest vel is down
          if (this.prey.anims.getName() != 'fleeDown') {
            this.prey.play('fleeDown');
          }
        } else {
          // highest vel is up
          if (this.prey.anims.getName() != 'fleeUp') {
            this.prey.play('fleeUp');
          }
        }
      }

    // collisions 
    if(this.physics.collide(this.player, this.prey)) {
      //let i = Phaser.Math.Between(1, 2);
      //if(i == 1) {
        //this.sound.play('scream1', { volume: 1 * volumeMultiplier});
      //} else {
      // this.sound.play('scream2', { volume: 1 * volumeMultiplier});
      
      this.ambientMusic.stop();
      this.playerWalking.stop();
      this.preyWalking.stop();
      this.sizzling.stop();
      moving = false;
      movingAway = false;
      echoUse = false;
      smellUse = false;
      smellCooldown = false;
      echoCooldown = false;
      this.scene.start('gameOverScene');
    }

    //making ob fade in when touching them and then fading them out when you are not    
    // if(this.physics.collide(this.player, this.treeGroup) || this.physics.collide(this.player, this.logGroup) || this.physics.collide(this.player, this.rockGroup) || this.physics.collide(this.player, this.cabin)){
    //   //fadeVariable = true;
    //   for (var i = 0; i < 50; i++) {
    //     this.clock = this.time.delayedCall(i * 20, () => {
    //       // groups don't have alphas, so cabin alpha is substituting 
    //       // for other current alphas cause they're equal here
    //       this.treeGroup.setAlpha(this.cabin.alpha + 0.02);
    //       this.logGroup.setAlpha(this.cabin.alpha + 0.02);
    //       this.rockGroup.setAlpha(this.cabin.alpha + 0.02);
    //       this.cabin.setAlpha(this.cabin.alpha + 0.02);
    //     }, null, this);
    //   }

    //   for (var i = 0; i < 50; i++) {
    //     this.clock = this.time.delayedCall(i * 20 + 2000, () => {
    //       this.treeGroup.setAlpha(this.cabin.alpha - 0.02);
    //       this.logGroup.setAlpha(this.cabin.alpha - 0.02);
    //       this.rockGroup.setAlpha(this.cabin.alpha - 0.02);
    //       this.cabin.setAlpha(this.cabin.alpha - 0.02);
    //     }, null, this);
    //   }
    //   //fadeVariable = false;
    // }
    // if(!this.physics.collide(this.player, this.treeGroup) || !this.physics.collide(this.player, this.logGroup) || !this.physics.collide(this.player, this.rockGroup) || !this.physics.collide(this.player, this.cabin)){
    //   //fadeVariable = false;
    //   for (var i = 0; i < 50; i++) {
    //     this.clock = this.time.delayedCall(i * 20 + 2000, () => {
    //       this.treeGroup.setAlpha(this.cabin.alpha - 0.02);
    //       this.logGroup.setAlpha(this.cabin.alpha - 0.02);
    //       this.rockGroup.setAlpha(this.cabin.alpha - 0.02);
    //       this.cabin.setAlpha(this.cabin.alpha - 0.02);
    //     }, null, this);
    //   }
    //   //fadeVariable = true;
    // }
    
    

    this.physics.collide(this.player, this.treeGroup);
    this.physics.collide(this.prey, this.treeGroup);
    this.physics.collide(this.player, this.logGroup);
    this.physics.collide(this.prey, this.logGroup);
    this.physics.collide(this.player, this.rockGroup);
    this.physics.collide(this.prey, this.rockGroup);
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
    // repeating single step
    if(playerMoving && !this.playerWalking.isPlaying) {
      this.playerWalking.play();
    }


    // turning on/off multiple step recording
    if(preyDistance <= 4000){
      this.preyWalking.setVolume((4000 - preyDistance) / 40000  * volumeMultiplier);
      this.preyWalking.resume();
    } else {
      this.preyWalking.pause();
    }
    
  }
}