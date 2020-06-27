//Global Variables

var PLAY = 1;
var END = 0;
var gameState = PLAY;





function preload(){
  
  backImage = loadImage("jungle.jpg");
  
  player_running = 
    loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_04.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")  
                  
 bananaImage = loadImage("Banana.png");
 ObstacleImage = loadImage("stone.png");
  
 
                  
}


function setup() {
  createCanvas(600,300);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false
  
  //create rock and banana Groups
  rocksGroup = new Group();
  bananasGroup = new Group();
  
  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", player_running);
  
  storke("white");
  fill("white");
  textSize(20);
  text("score:"+score,550,50);
}


function draw(){
 background(255); 
  
  
  
  if(gameState === PLAY){
    //move the ground
    
   invisibleGround.velocityX = -5;
    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 159){
      monkey.velocityY = -14 ;
         }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the bananas
    spawnbananas();
  
    //spawn rocks
    spawnrocks();
    
    //End the game when monkey is touching the rock
    if(rocksGroup.isTouching(monkey)){
      
      gameState = END;
      
    }
    
    }
  
  else if(gameState === END) {
    
  
    invisibleGround.velocityX = 0;
    monkey.velocityY = 0;
    rocksGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    monkey.setAnimation("monkey_copy_1");
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    rocksGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    
  }
  
   if(rocksGroup.isTouching(player))
    
    player.scale = 0.2
  
}

  switch(score){
      
      case 10: player.scale = 0.12;
      break;
    
      case 20: player.scale = 0.14;
      break;
      
      case 30: player.scale = 0.16;
      break;
      
      case 40: player.scale = 0.18;
      break;
      
      default : break;
      
  
 



function spawnrocks() {
  if(frameCount % 70 === 0) {
    var rock = createSprite(400,365,40,40);
    rock.velocityX = - 5;
    rock.changeAnimation("stone.png");
    rock.scale = 0.1;
    
          
    //rock.scale = 0.5;
    rock.lifetime = 140;
    //add each rock to the group
    rocksGroup.add(rock);
  }
}

function spawnbananas() {
  //write code here to spawn the bananas
  if (frameCount % 70 === 0) {
    var banana = createSprite(390,300,40,10);
    
    banana.addAnimation("Banana.png");
    banana.scale = 0.051;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
  
    //add each banana to the group
    bananasGroup.add(banana);
  }
}
