var jiggly, jigglyIMG;
var ground, invisibleGround, groundImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var starsGroup, starsImage;
var crystalGroup, crystalIMG, gameOver,restart,gameOverImage,restartImage;

var score=0;


function preload(){
  jigglyIMG = loadImage("jigglypuffClipart.png");
 
  
  groundImage = loadImage("ground2.png");
  
  starsImage = loadImage("starClipart.png");
  
  crystalIMG = loadImage("crystalClipart.png");
 
 
  gameOverImage=loadImage('gameOverClipart.png');
  restartImage=loadImage('refreshClipart.png');
}

function setup() {
  createCanvas(600, 200);
  
  jiggly = createSprite(50,180,20,50);
  jiggly.addAnimation("running", trex_running);
  jiggly.addAnimation('collide',trex_collided);
  jiggly.scale = 0.5;
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage(restartImage);
  restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

gameOver.visible = false;
restart.visible = false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  starsGroup = new Group();
  crystalGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  
  
  if(keyDown("space")) {
    jiggly.velocityY = -10;
  }
  
  jiggly.velocityY = jiggly.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnStars();
  spawnCrystals();
  
    if(crystalGroup.isTouching(jiggly)){
       gameState=END
  }   
  }

 else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    tjiggly.velocityY = 0;
    crystalGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //jiggly.changeAnimation("collide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    crystalGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
 }

 jiggly.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var stars = createSprite(600,120,40,10);
    stars.y = Math.round(random(80,120));
    stars.addImage(cloudImage);
    stars.scale = 0.5;
    stars.scale = 0.5;
    stars.velocityX = -3;
    
     //assign lifetime to the variable
     stars.lifetime = 200;
    
    //adjust the depth
    stars.depth = jiggly.depth;
    jiggly.depth = jiggly.depth + 1;
    
    //add each cloud to the group
    starsGroup.add(stars);
  }
  
}

function spawnCrystals() {
  if(frameCount % 60 === 0) {
    var crystal = createSprite(600,165,10,40);
    crystal.velocityX =  -(6 + 3*score/100);;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: crystal.addImage(obstacle1);
              break;
      case 2: crystal.addImage(obstacle2);
              break;
      case 3: crystal.addImage(obstacle3);
              break;
      case 4: crystal.addImage(obstacle4);
              break;
      case 5: crystal.addImage(obstacle5);
              break;
      case 6: crystal.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    crystal.scale = 0.5;
    crystal.lifetime = 300;
    //add each obstacle to the group
    crystalGroup.add(crystal);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  crystalGroup.destroyEach();
  starsGroup.destroyEach();
  
  jiggly.changeAnimation("running",jigglyIMG);
  
  score = 0;
  
}