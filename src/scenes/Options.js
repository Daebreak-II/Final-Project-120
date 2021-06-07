class Options extends Phaser.Scene {
    constructor() {
      super("optionScene");
    }

    preload(){
      this.load.image('playOptions', './Assets/sprites/playButton.png');
      this.load.image('backOptions', './Assets/sprites/backButton.png');
      this.load.image('playOptionsOverlay', './Assets/sprites/playButtonOverlay.png');
      this.load.image('backOptionsOverlay', './Assets/sprites/backButtonOverlay.png');
      this.load.image('riverOptions', './Assets/sprites/riverSprite.png');
      this.load.image('groundedOptions', './Assets/sprites/ground.png');
      this.load.image('leftArrow', './Assets/sprites/leftarrow.png');
      this.load.image('rightArrow', './Assets/sprites/rightarrow.png');
      this.load.image('treeOptions', './Assets/sprites/treeSprite.png');

      this.load.audio('smellingOptions', './Assets/sfx/smelling.wav');
      this.load.audio('selectingOptions', './Assets/sfx/selection.wav');
      this.load.audio('mouseOverOptions', './Assets/sfx/wind.mp3');

      
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
        
        this.ground = this.add.image(0, 0, 'groundedOptions').setAlpha(0.9);

        

        this.river = this.add.image(game.config.width/2 - 100, 0, 'riverOptions');
        this.river.setAngle(-60);

        for(let i = 0; i < 30; i++) {
          // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
          this.tree = this.add.sprite(Phaser.Math.Between(0, game.config.width / 2 - 275), Phaser.Math.Between(0, game.config.height), 'treeOptions').setScale(0.1);
        }

        for(let i = 0; i < 30; i++) {
          // this.add.image(Phaser.Math.Between(0, gameWidth), Phaser.Math.Between(0, gameHeight), 'tree').setScale(0.2).setAngle(Phaser.Math.Between(-5, 5));
          this.tree = this.add.sprite(Phaser.Math.Between(game.config.width / 2 + 200, game.config.width), Phaser.Math.Between(0, game.config.height), 'treeOptions').setScale(0.1);
        }

        this.titleOptions = this.add.text(game.config.width / 2 - 150, 0, 'Options', titleConfig);
        this.soundVolume = this.add.text(150, 200, 'Volume: ', optionsConfig);

        // mouse over play button
        this.selectPlay = this.add.sprite(game.config.width - 300, game.config.height/2 + 250, 'playOptions').setOrigin(0, 0);
        this.selectPlay.setScale(0.8);

        this.selectPlayOverlay = this.add.sprite(game.config.width - 300, game.config.height/2 + 250, 'playOptionsOverlay').setOrigin(0, 0);
        this.selectPlayOverlay.setScale(0.8);
        this.selectPlayOverlay.setAlpha(0);

        this.mousePlay = this.selectPlay.setInteractive();
       

        this.mousePointerisOverPlay = false;
        
        
        this.mousePlay.on('pointerover', () => { 
          this.mousePointerisOverPlay = true;
          this.selectPlayOverlay.setAlpha(0.2);
          this.sound.play('mouseOverOptions', {volume: 0.07 * volumeMultiplier}); 
        });
        this.mousePlay.on('pointerout', () => { 
          this.mousePointerisOverPlay = false; 
          this.selectPlayOverlay.setAlpha(0);
        });

        //mouse over back button
        this.selectBack = this.add.sprite(50, game.config.height/2 + 250, 'backOptions').setOrigin(0, 0);
        this.selectBack.setScale(0.8);

        this.selectBackOverlay = this.add.sprite(50, game.config.height/2 + 250, 'backOptionsOverlay').setOrigin(0, 0);
        this.selectBackOverlay.setScale(0.8);
        this.selectBackOverlay.setAlpha(0);

        this.mouseBack = this.selectBack.setInteractive();
       

        this.mousePointerisOverBack = false;
        
        
        this.mouseBack.on('pointerover', () => { 
          this.mousePointerisOverBack = true; 
          this.selectBackOverlay.setAlpha(0.2);
          this.sound.play('mouseOverOptions', {volume: 0.07 * volumeMultiplier});
        });
        this.mouseBack.on('pointerout', () => { 
          this.mousePointerisOverBack = false;
          this.selectBackOverlay.setAlpha(0);
        });

        //Volume settings 
        this.selectLeftVolume = this.add.sprite(game.config.width / 2 - 200, 220, 'leftArrow').setOrigin(0, 0);
        this.selectLeftVolume.setScale(0.5);

        this.selectRightVolume = this.add.image(game.config.width / 2 + 50, 220, 'rightArrow').setOrigin(0, 0);
        this.selectRightVolume.setScale(0.5);

        this.mouseLeftVolume = this.selectLeftVolume.setInteractive();

        this.mouseRightVolume = this.selectRightVolume.setInteractive();
        
        this.mousePointerisOverLeftVolume = false;

        this.mousePointerisOverRightVolume = false;
  
        //setting up mouse cursor over object
        this.mouseLeftVolume.on('pointerover', () => { 
          this.mousePointerisOverLeftVolume = true;
          this.sound.play('mouseOverOptions', {volume: 0.07 * volumeMultiplier});
        });
        
        this.mouseLeftVolume.on('pointerout', () => { 
          this.mousePointerisOverLeftVolume = false; 
        });

        this.mouseRightVolume.on('pointerover', () => { 
          this.mousePointerisOverRightVolume = true;
          this.sound.play('mouseOverOptions', {volume: 0.07 * volumeMultiplier});
        });
        this.mouseRightVolume.on('pointerout', () => { 
          this.mousePointerisOverRightVolume = false;
        });

        this.volumeLevel = this.add.text(game.config.width / 2 - 50, 200, volumeMultiplier, optionsConfig);

    }
    update(){
      
      //Going into the play scene or back to the main menu

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
        this.scene.start("tutorialScene");
        this.sound.play('selectingOptions', {volume: 0.5 * volumeMultiplier});
      }
      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverBack){
        this.scene.start("menuScene");
        this.sound.play('selectingOptions', {volume: 0.5 * volumeMultiplier});
      }

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverLeftVolume){
        //console.log('Is mouse working?');
        this.mousePointerisOverLeftVolume = false;
        if(volumeMultiplier > 0){
          volumeMultiplier -= 1;
          this.volumeLevel.text = volumeMultiplier;
          this.sound.play('smellingOptions', {volume: 1 * volumeMultiplier});
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
          this.sound.play('smellingOptions', {volume: 1 * volumeMultiplier});
        }
        this.clock = this.time.delayedCall(100, () => {
          this.mousePointerisOverRightVolume = true;
        }, null, this);
      }

      
                      
    }
}