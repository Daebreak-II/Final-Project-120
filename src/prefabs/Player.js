class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.moveSpeed = 20;
    }


    update() {
      // movement
      if(keyRIGHT.isDown && this.x < gameWidth - this.moveSpeed - (this.width * playerScale / 2)) {
        this.x += this.moveSpeed;
      }
      if(keyLEFT.isDown && this.x > 0 + this.moveSpeed + (this.width * playerScale / 2)) {
        this.x -= this.moveSpeed;
      }

      if(keyDOWN.isDown && this.y < gameHeight - this.moveSpeed - (this.height * playerScale / 2)) {
        this.y += this.moveSpeed;
      }
      if(keyUP.isDown && this.y > 0 + this.moveSpeed + (this.height * playerScale / 2)) {
        this.y -= this.moveSpeed;
      }
    }

}