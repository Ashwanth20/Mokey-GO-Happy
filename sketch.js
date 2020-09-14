var monkey, monkey_running

var banana, bananaImage;
var obstacle, obstacleImage;
var ground;

var bananaGroup;

var score = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 400);

  //creating a sprite for monkey
  monkey = createSprite(50, 160, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2

  //creating a sprite for ground
  ground = createSprite(500, 350, 600, 15)
  ground.x = ground.width / 2;

  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("lightblue");
    text("SCORE :", + score,550,50);

  //making the ground reset
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  //making monkey jump
  if (keyDown("space") && monkey.y >= 160) {
    monkey.velocityY = -12
  }

  //adding gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(ground);
  
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if (monkey.isTouching(obstacleGroup)){
   bananaGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   bananaGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1); 
   monkey.velocityY = 0; 
   text("GAME OVER", + score,150,0); 
    
 }
    

  spawnObstacles();
  spawnBanana();

  drawSprites();
  

  
}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600, 310, 15, 25);
    obstacle.velocityX = -7;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.lifetime = 300
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if (frameCount % 90 === 0) {
   var Y_rand = Math.round(random(0,200))
    banana = createSprite(300,Y_rand,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    bananaGroup.add(banana);
    banana.lifetime = 50
  
  }
}