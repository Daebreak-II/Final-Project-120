class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.moveSpeed = 5;
    }


    update() {
      // movement
      if(keyRIGHT.isDown && this.x < game.config.width - this.moveSpeed) {
        this.x += this.moveSpeed;
      }
      if(keyLEFT.isDown && this.x > 0 + this.moveSpeed) {
        this.x -= this.moveSpeed;
      }

      if(keyDOWN.isDown && this.y < game.config.height - this.moveSpeed) {
        this.y += this.moveSpeed;
      }
      if(keyUP.isDown && this.y > 0 + this.moveSpeed) {
        this.y -= this.moveSpeed;
      }
    }

}