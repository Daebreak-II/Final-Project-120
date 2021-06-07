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
      this.load.image('fogOverlay', './Assets/sprites/darknessOverlay.png');
      this.load.image('cabin', './Assets/sprites/cabinSprite.png');
      this.load.image('river', './Assets/sprites/riverSprite.png');
      this.load.image('rock', './Assets/sprites/rockSprite.png');
      this.load.image('bridge', './Assets/sprites/bridgeSprite.png');

      
      
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
        
        

        // add overlay
        this.overlay = this.add.image(0, 0, 'fogOverlay').setOrigin(0.5, 0.5);
        this.overlay.setScale(1.1);
        this.overlay.setAlpha(1);
        this.overlay.depth = 4; // temporary, need a way to bring to absolute top


        this.cabin = this.physics.add.image(gameWidth / 2 - 300, gameHeight/2 - 800,'cabin');        
        this.cabin.setScale(0.5);
        this.cabin.setSize(1000, 1500);
        this.cabin.setOffset(130, 610);
        this.cabin.setOrigin(0.5,0);
        this.cabin.setAlpha(1);
        this.cabin.flipX = true;
        this.cabin.body.immovable = true;
        this.cabin.body.moves = false;

        

        

        
        
        this.logGroup = this.physics.add.group();
        this.logGroup.runChildUpdate = true;

        //Logs for the upper side
        this.log1 = this.logGroup.create(gameWidth/2, gameHeight/2-500, 'log').setScale(1, 1);
        this.log1.body.immovable = true;
        this.log1.body.moves = false;

        this.log2 = this.logGroup.create(gameWidth/2 + 1245, gameHeight/2-500, 'log').setScale(1, 1);
        this.log2.body.immovable = true;
        this.log2.body.moves = false;

        this.log3 = this.logGroup.create(gameWidth/2 + 2490, gameHeight/2-500, 'log').setScale(1, 1);
        this.log3.body.immovable = true;
        this.log3.body.moves = false;

        this.log4 = this.logGroup.create(gameWidth/2 + 3735, gameHeight/2-500, 'log').setScale(1, 1);
        this.log4.body.immovable = true;
        this.log4.body.moves = false;

        //logs for the lower side
        this.log5 = this.logGroup.create(gameWidth/2, gameHeight/2+400, 'log').setScale(1, 1);
        this.log5.body.immovable = true;
        this.log5.body.moves = false;

        this.log6 = this.logGroup.create(gameWidth/2 + 1245, gameHeight/2+400, 'log').setScale(1, 1);
        this.log6.body.immovable = true;
        this.log6.body.moves = false;

        this.log7 = this.logGroup.create(gameWidth/2 + 2490, gameHeight/2+400, 'log').setScale(1, 1);
        this.log7.body.immovable = true;
        this.log7.body.moves = false;

        this.log7 = this.logGroup.create(gameWidth/2 + 3735, gameHeight/2+400, 'log').setScale(1, 1);
        this.log7.body.immovable = true;
        this.log7.body.moves = false;
        //this.logGroup.setAlpha(0);

        this.river1 = this.add.image(gameWidth/2 + 3500, gameHeight/2, 'river').setScale(2, 0.7);
        this.river1.setAngle(100);
        this.bridge = this.add.image(gameWidth/2 + 3500, gameHeight/2 - 25, 'bridge').setScale(1, 0.7);
        this.bridge.setAngle(-75);
        this.border = this.add.image(1400, 0, 'border').setOrigin(0,0);

        for(let i = 0; i < 200; i++) {
          // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
          this.tree = this.add.sprite(Phaser.Math.Between(0, gameWidth - 850), Phaser.Math.Between(gameHeight/2 + 300, gameHeight/2 + 400), 'tree').setScale(0.2);
        }
        for(let i = 0; i < 200; i++) {
            // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
           this.tree2 = this.add.sprite(Phaser.Math.Between(0, gameWidth - 850), Phaser.Math.Between(gameHeight/2 - 650, gameHeight/2 - 700), 'tree').setScale(0.2);
        }
        for(let i = 0; i < 200; i++) {
            // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
           this.tree3 = this.add.sprite(Phaser.Math.Between(gameWidth/2 - 800, gameWidth/2-700), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2);
        }

        this.rockGroup = this.physics.add.group();
        this.rockGroup.runChildUpdate = true;
        this.rockGroup.setAlpha(0);

        // adding in moving objects
        this.player = new Player(this, gameWidth/2, gameHeight/2, 'playerAnim', 0).setOrigin(0.5, 0.5);
        this.player.setScale(playerScale * 3);
        this.player.setSize(this.player.width * 0.9, this.player.height * 0.8);
        this.player.setFrame('playerR4.png');

        this.prey = new Prey(this, gameWidth/2 + 2500, gameHeight/2, 'prey', 0).setOrigin(0.5, 0.5);
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
        this.emitZone = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        this.smellLine = new Phaser.Geom.Line(this.player.x, this.player.y, this.prey.x, this.prey.y);
        this.smellParticles = this.add.particles('smell');
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
          fontSize: '36px',
          color: '#FFFFFF',
          align: 'center',
          padding: {
              top: 5,
              bottom: 5,
          },
          Width: 0
        }

        //Tutorial Messages
        this.leftBoundary1 = this.add.rectangle(gameWidth/2 + 200, gameHeight/2 - 50, 100, 700);
        this.physics.add.existing(this.leftBoundary1);
        this.leftBoundary1.body.immovable = false;
        this.leftBoundary1.body.moves = false;

        this.leftBoundary2 = this.add.rectangle(gameWidth/2 + 1500, gameHeight/2 - 50, 100, 700);
        this.physics.add.existing(this.leftBoundary2);
        this.leftBoundary2.body.immovable = false;
        this.leftBoundary2.body.moves = false;

        this.leftBoundary3 = this.add.rectangle(gameWidth/2 + 3200, gameHeight/2 - 50, 100, 700);
        this.physics.add.existing(this.leftBoundary3);
        this.leftBoundary3.body.immovable = false;
        this.leftBoundary3.body.moves = false;
        
        this.explain1 = this.add.text(gameWidth/2 + 200, gameHeight/2 + 200, 'Press Space to see better in the darkness', textConfig).setOrigin(0.5,0);
        this.explain1.setAlpha(0);
        this.explain1.depth = 5;

        this.explain2 = this.add.text(gameWidth/2 + 1500, gameHeight/2 + 200, 'Check where your friend is by pressing S', textConfig).setOrigin(0.5,0);
        this.explain2.setAlpha(0);
        this.explain2.depth = 5;

        this.explain3 = this.add.text(gameWidth/2 + 1500, gameHeight/2 + 200, 'Find your friend before morning!', textConfig).setOrigin(0.5,0);
        this.explain3.setAlpha(0);
        this.explain3.depth = 5;

        this.playerSpeaking = this.add.text(this.player.x, this.player.y, '', textConfig).setOrigin(0.5, 3.5);
        this.timeRemain = 60000;
        
      }

    update(time, delta) {
      //checking if timer is done
      //this.timeRemain -= delta;
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

      // updating objects
      this.player.update();
      this.prey.update();
      // updating overlay
      this.overlay.x = this.player.x;
      this.overlay.y = this.player.y;

      this.blackScreen.x = this.player.x;
      this.blackScreen.y = this.player.y;

    
      this.emitZone.x = this.player.x - 3600 / 2;
      this.emitZone.y = this.player.y - 2400 / 2;

      
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
            //this.treeGroup.setAlpha(this.cabin.alpha + 0.02);
            //this.logGroup.setAlpha(this.cabin.alpha + 0.02);
            //this.rockGroup.setAlpha(this.cabin.alpha + 0.02);
            //this.cabin.setAlpha(this.cabin.alpha + 0.02);
            //this.border.setAlpha(this.border.alpha + 0.02);
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

            //this.treeGroup.setAlpha(this.cabin.alpha - 0.02);
            //this.logGroup.setAlpha(this.cabin.alpha - 0.02);
            //this.rockGroup.setAlpha(this.cabin.alpha - 0.02);
            //this.cabin.setAlpha(this.cabin.alpha - 0.02);
            //this.border.setAlpha(this.border.alpha - 0.02);
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
      
      if(preyDistance <= 100){
        if(!movingAway) {
          movingAway = true;
          //moving = true;
          // if player is on the left makes the prey move to the right faster
          if (this.player.x < this.prey.x && this.prey.body.velocity.x >= 0) {
            // move prey to the right
            this.prey.body.velocity.x = 560;
          }
          // if player is on the right makes the prey move to the left faster
          if (this.player.x > this.prey.x && this.prey.body.velocity.x <= 0) {
            // move prey to left
            this.prey.body.velocity.x = 560;
          }
          // if player is on the bottom makes the prey moves up faster
          if (this.player.y < this.prey.y && this.prey.body.velocity.y >= 0) {
            // move prey up
            this.prey.body.velocity.x = 560;
          }
          // if player is on the top prey moves downward faster
          if (this.player.y > this.prey.y && this.prey.body.velocity.y <= 0) {
            // move prey downward
            this.prey.body.velocity.x = 560;
          }
    

          this.clock = this.time.delayedCall(50, () => {
            movingAway = false;
          }, null, this);
        }
      }

    if(this.physics.collide(this.player, this.leftBoundary1)){
        this.explain1.setAlpha(1);
    }
    if(this.physics.collide(this.player, this.leftBoundary2)){
      this.explain2.setAlpha(1);
    }
    if(this.physics.collide(this.player, this.leftBoundary3)){
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.input.keyboard.enabled = false;
      this.blackScreen.setAlpha(1);      
      this.ambientMusic.stop();
      this.playerWalking.setVolume(0);
      this.playerWalking.stop();
      this.preyWalking.stop();
      
      moving = false;
      movingAway = false;
      echoUse = false;
      smellUse = false;
      smellCooldown = false;
      echoCooldown = false;
      this.explain3.x = this.player.x;
      this.explain3.y = this.player.y;
      this.explain3.setAlpha(1);

      this.clock = this.time.delayedCall(5000, () => {
        this.input.keyboard.enabled = true;
        this.player.setVelocityX(800);
        this.player.setVelocityY(800);  
        this.playerWalking.setVolume(0.1 * volumeMultiplier);
        this.scene.start('playScene');
      }, null, this);
      
    }
    
     this.physics.collide(this.player, this.logGroup);
     this.physics.collide(this.prey, this.logGroup);
     this.physics.collide(this.player, this.cabin);
     this.physics.collide(this.prey, this.cabin);    

    // walking sounds
    // repeating single step
    if(playerMoving && !this.playerWalking.isPlaying) {
      this.playerWalking.play();
    }


    // turning on/off multiple step recording
    // if(preyDistance <= 4000){
    //   this.preyWalking.setVolume((4000 - preyDistance) / 40000  * volumeMultiplier);
    //   this.preyWalking.resume();
    // } else {
    //   this.preyWalking.pause();
    // }
    
  }
}