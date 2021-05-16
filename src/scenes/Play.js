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

      // load audio
      // this.load.audio('', './Assets/sfx/');
      //load animations
    }

    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      
        // add backround
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'groundTile').setOrigin(0, 0);
      
        // adding in objects
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0).setOrigin(0.5, 0.5);
        this.player.setScale(0.07);
        this.player.setSize(this.player.width, this.player.height);


        this.prey = new Prey(this, game.config.width/4, game.config.height/4, 'prey', 0).setOrigin(0.5, 0.5);
        this.prey.setScale(0.1);
        this.prey.setSize(this.prey.width, this.prey.height);

        // set up camera
        this.cameras.main.setSize(1200, 800);
        this.cameras.main.setBounds(0, 0, game.config.width * 2, game.config.height * 2);
        this.cameras.main.startFollow(this.player);

      }

      update() {

        // updating objects
        this.player.update();
        this.prey.update();
      }
}