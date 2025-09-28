// elements 
//board
let blocksize ;
let total_row =20 ;
let total_col =20;
let board;
let context;
let gameOver = false;
let gameOverSound = new Audio("../src/gameover.mp3")

//snake coordinates
let snakeX ;
let snakeY ;
let snakeBody = [];
// speed for snake
let speedX = 0;
let speedY = 0;


//food coordinates
let foodX, foodY
let foodeat = new Audio("../src/food.mp3")
// scorcount;
let score =document.querySelector(".score");
let scorcount=0;
// button
let btn =document.querySelector('button');
let myInterval;

    // level
   let level = document.querySelector(".gamelevel");
  // define speeds for each level (ms per update)
    const speedMap = {
        "Easy": 500,     // slower
        "Medium": 200,   // medium
        "Hard": 100      // fast
    };

    // function to start interval
    function startGameInterval(levelValue) {
        clearInterval(myInterval);
        let speed = speedMap[levelValue] || 500; // default Easy
        myInterval = setInterval(update, speed);
    }

    // listen for level change
    level.addEventListener("change", function () {
        startGameInterval(this.value);
        this.blur();
    });

window.onload = function () {

    board = document.querySelector("#board");

    board.width = (window.innerWidth * 0.8);
    board.height = (window.innerHeight * 0.8);

    blocksize = Math.floor(Math.min(board.width / total_col, board.height / total_row));

    total_col = Math.floor(board.width / blocksize);
    total_row = Math.floor(board.height / blocksize);

    snakeX = blocksize * 5;
    snakeY = blocksize * 5;


    context = board.getContext("2d");
  
    document.addEventListener('keydown', changeDirection);

    // place the food

    placeFood();

     // start with default level from select
    startGameInterval(level.value);
    
}

// update the function
function update() {
 
    if (gameOver) {
        clearInterval(myInterval);
        return;
    }
    
 

    //make board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //make food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);


    if (snakeX === foodX && snakeY === foodY) {
        scorcount+=1;
        score.innerHTML=`Score : ${scorcount}`
        snakeBody.push([foodX ,foodY])
        foodeat.play();
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = [...snakeBody[i - 1]];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    //make sanke
    context.fillStyle = "lime";
    snakeX += speedX * blocksize;
    snakeY += speedY * blocksize;
    // Snap head to grid (avoid floating point errors)
    snakeX = Math.round(snakeX / blocksize) * blocksize;
    snakeY = Math.round(snakeY / blocksize) * blocksize;

    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    context.beginPath();
    context.moveTo(snakeX, snakeY ); // TOP-left
    context.lineTo(snakeX , snakeY + blocksize -1); // bottom-left
    context.strokeStyle = "black"; // border color
    context.lineWidth = 2;
    context.stroke();


    // Draw bottom border for head
    context.beginPath();
    context.moveTo(snakeX, snakeY + blocksize - 1); // bottom-left
    context.lineTo(snakeX + blocksize, snakeY + blocksize - 1); // bottom-right
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();

    for (let i = 0; i < snakeBody.length; i++){
       context.fillStyle = "lime";
       context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);

     // Left vertical line for each segment
        context.beginPath();
        context.moveTo(snakeBody[i][0], snakeBody[i][1]); // top-left
        context.lineTo(snakeBody[i][0], snakeBody[i][1] + blocksize); // bottom-left
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();
        

         context.beginPath();
         context.moveTo(snakeBody[i][0], snakeBody[i][1] + blocksize - 1); // bottom-left
         context.lineTo(snakeBody[i][0] + blocksize, snakeBody[i][1] + blocksize - 1); // bottom-right
         context.strokeStyle = "black";
         context.lineWidth = 2;
         context.stroke();
    }
 

    // check boundary
    if (snakeX <0 || snakeX >board.width || snakeY < 0 || snakeY > board.height ) {
      
        gameOver = true;
        gameOverSound.play();
        let fontsize = Math.floor(board.width / 15);
        context.font = fontsize+"px Arial";
        context.fillStyle = "red";
        context.fillText("Game Over" , board.width /3 ,board.height /3);

        btn.style="visibility :visible";
        level.style ="visibility :hidden";
        
    
    }

    // self collision
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            gameOverSound.play();
            let fontsize = Math.floor(board.width / 15);
            context.font = fontsize + "px Arial";
            context.fillStyle = "red";
            context.fillText("Game Over", board.width / 3, board.height / 3);

             btn.style="visibility :visible";
             level.style ="visibility :hidden";
        }
    }



}

// changing direction of sanke in x and  y
function changeDirection(e) {
   
    if (e.code == "ArrowUp" && speedX !=1) {
        speedX = 0;
        speedY = -1;
        
    }

     else if (e.code == "ArrowDown" && speedY!=-1) {
        speedX = 0;
        speedY = 1;
        
    }
    
      else if (e.code == "ArrowLeft" && speedX !=1) {
        speedX = -1;
        speedY = 0;
        

    }
    
    else if (e.code == "ArrowRight"  && speedX !=-1) {
        speedX = 1;
        speedY = 0;
       

    }
}

//randomly place the food
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blocksize;
    foodY = Math.floor(Math.random() * total_row) * blocksize;
}


// resatrt the game
function restart(){
    location.reload();
}