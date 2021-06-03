class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload(){
    this.load.image('menu', './Assets/sprites/mainMenu.png');
    this.load.image('play', './Assets/sprites/startButton.png');
    this.load.image('quit', './Assets/sprites/quitButton.png');
    this.load.image('options', './Assets/sprites/optionsButton.png');
  }
  
  create() {
      //setting up main meny screen images
      this.menuImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);

      //setting up options in menu
      this.selectPlay = this.add.sprite(300, game.config.height/2 - 150, 'play').setOrigin(0, 0);
      this.selectPlay.setScale(1.5);

      this.mousePlay = this.selectPlay.setInteractive();

      this.selectOptions = this.add.image(300, game.config.height/2, 'options').setOrigin(0, 0);
      this.selectOptions.setScale(1.5);


      this.mouseOptions = this.selectOptions.setInteractive();
      
      this.mousePointerisOverPlay = false;

      this.mousePointerisOverOptions = false;

      //setting up mouse cursor over object
      this.mousePlay.on('pointerover', () => { 
        this.mousePointerisOverPlay = true;
        
      });
      
      this.mousePlay.on('pointerout', () => { 
        this.mousePointerisOverPlay = false; 
      });

      this.mouseOptions.on('pointerover', () => { 
        this.mousePointerisOverOptions = true;
        
      });
      
      this.mouseOptions.on('pointerout', () => { 
        this.mousePointerisOverOptions = false; 
      });
      
  }
  update(){
    
    if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
      this.scene.start("playScene");      
    }

    if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverOptions){
      this.scene.start("optionScene");
    }
  }
}