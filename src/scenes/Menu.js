class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload(){
    this.load.image('menu', './Assets/sprites/mainMenu.png');
    this.load.image('play', './Assets/sprites/startButton.png');
    this.load.image('quit', './Assets/sprites/quitButton.png');
    this.load.image('options', './Assets/sprites/optionsButton.png');
    this.load.image('creditsButton', './Assets/sprites/creditsButton.png');
    this.load.image('playOverlay', './Assets/sprites/startButtonOverlay.png');
    this.load.image('creditsButtonOverlay', './Assets/sprites/creditsButtonOverlay.png');
    this.load.image('optionsOverlay', './Assets/sprites/optionsButtonOverlay.png');
    
  }
  
  create() {
      //setting up main meny screen images
      this.menuImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);

      //setting up options in menu
      this.selectPlay = this.add.sprite(300, game.config.height/2 - 150, 'play').setOrigin(0, 0);
      this.selectPlay.setScale(1.5);

      this.selectPlayOverlay = this.add.sprite(300, game.config.height/2 - 150, 'playOverlay').setOrigin(0, 0);
      this.selectPlayOverlay.setScale(1.5);
      this.selectPlayOverlay.setAlpha(0);

      this.mousePlay = this.selectPlay.setInteractive();

      this.selectOptions = this.add.image(300, game.config.height/2, 'options').setOrigin(0, 0);
      this.selectOptions.setScale(1.5);

      this.selectOptionsOverlay = this.add.image(300, game.config.height/2, 'optionsOverlay').setOrigin(0, 0);
      this.selectOptionsOverlay.setScale(1.5);
      this.selectOptionsOverlay.setAlpha(0);

      this.mouseOptions = this.selectOptions.setInteractive();

      this.selectCredits = this.add.sprite(550, game.config.height/2 - 55, 'creditsButton').setOrigin(0, 0);
      this.selectCredits.setScale(0.7);

      this.selectCreditsOverlay = this.add.sprite(550, game.config.height/2 - 55, 'creditsButtonOverlay').setOrigin(0, 0);
      this.selectCreditsOverlay.setScale(0.7);
      this.selectCreditsOverlay.setAlpha(0);

      this.mouseCredits = this.selectCredits.setInteractive();
      
      this.mousePointerisOverPlay = false;

      this.mousePointerisOverOptions = false;

      this.mousePointerisOverCredits = false;

      //setting up mouse cursor over object
      this.mousePlay.on('pointerover', () => { 
        this.mousePointerisOverPlay = true;
        this.selectPlayOverlay.setAlpha(0.2);
        
      });
      
      this.mousePlay.on('pointerout', () => { 
        this.mousePointerisOverPlay = false;
        this.selectPlayOverlay.setAlpha(0); 
      });

      this.mouseOptions.on('pointerover', () => { 
        this.mousePointerisOverOptions = true;
        this.selectOptionsOverlay.setAlpha(0.2);        
      });
      
      this.mouseOptions.on('pointerout', () => { 
        this.mousePointerisOverOptions = false; 
        this.selectOptionsOverlay.setAlpha(0);
      });
      
      this.mouseCredits.on('pointerover', () => { 
        this.mousePointerisOverCredits = true;
        this.selectCreditsOverlay.setAlpha(0.2);
        
      });
      
      this.mouseCredits.on('pointerout', () => { 
        this.mousePointerisOverCredits = false;
        this.selectCreditsOverlay.setAlpha(0); 
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