//form  class
class Form {
  //creating button,player input, greeting and title
  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('reset')
  }
  //once player has entered hide everything
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
//display
  display(){
    //title of game
    this.title.html("Car Racing Game");
    //position of title
    this.title.position(displayWidth/2 - 50, 0);
    //input and button position
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth - 100, 20);
    //if mousePressed then hide input and button
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      //save player name to databse
      player.name = this.input.value();
      //increase player count
      playerCount+=1;
      player.index = playerCount;
      //update database
      player.update();
      player.updateCount(playerCount);
      //greeting
      this.greeting.html("Hello " + player.name)
      //greeting position
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
  this.reset.mousePressed(()=>{
    player.updateCount(0)
    game.update(0)
  });
  }
}
