// selecionar nossa tela, e obterContext('2d') da nossa tela
//getContext ('2d'), tem propriedades e métodos que nos permitem desenhar
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unit
//Vou usar box = 32 pixels,box aqui é como uma unidade
//porque nossa cobra é um quadrado,é largura e altura igual a 32px por padrão. 
//também teremos que mover nossa cobra em qualquer direção, por uma box de cada vez.
//E a posição alimentar é dada usando nossa unidade de box.
const box = 32;

// load images
const ground = new Image();
ground.src = "/resources/img/ground.png";

const foodImg = new Image();
foodImg.src = "/resources/img/food.png";

// create Snake
let snake = [];
snake[0] = {x: 9 * box, y: 10 * box};// iniciar a Snake em um lugar definido

//create the random position of the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//create score
let score = 0;

//draw everything to the canvas
function draw() {
    ctx.drawImage(ground, 0, 0);
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    ctx. fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100ms
let game = setInterval(draw, 100);
/*
// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
*/