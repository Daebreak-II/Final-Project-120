class Options extends Phaser.Scene {
    constructor() {
      super("optionScene");
    }

    preload(){
      this.load.image('play', './Assets/sprites/startButton.png');
      
    }
    
    create() {
        this.add.text(20, 20, "In progress options");
        //this.scene.start("playScene");

        //setting up main meny screen images


        this.selectPlay = this.add.sprite(game.config.width/2 - 150, game.config.height/2, 'play').setOrigin(0, 0);
        this.selectPlay.setScale(1.5);

        this.mousePlay = this.selectPlay.setInteractive();
       

        this.mousePointerisOverPlay = false;
        
        
        this.mousePlay.on('pointerover', () => { 
          this.mousePointerisOverPlay = true; 
        });
        this.mousePlay.on('pointerout', () => { 
          this.mousePointerisOverPlay = false; 
        });
        
    }
    update(){
      
      

      if(game.input.activePointer.leftButtonDown() && this.mousePointerisOverPlay){
        // this.scene.start("playScene");
        this.scene.start('gameOverScene');
      }


      
                      
    }
}