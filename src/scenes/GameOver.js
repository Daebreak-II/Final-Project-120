class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }

    preload() {

    }

    create() {
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

      

      this.add.text(game.config.width / 2 , game.config.height / 2, 'Game Over, press r to restart', textConfig);
    }

    update() {
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.start('menuScene');
      }
    }

}