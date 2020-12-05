var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var gameState;
var invisibleBlockGroup, invisibleBlock;
var spooky;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  spooky=loadSound("spooky.wav");

}


function setup() {
  createCanvas(600, 600);
  spooky.loop();
  tower = createSprite(300, 300);
  tower.addImage("Tower", towerImg);
  tower.velocityY = 1;

  doorGroup = new Group();

  climberGroup = new Group();
  
  invisibleBlockGroup=new Group();

  ghost = createSprite(200, 200);
  ghost.addImage("Ghost", ghostImg);
  ghost.scale=0.5;
  
  gameState="play";

  
}

function draw() {
  background(0);
  if (gameState === "play") {
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + 0.8
    if (tower.y > 400) {
      tower.y = 300
    }
    spawnDoors(); //climbersGroup.collide(ghost); 
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }
    if (tower.y > 600) {
    tower.y = 300;
  }

    drawSprites();
  }
 if(gameState==="end"){
   fill("yellow");
   textSize(30);
   text("Game Over",200,200);
    }
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    invisibleBlock=createSprite(200,15);
    // invisibleBlock.visible=false;
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.debug=true;
    
    
    door.addImage("Door", doorImg);
    climber.addImage("Climber", climberImg);
    

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth+=1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime=800;

    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}