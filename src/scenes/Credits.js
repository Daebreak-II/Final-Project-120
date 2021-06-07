class Credits extends Phaser.Scene {
    constructor() {
      super("creditsScene");
    }

    preload(){
      this.load.image('playCredits', './Assets/sprites/playButton.png');
      this.load.image('backCredits', './Assets/sprites/backButton.png');
      this.load.image('playCreditsOverlay', './Assets/sprites/playButtonOverlay.png');
      this.load.image('backCreditsOverlay', './Assets/sprites/backButtonOverlay.png');
      this.load.image('creditsScreen', './Assets/sprites/creditScreen.png');
      
    }
    
    create() {
        //this.add.text(20, 20, "In progress options");
        //this.scene.start("playScene");

        //setting up main meny screen images

        let titleConfig = {
          fontFamily: 'Chiller',
          fontSize: '80px',
          color: '#FFF',
          stroke: '#FFF',
          strokeThickness: 1,
          align: 'center',
          padding: {
              top: 5,
              bottom: 5,
          },
          width: 100
        }

        let optionsConfig = {
          fontFamily: 'Chiller',
          fontSize: '64px',
          color: '#FFF',
          stroke: '#FFF',
          strokeThickness: 2,
          align: 'center',
          padding: {
              top: 5,
              bottom: 5,
          },
          width: 100
        }
        
        this.creditsScreen = this.add.image(game.config.width/2, game.config.height/2, 'creditsScreen');



        //mouse over back button
        this.selectBack = this.add.sprite(50, game.config.height/2 + 250, 'backCredits').setOrigin(0, 0);
        this.selectBack.setScale(0.8);

        this.selectBackOverlay = this.add.sprite(50, game.config.height/2 + 250, 'backCreditsOverlay').setOrigin(0, 0);
        this.selectBackOverlay.setScale(0.8);
        this.selectBackOverlay.setAlpha(0);

        this.mouseBack = this.selectBack.setInteractive();
       

        this.mousePointerisOverBack = false;
        
        
        this.mouseBack.on('pointerover', () => { 
          this.mousePointerisOverBack = true;
          this.selectBackOverlay.setAlpha(0.2); 
        });
        this.mouseBack.on('pointerout', () => { 
          this.mousePointerisOverBack = false;
          this.selectBackOverlay.setAlpha(0); 
        });
    }
    update(){
      
      //Going into the play scene or back to the main menu
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverBack){
        this.scene.start("menuScene");
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverLeftVolume){
        //console.log('Is mouse working?');
        this.mousePointerisOverLeftVolume = false;
        if(volumeMultiplier > 0){
          volumeMultiplier -= 1;
          this.volumeLevel.text = volumeMultiplier;
          this.sound.play('smelling', {volume: 1 * volumeMultiplier});
        }
        this.clock = this.time.delayedCall(100, () => {
          this.mousePointerisOverLeftVolume = true;
        }, null, this);
  
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverRightVolume){
        this.mousePointerisOverRightVolume = false;
        if(volumeMultiplier < 3){
          volumeMultiplier += 1;
          this.volumeLevel.text = volumeMultiplier;
          this.sound.play('smelling', {volume: 1 * volumeMultiplier});
        }
        this.clock = this.time.delayedCall(100, () => {
          this.mousePointerisOverRightVolume = true;
        }, null, this);
      }

      
                      
    }
}