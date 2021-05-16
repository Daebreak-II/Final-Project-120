class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    

    preload() {
      // load sprites
      this.load.image('player', './Assets/sprites/playerSprite.png');
      this.load.image('prey', './Assets/sprites/preySprite.png');
      this.load.image('tree', './Assets/sprites/treeSprite.png');
      this.load.image('ground', './Assets/sprites/ground.png');

      // load audio
      this.load.audio('', './Assets/sfx/');
      //load animations
    }
    create(){
        //making the play scene's ground
        this.ground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'ground').setOrigin(0, 0);
        //creating player
        this.bobo = new Player(this, 0, 0, 'player', 0).setOrigin(0,0);
        this.bobo.setScale(0.05);
        //creating the prey
        this.friend = new Prey(this, 10, 10, 'prey', 0).setOrigin(0,0);
        this.friend.setScale(0.1);

        //adding boundaries
        this.bobo.body.collideWorldBounds = true;
        this.friend.body.collideWorldBounds = true;

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {


        this.bobo.update();
        
        //Prey's movement
        if(!moving) {
          moving = true;
          let changeDirection = Phaser.Math.Between(1, 4);
          if(changeDirection <= 1) {
                  this.friend.setVelocityX(100);
          } else if(changeDirection <= 2) {
                  this.friend.setVelocityX(-100);
          } else if (changeDirection <= 3) {
                  this.friend.setVelocityY(100);
          } else if (changeDirection <= 4) {
                  this.friend.setVelocityY(-100);
          }

          this.friend.setVelocityX(Phaser.Math.Between(-100, 100));
          this.friend.setVelocityY(Phaser.Math.Between(-100, 100));

          this.clock = this.time.delayedCall(500, () => {
              moving = false;
          }, null, this);
      }
      if(Phaser.Math.Distance.BetweenPoints(this.bobo, this.friend) <= 150){
          if(!movingAway) {
              movingAway = true;
              moving = true;
              if(keyLEFT.isDown){
                  this.friend.setVelocityX(-200);                
              }
              else if(keyRIGHT.isDown){
                  this.friend.setVelocityX(200);
              }
              else{
                  this.friend.setVelocityX(0);
              }
              if(keyUP.isDown){
                  this.friend.setVelocityY(-200);                
              }
              else if(keyDOWN.isDown){
                  this.friend.setVelocityY(200);
              }
              else{
                  this.friend.setVelocityY(200);
              }

              this.clock = this.time.delayedCall(50, () => {
                  movingAway = false;
              }, null, this);
          }
      }
      
      }
}