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
        if(this.anims.getName() != 'walkLeft') {
          this.play('walkLeft');
        } else if (!this.anims.isPlaying) {
          this.play('walkLeft');
        }
        playerMoving = true;         
      }
      else if(keyRIGHT.isDown){
        this.setVelocityX(this.moveSpeed);
        if(this.anims.getName() != 'walkRight') {
          this.play('walkRight');
        } else if (!this.anims.isPlaying) {
          this.play('walkRight');
        }
        playerMoving = true;
      }
      else {
         this.setVelocityX(0);
         if (this.anims.getName() == 'walkRight' || this.anims.getName() == 'walkLeft') {
          this.anims.stop();
         }
      }
      if(keyUP.isDown){
          this.setVelocityY(this.moveSpeed * -1);
          if(this.anims.getName() != 'walkUp' && this.anims.getName() != 'walkLeft' && this.anims.getName() != 'walkRight') {
            this.play('walkUp');
          } else if (!this.anims.isPlaying) {
            this.play('walkUp');
          }
          playerMoving = true;          
      }
      else if(keyDOWN.isDown){
          this.setVelocityY(this.moveSpeed);
          if(this.anims.getName() != 'walkDown' && this.anims.getName() != 'walkLeft' && this.anims.getName() != 'walkRight') {
            this.play('walkDown');
          } else if (!this.anims.isPlaying) {
            this.play('walkDown');
          }
          playerMoving = true;
      }
      else{
          this.setVelocityY(0);
      }
      // If no movement keys are pressed character will stop moving
      if(!keyLEFT.isDown && !keyRIGHT.isDown && !keyUP.isDown && !keyDOWN.isDown){
        this.setVelocityY(0);
        this.setVelocityX(0);
        this.anims.stop();
        playerMoving = false; 
      }
    }

}