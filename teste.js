let canvas = document.getElementById("snake"); //selecionamos a id que colocamos no index
let context = canvas.getContext("2d"); //o contexto renderiza o desenho que vai ter o canvas, aqui será um plano 2d
let box = 32; //cada quadradinho vai ter 32 pixels
let snake = []; //definindo como array
snake[0]={ //estabelecendo o tamanho pra poder trabalhar com o for lá na função criarCobrinha
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; //primeira definição de direção da cobrinha

//Definição da comidinha//
let food = {//criando array de comidinha, a ser usado na função drawFood
//não queremos que a comida apareça sempre no mesmo lugar, pra isso vamos usar dois métodos pra criar números aleatórios
//Math.floor: retira a parte flutuante do número gerado pelo random, ou seja, o 0,...
//Math.random: retorna sempre um número aleatório até 1
//ou seja, nos comandos abaixo, o tamanho do canvas está settado como 16, e o número aleatório vai multiplicar esse tamanho em x e y pra que apareça na coordenada correta

    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}



//FUNÇÃO CRIAR BACKGROUND//
//essa função é para criar o background do jogo
function criarBG(){
    context.fillStyle = "lightgreen"; //definindo a cor, fillstyle é o estilo do canvas
    context.fillRect(0, 0, 16*box, 16*box); //no index a largura e altura de 512 pixels foi settada; esse desenha o retângulo, onde acontece o jogo, trabalha com 4 parâmetros (x, y, altura e largura)
}


//FUNÇÃO CRIAR COBRINHA//
//a cobrinha vai ser um array de coordenadas
//esse array é porque vamos colocar um elemento no início e tirar um do final, que é a forma de a cobrinha andar
// na criação do quadradinho inicial da cobrinha, temos o valor settado inicialmente (por isso ela está no meio nesse ponto, apenas o quadradinho no meio)
function criarCobrinha(){ //vamos trabalhar com for pra criar a cobrinha, vai percorrer todo o array e incrementar
    //ele vai pintar o corpo dela de verde (que nem o fundo)
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); //tamanho em x e y que passamos lá em cima, e os tamanhos de box que são do quadradinho
    }

}


//DESENHAR A COMIDINHA//
//passando novamente elementos de contexto
function drawFood(){
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box); //as coordenadas do food e o tamanho do quadradinho, que sempre deve estar presente
}



//EVENTO PARA RECEBER OS COMANDOS DO JOGADOR, EVENT LISTENER//
//pega um evento de click do teclado para alterar a movimentação da cobrinha//
//a numeração do teclado é que faz essa referência
document.addEventListener('keydown', update);
function update (event){
    //esses ifs garantem que ela não vai add na direção contrária, por isso os && - pra não ficar com duas cabeças
    //o nossos não é daqueles que a cabeça volta
    //e ainda settam no final, pra onde ela vai se mover

    //FUNCIONAMENTO//você vai apertar uma tecla, o EventListener vai chamar o update e passar como argumento o evento de tecla que chamamos, de 37 a 40, como definido
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";


}






//FUNÇÃO INICIAR JOGO - DEFINIÇÃO DA MOVIMENTAÇÃO DA COBRINHA//
//lembrando que é um plano cartesiano, temos de 0 a 16, nessa função vamos inserir o funcionalidade de ela atravessar as paredes e aparecer do outro lado, pra não simplesmente sumir pelo plano indefinidamente; mudamos a propriedade dela quando ela chega nos extremos
//quando ela passar de qualquer lado do canvas a gente vai alterar o valor da posição, pra ela aparecer do outro lado
function iniciarJogo(){ //aqui vamos passar as outras funções para que inicie corretamente

        //FAZENDO A COBRINHA PASSAR DE UMA PAREDE PARA OUTRA: ALTERANDO PROPRIEDADES AO ATINGIR OS EXTREMOS
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //FUNÇÃO PARA FINALIZAR O JOGO//
    //criar um for pra comparar se a cabeça está se chocando contra qualquer posição, acionando o alert pra finalizar
    for (i=1; i<snake.length; i++){ //começamos no 1 porque ela já começa com cabeça, snake.lenght é o tamanho atual do array e depois incrementa
        if(snake[0].x == snake[i].x && snake[0].y == snnake[i].y){ //se a posição da cabeça, qualquer parte do corpinho, índice i, vamos parar o jogo
            clearInterval(jogo); //essa função já tinha sido estabelecida com 100ms anteriormente, nesse ponto fazemos com que a função de jogo seja terminada
            alert('Game Over :(');
        }

    }


    criarBG();
    criarCobrinha();
    drawFood ();

    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

    //MOVIMENTAÇÃO DA COBRINHA
    //vamos passar várias condicionais para fazer a movimentação, aumentando ou dimminuindo quadradinhos conforme os comandos
    if (direction == "right") snakeX += box; //se a direção for direita, a coordenada X vai adicionar um quadradinho
    if (direction == "left") snakeX -= box; //diminuindo para dar a ilusão de que está indo para a esquerda

    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;


     //APAGAR FINAL DA COBRINHA
     //snake.pop(); //a função pop é a que retira o último elemento do nosso array, que entrou na parte da comidinha


    //CONJUNTO DE CONDIÇÕES PARA QUE A COBRINHA CRESÇA AO COMER A COMIDINHA//
    //verificando a posição da cobrinha; caso a posição da cobrinha
    //caso a posição x,y da cobrinha seja diferente da posição x,y da comidinha, ela vai retirar o último elemento da cobrinha
    //caso seja igual, ela vai aumentar e a gente vai passar de novo a função de girar a comidinha, e quando ela passar por cima a comidinha aparecer em outro lugar
    if(snakeX != food.x || snakeY != food.y){ //a função pop é ativada, pra perder um pedaço da cobrinha
        snake.pop();
    }else{ //a comidinha recebe um novo ponto aleatório
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }





    //ADICIONAR CABEÇA DA COBRINHA
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //nesse ponto inicialmente temos a cobrinha sumindo depois que passa pra um determinado lado, até porque estabelecemos inicialmente apenas right pra ela, então ela corre e some por uma parede


}

let jogo= setInterval(iniciarJogo,100); //esse comando faz a renovação a cada 100 milissegundos pra que ele não trave


//agora precisamos settar os movimentos da cobrinha, pra fazer o jogo direito; para isso precisamos criar variável pra movimentação dela

//estabelecer função para movimentação, para parar o jogo