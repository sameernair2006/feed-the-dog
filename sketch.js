var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedthedog = createButton("Feed the Dog");
  feedthedog.position(700,95);
  feedthedog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = database.ref('FoodTime');
        lastFed.on("value",function(data){

            FoodTime = data.val();

        })
  
 
  //write code to display text lastFed time here
  if(lastFed >= 12){
    text("Last Feed : " + hr +" PM",350,30);
  }else if(lastFed === 0){
    text("Last Feed : " + hr +" AM",350,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  
  if(foodS > 0){
    foodS--;
  }
  

  var hr = hour();
  database.ref('/').update({
    Food : foodS,
    FoodTime : hr
    })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
