class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }

    preload() {
      this.load.image('darkOverlay', './Assets/sprites/darknessOverlay.png');
      this.load.image('ground', './Assets/sprites/groundTile.png');
      this.load.atlas('finalAnimation', './Assets/animations/finalAnimation-0.png', './Assets/animations/finalAnimation.json')
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

      // creating Animations
      this.anims.create({
        key: 'caught',
        frames: this.anims.generateFrameNames('finalAnimation', {
          start: 1,
          end: 39,
          zeroPad: 1,
          prefix: 'fa',
          suffix: '.png'
        }),
        frameRate: 24,
        repeat: 0
      });

      if(!timesUP){
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'ground').setOrigin(0, 0);
        this.overlay = this.add.image(0, 0, 'darkOverlay').setOrigin(0, 0);
        this.overlay.setAlpha(1);
        this.overlay.depth = 4;
        this.prey = new Prey(this, game.config.width / 2, game.config.height / 2, 'finalAnimation', 0);
        this.prey.x -= this.prey.width / 2 * 0.2;
        this.prey.y += this.prey.height / 2 * 0.2;
        this.prey.setScale(0.2);
        this.prey.play('caught');
        this.clock = this.time.delayedCall(2500, () => {
          this.background.destroy();
          this.prey.destroy();
          this.overlay.setAlpha(0);
          this.add.text(game.config.width / 2, game.config.height / 2, 'You found your friend! Press r to restart', textConfig).setOrigin(0.5,0);
        }, null, this);
      }
      else if(timesUP){
        this.add.text(game.config.width / 2, game.config.height / 2, "Game Over, you couldn't find your friend\n Press R to restart" , textConfig).setOrigin(0.5,0);
      }
    }

    update() {
      if(Phaser.Input.Keyboard.JustDown(keyR)) {
        this.timesUP = false;
        this.scene.start('menuScene');
      }
    }

}