// elements 
//board
let blocksize ;
let total_row =20 ;
let total_col =20;
let board;
let context;
let gameOver = false;

//snake coordinates
let snakeX ;
let snakeY ;
let snakeBody = [];
// speed for snake
let speedX = 0;
let speedY = 0;


//food coordinates
let foodX, foodY
// scorcount;
let score =document.querySelector("")
let myInterval;

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
  
   myInterval = setInterval(update, 1000/5);
    
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
        snakeBody.push([foodX ,foodY])
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
        let fontsize = Math.floor(board.width / 15);
        context.font = fontsize+"px Arial";
        context.fillStyle = "red";
        context.fillText("Game Over" , board.width /3 ,board.height /3);
    
    }

    // self collision
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            let fontsize = Math.floor(board.width / 15);
            context.font = fontsize + "px Arial";
            context.fillStyle = "red";
            context.fillText("Game Over", board.width / 3, board.height / 3);
        }
    }



}

// changing direction of sanke in x and  y
function changeDirection(e) {
   
    if (e.code == "ArrowUp") {
        speedX = 0;
        speedY = -1;
        
    }

     else if (e.code == "ArrowDown") {
        speedX = 0;
        speedY = 1;
        
    }
    
      else if (e.code == "ArrowLeft") {
        speedX = -1;
        speedY = 0;
        

    }
    
    else if (e.code == "ArrowRight") {
        speedX = 1;
        speedY = 0;
       

    }
}

//randomly place the food
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blocksize;
    foodY = Math.floor(Math.random() * total_row) * blocksize;
}