//game class
class Game {
  //empty constructor because everything has been created in the database
  constructor(){

  }
  //refer to the database to get the gameState
  getState(){
    var gameStateRef  = database.ref('gameState');
    //keep on reading database over and over
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }
  //update database
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    //if the gameState = 0 then create a new player
    if(gameState === 0){
      player = new Player();
      //refer to database for playerCount only once
      var playerCountRef = await database.ref('playerCount').once("value");
      //if the playerCount exists then do the function getCount()
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      //create new form
      form = new Form()
      //display form
      form.display();
    }
    //creating the cars and adding the images
    car1 = createSprite(100,200);
    car1.addImage(car1IMG);
    car2 = createSprite(300,200);
    car2.addImage(car2IMG);
    car3 = createSprite(500,200);
    car3.addImage(car3IMG);
    car4 = createSprite(700,200);
    car4.addImage(car4IMG);
    cars = [car1, car2, car3, car4];
  }

  play(){
    //hide the form
    form.hide();
    //get the info of the players
    Player.getPlayerInfo();
    //calling the function
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(49,251,69))
      image(trackIMG,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,60,60)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    //movement of the car
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //if the car reaches 4250m then change gameState to end(2)
    if(player.distance>4250){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
}