class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }

    preload() {

    }

    create() {
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

      let textConfig = {
        fontFamily: 'Courier',
        fontSize: '24px',
        color: '#FFFFFF',
        align: 'center',
        padding: {
            top: 5,
            bottom: 5,
        },
        Width: 0
      }
      if(!timesUP){
        this.add.text(game.config.width / 2 , game.config.height / 2, 'Game Over, press r to restart', textConfig).setOrigin(0.5,0);
      }
      else{
        this.add.text(game.config.width / 2 , game.config.height / 2, "Game Over, you couldn't find your friend\n Press R to restart" , textConfig).setOrigin(0.5,0);
      }
    }

    update() {
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.timesUP = false;
        this.scene.start('menuScene');
      }
    }

}