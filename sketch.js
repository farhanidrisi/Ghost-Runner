var tower,towerImage;
var ghost,ghostImage;
var door,doorImage;
var climber,climberImage;
var doorGroup,climberGroup;
var gameState="PLAY";



function preload (){
  towerImage=loadImage("tower.png");
  ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  
}

function setup (){
  createCanvas(600,600);
  
  tower=createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY=4;
  
  ghost=createSprite(200,200,10,10);
  ghost.addAnimation("ghost",ghostImage);
  ghost.scale=0.4;
  
  doorGroup=new Group();
  climberGroup=new Group();
  
  
} 

function draw (){
  background("black");
  
  if (gameState==="PLAY"){
    
  
  
  if (tower.y>600){
    tower.y= 400;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-08;
   }
  
  
  ghost.velocityY=ghost.velocityY+0.3;
  
   if (keyDown("left_Arrow")){
    ghost.x=ghost.x-3;
   }
  
  if (keyDown("right_Arrow")){
    ghost.x=ghost.x+3;
   }
    
    
  spawnDoors();
    
  if (doorGroup.isTouching(ghost)||climberGroup.isTouching(ghost)||ghost.y>600){
    gameState="END";
    
     }
  }
   drawSprites();
  
  if (gameState==="END"){
    ghost.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    ghost.velocityY=0;
    doorGroup.setVelocityYEach(0);
    tower.velocityY=0;
    climberGroup.setVelocityYEach(0); 
    
    
    
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("GAME OVER",150,300);
  
    
  }
    
  
  
 
  
}

function spawnDoors (){
  if (frameCount%200===0){
    door=createSprite(200,-50,10,10);
    door.addImage(doorImage);
    door.velocityY=2;
    climber=createSprite(200,10,10,10);
    climber.addImage(climberImage);
    climber.velocityY=2;
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    ghost.depth=door.depth+1;
    ghost.depth=climber.depth+1;
    doorGroup.add(door);
    climberGroup.add(climber);
  }
}





