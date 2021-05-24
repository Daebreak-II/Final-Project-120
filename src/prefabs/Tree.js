class Tree extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setOrigin(0.5, 0);
      this.setSize(this.width, this.height);
      this.setScale(0.1);
    }


    update() {

    }

}