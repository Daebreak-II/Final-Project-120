class Tutorial extends Phaser.Scene {
    constructor() {
      super("tutorialScene");
    }
    

    preload() {
      // load sprites
      
      this.load.image('player', './Assets/sprites/playerSprite.png');
      this.load.image('prey', './Assets/sprites/preySprite.png');
      this.load.image('tree', './Assets/sprites/treeSprite.png');
      this.load.image('log', './Assets/sprites/logSprite.png');
      this.load.image('border', './Assets/sprites/border.png');
      this.load.image('grounded', './Assets/sprites/ground.png');
      this.load.image('smell', './Assets/sprites/scentSprite.png');
      this.load.image('fogOverlay', './Assets/sprites/fogOverlay.png');
      this.load.image('cabin', './Assets/sprites/cabinSprite.png');
      this.load.image('river', './Assets/sprites/riverSprite.png');
      this.load.image('rock', './Assets/sprites/rockSprite.png');

      
      
      // load audio
      this.load.audio('scream1', './Assets/sfx/scream_1.mp3');
      this.load.audio('scream2', './Assets/sfx/scream_2.mp3');
      this.load.audio('music', './Assets/sfx/ambient_music.wav');
      this.load.audio('walking', './Assets/sfx/Walking.wav');
      this.load.audio('smelling', './Assets/sfx/smelling.wav');
      this.load.audio('preyWalking', './Assets/sfx/prey_walking.wav');

      //load animations
      this.load.atlas('playerAnim', './Assets/animations/playerAnimations-0.png', './Assets/animations/playerAnimations.json')
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
          frames: [{
            key: 'playerAnim',
            frame: 'playerR1.png'
          }, {
            key: 'playerAnim',
            frame: 'playerR2.png'
          }, {
            key: 'playerAnim',
            frame: 'playerR3.png'
          }, {
            key: 'playerAnim',
            frame: 'playerR4.png'
          }, ],
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'walkLeft',
          frames: [{
            key: 'playerAnim',
            frame: 'playerL1.png'
          }, {
            key: 'playerAnim',
            frame: 'playerL2.png'
          }, {
            key: 'playerAnim',
            frame: 'playerL3.png'
          }, {
            key: 'playerAnim',
            frame: 'playerL4.png'
          }, ],
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'walkDown',
          frames: [{
            key: 'playerAnim',
            frame: 'playerU1.png'
          }, {
            key: 'playerAnim',
            frame: 'playerU2.png'
          }, {
            key: 'playerAnim',
            frame: 'playerU3.png'
          }, {
            key: 'playerAnim',
            frame: 'playerU4.png'
          }, ],
          frameRate: 8,
          repeat: -1
        });
      
        // add background
        // this.gameMap = this.add.tilemap('gameMap');
        // this.ground = this.gameMap.addTilesetImage('Tree', 'smallTree');
        //this.jsonBackgroun = this.gameMap.createLayer("Background", this.ground, 0, 0);
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'grounded').setOrigin(0, 0);
        this.background.setScale(2);
        //this.river1 = this.add.image(gameWidth/2, gameHeight/2 + 600, 'river').setScale(2, 0.7);
        this.border = this.add.image(0, 0, 'border').setOrigin(0,0).setAlpha(0);

        // add overlay
        this.overlay = this.add.image(0, 0, 'fogOverlay').setOrigin(0.5, 0.5);
        this.overlay.setScale(1.1);
        this.overlay.setAlpha(1);
        this.overlay.depth = 4; // temporary, need a way to bring to absolute top


        this.cabin = this.physics.add.image(gameWidth / 2 - 400, gameHeight/2 - 800,'cabin');        
        this.cabin.setScale(0.5);
        this.cabin.setSize(1000, 1500);
        this.cabin.setOffset(130, 610);
        this.cabin.setOrigin(0.5,0);
        this.cabin.flipX = true;
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
        this.treeGroup.setAlpha(0);

        
        this.logGroup = this.physics.add.group();
        this.logGroup.runChildUpdate = true;
        for(let i = 0; i < 50; i++) {
          this.log = this.logGroup.create(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'log').setScale(0.2);
          this.log.body.immovable = true;
          this.log.body.moves = false;
          // setAngle(Phaser.Math.Between(-5, 5))
        }
        this.logGroup.setAlpha(0);

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
        this.rockGroup.setAlpha(0);

        // adding in moving objects
        this.player = new Player(this, gameWidth/2, gameHeight/2, 'playerAnim', 0).setOrigin(0.5, 0.5);
        this.player.setScale(playerScale * 3);
        this.player.setSize(this.player.width * 0.9, this.player.height * 0.8);
        this.player.setFrame('playerR4.png');

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
          frequency: 2500,
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
          frequency: 2500,
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
          frequency: 2500,
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
          frequency: 2500,
          scale: { min: 2 , max: 4 },
          alpha: { start: 0, end: 0.8 },
          blendMode: 'ADD',
          emitZone: { source: this.fogEmitZone },
          on: false,
          deathzone: {type:  'onEnter', source: superDeathZone },
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



        this.graphics = this.add.graphics(); // what does this do Juan?
        
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
        this.daylight = this.add.circle(gameWidth/2, gameHeight + 4500, 5000, 0xFFFFFF);
        this.daylight.setAlpha(0.2);
        this.timeRemain = 60000;
        
      }

    update(time, delta) {
      //checking if timer is done
      this.timeRemain -= delta;
      if(this.timeRemain <= 0){
        timesUP = true;
        this.ambientMusic.stop();
        this.playerWalking.stop();
        this.preyWalking.stop();
        moving = false;
        movingAway = false;
        echoCooldown = false;
        smellUse = false;
        this.scene.start('gameOverScene');
      }

      this.clock = this.time.delayedCall(1000, () => {
        this.daylight.y -= 1.2;
      }, null, this);

      // updating objects
      this.player.update();
      this.prey.update();
      // updating overlay
      this.overlay.x = this.player.x;
      this.overlay.y = this.player.y;

      this.fogEmitZone.x = this.player.x - game.config.width / 2;
      this.fogEmitZone.y = this.player.y - game.config.height / 2;

      this.blackScreen.x = this.player.x;
      this.blackScreen.y = this.player.y;

    
      this.emitZone.x = this.player.x - 3600 / 2;
      this.emitZone.y = this.player.y - 2400 / 2;

      this.deathZone.x = this.player.x;
      this.deathZone.y = this.player.y;

      this.smellLine.setTo(this.player.x, this.player.y, this.prey.x, this.prey.y);
      var preyDistance = Phaser.Math.Distance.BetweenPoints(this.player, this.prey);

      this.graphics.clear();

      // option to restart
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.ambientMusic.stop();
        this.playerWalking.stop();
        this.preyWalking.stop();
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
            this.treeGroup.setAlpha(this.cabin.alpha + 0.02);
            this.logGroup.setAlpha(this.cabin.alpha + 0.02);
            this.rockGroup.setAlpha(this.cabin.alpha + 0.02);
            this.cabin.setAlpha(this.cabin.alpha + 0.02);
            this.border.setAlpha(this.border.alpha + 0.02);
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

            this.treeGroup.setAlpha(this.cabin.alpha - 0.02);
            this.logGroup.setAlpha(this.cabin.alpha - 0.02);
            this.rockGroup.setAlpha(this.cabin.alpha - 0.02);
            this.cabin.setAlpha(this.cabin.alpha - 0.02);
            this.border.setAlpha(this.border.alpha - 0.02);
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
        this.blackScreen.alpha = 0.8;
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

    // collisions 
    if(this.physics.collide(this.player, this.prey)) {
      //let i = Phaser.Math.Between(1, 2);
      //if(i == 1) {
        //this.sound.play('scream1', { volume: 1 * volumeMultiplier});
      //} else {
      this.sound.play('scream2', { volume: 1 * volumeMultiplier});
      
      this.ambientMusic.stop();
      this.playerWalking.stop();
      this.preyWalking.stop();
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