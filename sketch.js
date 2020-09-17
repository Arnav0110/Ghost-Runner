var ghost , ghostImg;
var tower , towerImg;
var door, doorImg, doorsGroup;
var climber , climberImg, climbersGroup;
var invisible_block, invisible_blocksGroup;
var gamestate = "play";
var spookySound;

function preload (){
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}
function setup (){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisible_blocksGroup = new Group();
  
}

function draw (){
  background(0);
  if (gamestate === "play" ){
    if(keyDown("space")){
      ghost.velocityY = -4;
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -4;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
    }

    ghost.velocityY = ghost.velocityY+ 0.1;
    if (tower.y >400){
     tower.y = 300;          
    }
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if (invisible_blocksGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy();
      gamestate = "end";
    }
    spawnDoors();
    drawSprites();
  }
  if (gamestate === "end" ){
    stroke("yellow");
    fill("yellow");
    textSize(60);
    text("Game Over",140,250);
  }
}

function spawnDoors (){
  if (frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    
    invisible_block = createSprite(200,15);
    invisible_block.width = climber.width;
    invisible_block.height = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    climber.x = door.x;
    climber.velocityY= 1;
    invisible_block.x = door.x;
    invisible_block.velocityY = 1;
    
    door.lifetime = 700;
    climber.lifetime = 700;
    invisible_block.lifetime = 700;
    invisible_block.debug= true;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisible_blocksGroup.add(invisible_block);
  }
}