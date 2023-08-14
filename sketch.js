var fundoImg, fundo;
var ufoImg, ufo;
var fogueteImg, foguete;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var ufoGroup;

var score = 0;
var life = 3;

var gameState = "play";

//carregar imagens
function preload() {
fundoImg=loadImage("img/fundo.webp")
ufoImg = loadImage("img/ufo.png")
fogueteImg = loadAnimation("img/pacman.png")
explosaoImg = loadAnimation("img/explosao.png")
coinImg = loadImage("img/coin.png")
}


function setup() {
  createCanvas(800,800);

  //criar sprites
 fundo = createSprite(400,400)
 fundo.addImage(fundoImg)
 fundo.scale=1

 foguete = createSprite(400,400)
 foguete.addAnimation("foguete",fogueteImg)
 foguete.addAnimation("explosao",explosaoImg)
 foguete.scale=0.1
  
 coinGroup = new Group()
 ufoGroup = new Group()
}

function draw() {
  background(0);

  drawSprites();

  textSize(25)
  fill("white")
  text("Vida: " + life, 60,100)
  
  //criar estado de jogo "play"
  if (gameState =="play") 
  
     fundo.velocityY = 4;

  if (fundo.y > 800) 
     fundo.y = 400    
  
    if (keyDown("RIGHT_ARROW")){
       foguete.x +=5;
    }
    if (keyDown("LEFT_ARROW")){
      foguete.x -=5      
    }
    removeLife()
    removeCoins()
  
  //criar estado de jogo "end"
    if(gameState == "end") {
      //remover grupos
      coinGroup.destroyEach()
      ufoGroup.destroyEach()
      fundo.velocityY = 0
      foguete.velocityY = 0
      // mudar animaçao do fogute para explosao
      foguete.changeAnimation("explosao", explosaoImg)
      textSize(30)
      fill("orange")
      text("Game Over!!!", 300, 400)  
    }
  
  }

function spawnAliens() {
  if (frameCount % 60 == 0) {
    ufo = createSprite(random(30,770), random(10,450))
    ufo.addImage(ufoImg)
    ufo.velocityY = 3
    ufo.scale = 0.2
     //tempo de vida do sprite
     ufo.lifeTime = 800
     ufoGroup.add(ufo)
  }
}

function spawnCoins() {
  if (frameCount % 60 == 0){
    coin = createSprite(random(10, 790), random(10, 500));
    coin.addImage(coinImg);
    coin.velocityY = 3;
    coin.scale = 0.1;
    coin.lifeTime = 800;
    coinGroup.add(coin);
  }
 
}

function removeCoins() {
  foguete.overlap(coinGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

function removeLife() {
  foguete.overlap(ufoGroup, function(collector, collected){
   life -=1;
   collected.remove();
  })
 }