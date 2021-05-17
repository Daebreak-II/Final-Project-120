class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {

    }

    create() {
      //this.scene.start('playScene');
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '48px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        Width: 0
      }

      this.add.text(game.config.width/2, game.config.height/2, 'Trail Behind', menuConfig).setOrigin(0.5,0);
      let menuConfig2 = {
        fontFamily: 'Courier',
        fontSize: '24px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        Width: 0
      }
      this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press the Space Bar to start', menuConfig).setOrigin(0.5,0);

      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        // easy mode
        this.scene.start('playScene');    
      }
    }

}