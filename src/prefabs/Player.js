class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.moveSpeed = 800;
    }


    update() {
      if (smellUse || echoUse) {
        this.moveSpeed = 400/4;
      } else {
        this.moveSpeed = 400;
      }

      // player's 8 direction movement
      if(keyLEFT.isDown){
        this.setVelocityX(this.moveSpeed * -1);  
        this.playAfterRepeat('walkLeft');
        playerMoving = true;         
      }
      else if(keyRIGHT.isDown){
         this.setVelocityX(this.moveSpeed);
         this.playAfterRepeat('walkRight', 1);
         playerMoving = true;
      }
      else {
         this.setVelocityX(0);
      }
      if(keyUP.isDown){
          this.setVelocityY(this.moveSpeed * -1);
          this.setFrame('playerR4.png');
          playerMoving = true;          
      }
      else if(keyDOWN.isDown){
          this.setVelocityY(this.moveSpeed);
          this.playAfterRepeat('walkDown', 1);
          playerMoving = true;
      }
      else{
          this.setVelocityY(0);
      }
      // If no movement keys are pressed character will stop moving
      if(!keyLEFT.isDown && !keyRIGHT.isDown && !keyUP.isDown && !keyDOWN.isDown){
        this.setVelocityY(0);
        this.setVelocityX(0);
        this.stop();
        playerMoving = false; 
      }
    }

}