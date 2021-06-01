var you,you_running,zo,zo_running,zo1_running,zo1,coin,restartImg,musde,musbo;
var back,clo,obstaclesGroup,cloudsGroup,coinsGroup,coinImg,gameOverImg,musju;
var PLAY = 1;
var END = 0;
var gameState =PLAY;
var score = 0;
var invisibleGround,restart,gameOver;
function preload(){
  
you_running=loadAnimation("r1-removebg-preview.png","r2-removebg-preview.png","r3-removebg-preview.png","r4-removebg-preview.png","r5-removebg-preview.png","r6-removebg-preview.png");
  gameOverImg=loadImage("gameover-removebg-preview.png");
  zo_running=loadAnimation("ske1.png","ske2.png");
  restartImg=loadImage("restart.png");
  zo1_running=loadAnimation("zo1-removebg-preview.png","zo11-removebg-preview.png");
  coinImg=loadImage("coin.png");
  clo=loadImage("clo-removebg-preview.png");
 back=loadImage("bac11.png");
 musde=loadSound("mixkit-arcade-space-shooter-dead-notification-272.wav");
  musbo=loadSound("mixkit-arcade-video-game-bonus-2044.wav");
  musju=loadSound("mixkit-sci-fi-positive-notification-266.wav");
}

function setup() {
 createCanvas(displayWidth,displayHeight);
  
 var message = "This is a message";
 console.log(message);
 gameOver = createSprite(displayWidth/2,displayHeight/2- 10);
  gameOver.addImage(gameOverImg);
  restart = createSprite(displayWidth/2,displayHeight/2);
  restart.addImage(restartImg);
   gameOver.scale = 0.05;
  restart.scale = 0.5;
 
  you = createSprite(50,displayHeight-190,20,50);
  you.x=camera.position.x;
  
  you.addAnimation("yourunning", you_running);
  
  you.setCollider('rectangle',0,0,160,250);
  you.scale = 0.4;
  you.debug=false;
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  gameOver.scale = 1;
  restart.scale = 1;
  invisibleGround = createSprite(displayWidth/50,displayHeight-5,displayWidth+10000,125);  
  invisibleGround.shapeColor = "#AECBA1";
   gameOver.visible = false;
  restart.visible = false;
}

function draw() {  
  background(back);
  you.x=camera.position.x;
  drawSprites();
  
  textSize(20);
  fill("#FFF700");
  text("Score: "+ score,30,50);
 
  if (gameState===PLAY){
   console.log("inside play")
    invisibleGround.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && you.y  >= displayHeight-120) {
      console.log("inside if")
      you.velocityY = -15;
      musju.play();
       touches = [];
    }
    you.velocityY = you.velocityY + 0.8
    if(coinsGroup.isTouching(you)){
      score=score+1;
      musbo.play();
      coinsGroup[0].destroy();
    }
    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
    you.collide(invisibleGround);
    
    spawnClouds();
    spawnObstacles();
    spawnCoins();
    if(obstaclesGroup.isTouching(you)){
      musde.play();
        gameState = END;
    }
  }else if (gameState === END){
      gameOver.visible=true;
      restart.visible=true;
    you.visible=false;
    coinsGroup.setVelocityXEach(0);
     you.velocityX=0;
    coinsGroup.setLifetimeEach(-1);
    invisibleGround.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);        
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);  
    coinsGroup.destroyEach(); 
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    if(touches.length>0 || mousePressedOver(restart)) {   
      reset();
      touches = []
      }
    
}

function reset(){
   gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  you.visible = true;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
 
  score = 0;
}

function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1500,displayHeight-95,20,30);
    obstacle.setCollider('circle',0,0,45)
      
    obstacle.velocityX = -(6 + 2*score/10);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addAnimation("zo1",zo1_running);
              break;
      case 2: obstacle.addAnimation("zo",zo_running);
              break;
    
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2    ;
    obstacle.lifetime = 300;
    obstacle.depth = you.depth;
    you.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds(){
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth+20,displayHeight-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage("cloud",clo);
     console.log("inside spawn cloud")
    cloud.scale = 0.050;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = you.depth;
    you.depth = you.depth+1;
    
    
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
  
  function spawnCoins(){
    if (frameCount % 60 === 0) {
    var coin = createSprite(600,800,40,10);
    coin.y = Math.round(random(400,320));
    coin.addImage(coinImg);
    coin.scale = 0.1;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = you.depth;
    you.depth = you.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
  } 
}