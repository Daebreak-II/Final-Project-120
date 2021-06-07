class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload(){
    this.load.image('menu', './Assets/sprites/mainMenu.png');
    this.load.image('play', './Assets/sprites/startButton.png');
    this.load.image('quit', './Assets/sprites/quitButton.png');
    this.load.image('options', './Assets/sprites/optionsButton.png');
    this.load.image('credits', './Assets/sprites/creditsButton.png');
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

      this.selectCredits = this.add.sprite(550, game.config.height/2 - 55, 'credits').setOrigin(0, 0);
      this.selectCredits.setScale(0.7);

      this.mouseCredits = this.selectCredits.setInteractive();
      
      this.mousePointerisOverPlay = false;

      this.mousePointerisOverOptions = false;

      this.mousePointerisOverCredits = false;

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
      
      this.mouseCredits.on('pointerover', () => { 
        this.mousePointerisOverCredits = true;
        
      });
      
      this.mouseOptions.on('pointerout', () => { 
        this.mousePointerisOverCredits = false; 
      });
  }
  update(){
    
    if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
      this.scene.start("tutorialScene");      
    }

    if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverOptions){
      this.scene.start("optionScene");
    }

    if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverCredits){
      this.scene.start("creditsScene");
    }
  }
}