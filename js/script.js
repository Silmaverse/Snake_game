// all elemenst in js


let blocksize = 25;

let total_row = 17; // total row number
let total_col = 17; // total col number
let board= document.querySelector('#board');;
let context;


let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

let speedX = 0; // speed of snake in x coordinate
let speedY = 0; // speed of snake in y coordinate

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

function resizeCanvas() {
    // make canvas fill most of the window
    board.width = window.innerWidth * 0.8;
    board.height = window.innerHeight * 0.8;

    // calculate block size so rows/cols always fit
    blocksize = Math.floor(Math.min(board.width / total_col, board.height / total_row));
}

window.
window.onload = function () {
    // set board height and width
    resizeCanvas();
    
    context = board.getContext("2d");


    // place food randomly
    placeFood();
    document.addEventListener('keyup', changeDirection);

    // set snake speed
    setInterval(update ,1000 /10)

}

function update() {
    if (gameOver) {
        return;
    }
    
    // background of a game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    //Set food color and position
    context.fillStyle = "Yellow";
    context.fillRect(foodX, foodY, blocksize, blocksize)
    
    // when snake eat the food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--){

        // it will store previous part of the sanke to the current part
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blocksize;
    snakeY += speedY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }


    // out of boundary condition
    if (snakeX < 0 || snakeX >= total_col * blocksize || snakeY < 0 || snakeY >= total_row * blocksize) {
       
        context.font = "50px Arial"
        context.fillStyle = "red";
        context.fillText ("Game Over",110,212);
        
        gameOver = true;

    }

    // snake eats his own body
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;

        }
    }


}


// movement of the snake - we are using addevenetlistener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown"  && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }

     else if (e.code == "ArrowLeft" && speedX != 1) {
         speedX = -1;
         speedY = 0;
    }
    else if ( e.code == "ArrowRight"  && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}


// Randomly place food

function placeFood() {
    
    // in x coordinates
    foodX = Math.floor(Math.random() * total_col) * blocksize;

    // in y coordinates

    foodY = Math.floor(Math.random() * total_row) * blocksize;
}