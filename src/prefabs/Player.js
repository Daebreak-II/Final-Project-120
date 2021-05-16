class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      

    }


    update() {
      // player's 8 direction movement
      if(keyLEFT.isDown){
        this.setVelocityX(-100);                
      }
      else if(keyRIGHT.isDown){
         this.setVelocityX(100);
      }
      else{
         this.setVelocityX(0);
      }
      if(keyUP.isDown){
          this.setVelocityY(-100);                
      }
      else if(keyDOWN.isDown){
          this.setVelocityY(100);
      }
      else{
          this.setVelocityY(0);
      }
      // If no movement keys are pressed character will stop moving
      if(!keyLEFT.isDown && !keyRIGHT.isDown && !keyUP.isDown && !keyDOWN.isDown){
         this.setVelocityY(0);
         this.setVelocityX(0);
      }
    }

}