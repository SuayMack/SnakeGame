// selecionar nossa tela, e obterContext('2d') da nossa tela
//getContext ('2d'), tem propriedades e métodos que nos permitem desenhar e fazer
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unit
//Vou usar box = 32 pixels,box aqui é como uma unidade
//porque nossa cobra é um quadrado,é largura e altura igual a 32px por padrão. 
//também teremos que mover nossa cobra em qualquer direção, por uma box de cada vez.
//E a posição alimentar é dada usando nossa unidade de box.
const box = 32;


//criar a cobra
let snake = [];
snake[0] = {x: 9 * box, y: 10 * box};

// load images
const ground = new Image();
ground.src = "/img/ground.png";

const foodImg = new Image();
foodImg.src = "/img/food.png";

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

function draw() {
    ctx.drawImage(ground, 0, 0);
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}
let game = setInterval(draw, 100);

//criar a posição aleatória dos alimentos
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box
}