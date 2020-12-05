//Create variables here
var database;
var dog, happyDog;
var foodS, foodStock;

var dog_Img1, dog_Img2;
function preload()
{
	//load images here
dog_Img1 = loadImage("dogImg1.png");
dog_Img2 = loadImage("dogImg2.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  console.log(database);
  dog = createSprite(420,300,40,40);
  dog.addImage(dog_Img1);
  dog.scale=0.2
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87)
  drawSprites();
  
  //add styles here
textSize(35)
fill("red")
text("FoodStock: "+foodS,30,30)
textSize(25)
text("Press UP_ARROW To Feed The Pet",30,100);
if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dog_Img2);
  dog.scale=0.2
}
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}


