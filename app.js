const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const Scoretext = document.getElementById('scoreval')


const width = gameBoard.width;
const height = gameBoard.height;

const Unit = 25;

let foodX;
let foodY;

let Xvelocity =25;
let Yvelocity=0;

let Score = 0;

let active  = true;

let started = false;

let snake = [

    {x:Unit*3,y:0},
    {x:Unit*2,y:0},
    {x:Unit,y:0},
    {x:0,y:0}

];

window.addEventListener('keydown',keypress);

startGame();

function startGame(){
    context.fillStyle = '#000080'
    context.fillRect(0,0,width,height)
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // clearBoard();
    // drawSnake();
    
}

function nextTick() {
    if(active){
    setTimeout(() =>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkgameover();
        nextTick();
    },200)
}
else{
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("Game Over!!",width/2,height/2);
}
}
function clearBoard (){
    context.fill = '#000080';
    context.fillRect(0,0,width,height);
}

function createFood(){
    foodX = Math.floor(Math.random()*width/Unit)*Unit;
    foodY = Math.floor(Math.random()*height/Unit)*Unit;
}

function displayFood(){
    context.fillStyle = '#008080'
    context.fillRect(foodX,foodY,Unit,Unit);
}

function drawSnake(){
    context.fillStyle = '#FFFFFF'
    context.strokeStyle = 'purple'
    snake.forEach((snakepart) => {
        context.fillRect(snakepart.x,snakepart.y,Unit,Unit);
        context.strokeRect(snakepart.x,snakepart.y,Unit,Unit);
    })
}

function moveSnake(){
    const head = {x:snake[0].x+Xvelocity,
    y:snake[0].y+Yvelocity};

    snake.unshift(head)
    if(snake[0].x == foodX && snake[0].y == foodY){
        Score +=1;
        Scoretext.textContent = Score;
        createFood();
    }else{
        snake.pop();
    }

}

function keypress(event){
    if(!started){
        started = true
        nextTick();
    }
    const Left = 37;
    const Up = 38;
    const Right = 39;
    const Down = 40;

    switch(true){
        case(event.keyCode==Left && Xvelocity!=Unit):
        Xvelocity=-Unit;
        Yvelocity=0;
        break;
        case(event.keyCode==Right && Xvelocity !=-Unit):
        Xvelocity=Unit;
        Yvelocity=0;
        break;
        case(event.keyCode==Up && Yvelocity != Unit):
        Xvelocity=0;
        Yvelocity=-Unit;
        break;
        case(event.keyCode==Down && Yvelocity != -Unit):
        Xvelocity=0;
        Yvelocity=Unit;
        break;
    }
}

function checkgameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>= width):
        case(snake[0].y < 0):
        case(snake[0].y >= height):
        active = false;
        break;
    }
    for(let i = 1 ; i< snake.length; i += 1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            active = false;
        }
    }
}