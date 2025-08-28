const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.jogador');
const timer = document.getElementById('timer');
const minuto = document.getElementById('minuto');
const twoPoints = document.getElementById('TwoPoints');
var valores = 0;
// personagens/cartas definidas para o lvl facil
// usado uma constante, pois as cartas(personagens), não vão mudar

const personagens = [
  'cartaAlice_frente',
  'cartaChapeleiro_frente',
  'cartaGatoRisonho_frente',
  'cartaLebre_frente',
  'cartaCoelho_frente',
  'cartaRainhaBranca_frente',
  'cartaBonusTempo_frente',
  'cartaCharada_frente',
];

// a função createElement cria um novo elemento HTML especificando e adicionando a classe className
const createElement = (tag, className) => { // meu argumento determina o tipo de elemento dentro
  const element = document.createElement(tag); // que foi armazenado na minha constante
  element.className = className;
  return element; // retornando o elemento criado, junto com a classe className aplicada
}

//minhas variaveis das cartas
let primeiraCarta = '';
let segundaCarta = '';

//função arrow chamada checkEndGame, faz ao ser chamada uma verificação se o jogo chegou ao fim
//l30 -> seleciona todos os elementos no DOM que possuem a classe desabilitar-carta, onde a cartaDesabilidata contem todos os elementos
const checkEndGame = () => {
let desabilidaCarta = document.querySelectorAll('.desabilitar-carta');
  //if comprimento da classe desabilitar-carta é igual a 10 == todas as 10 cartas do jogo foram desabilitadas
  // se for verdadeira, a função clearInterval(this.loop) é chamada para parar o timer do jogo e aparece a msg de parabens
  if (valores === 8) {
    const minutoPlayer = 1 - minuto.innerHTML;
    const segundoPlayer = 60 - timer.innerHTML;
    const dificuldade = "Dificil";
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${1 - minuto.innerHTML}:${60 - timer.innerHTML}`);
    localStorage.setItem('minutoPlayer', minutoPlayer);
    localStorage.setItem('segundoPlayer',segundoPlayer);
    localStorage.setItem('dificuPlayer',dificuldade);
    if(window.confirm("deseja jogar novamente?")){
      window.location.reload();
    } else {
    window.location.replace("http://127.0.0.1:5500/index.html");
  }
  }
}


// verificando se as cartas são iguais
const checkCartas = () => {
  const primeiroPersonagem = primeiraCarta.getAttribute('data-character');
  const segundoPersonagem = segundaCarta.getAttribute('data-character');

  if (primeiroPersonagem === segundoPersonagem) {

    primeiraCarta.firstChild.classList.add('desabilitar-carta');
    segundaCarta.firstChild.classList.add('desabilitar-carta');
    valores = valores + 1;
    primeiraCarta = '';
    segundaCarta = '';


    checkEndGame();

  } else {
    setTimeout(() => {

      primeiraCarta.classList.remove('revelar-carta');
      segundaCarta.classList.remove('revelar-carta');

      primeiraCarta = '';
      segundaCarta = '';

    }, 500);
  }

}

const revelarCarta = ({ target }) => { //função recebe um objeto como argumento e a propriedade target desse objeto é tirada diretamente

  //função verifica se o parentNode (pai) do elemento alvo (target) já possui uma classe revelar-carta. Se for verdadeira a função retorna imediatamente, bloqueando qualquer outra ação extra
  if (target.parentNode.className.includes('revelar-carta')) {
    return;
  }

  if (primeiraCarta === '') {

    target.parentNode.classList.add('revelar-carta');
    primeiraCarta = target.parentNode;

  } else if (segundaCarta === '') {

    target.parentNode.classList.add('revelar-carta');
    segundaCarta = target.parentNode;

    checkCartas(); //chama a função para verificar se as cartas sao iguais

  }
}

//elementos divs criados 
const createCarta = (character) => {

  const carta = createElement('div', 'carta');
  const frente = createElement('div', 'face frente');
  const traseira = createElement('div', 'face traseira');

  //traseira da carta
  frente.style.backgroundImage = `url('/img/${character}.png')`

  //Junta a frente e a parte traseira da carta ao conteiner carta
  carta.appendChild(frente);
  carta.appendChild(traseira);

  //Add um atributo chamado data-character ao conteiner da carta, guardando o nome do personagem
  carta.addEventListener('click', revelarCarta);
  carta.setAttribute('data-character', character)

  return carta; //Retorna ao conteiner a carta completa + evento de clique e atributos
}

//função chamada loadGame, sendo responsável por carregar o jogo + criar + organizar as cartas.
const loadGame = () => {
  const duplicatePersonagens = [...personagens, ...personagens]; //Usa o operador spread (...) para criar um novo array que tem duas cópias do array personagens. Fazendo funcionar os pares das cartas correspondentes 

  const shuffledArray = duplicatePersonagens.sort(() => Math.random() - 0.5); // Embaralha o array duplicatePersonagens usando o método sort, com um valor aleatorio (Math.random() - 0.5)

  shuffledArray.forEach((character) => {  // forEach vai percorrer todos os elementos do array shuffledArray -> 
    const carta = createCarta(character);  // para cada character, a função createCarta é chamada e executada -> 
    grid.appendChild(carta); // cada carta criada é adicionada ao conteiner grid
  });
}

// função startTimer inicia um temporizador que add o valor exibido pelo elemento timer em 1 a cada segundo
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = + timer.innerHTML;
    const currentMin = + minuto.innerHTML;
    if(timer.innerHTML == 1 && minuto.innerHTML == 0){
      if(window.confirm("deseja jogar novamente?")){
        timer.innerHTML = currentTime + 30;
        minuto.innerHTML = currentMin + 1;
      } else {
      timer.innerHTML = "."
      minuto.innerHTML = "fim "
      twoPoints.innerHTML = "do jogo"
      }
    } else {
    if(timer.innerHTML == 0){
      minuto.innerHTML = currentMin -1;
    }
    if(timer.innerHTML > 0){
      timer.innerHTML = currentTime - 1;
    } else if (timer.innerHTML != ".") {
      timer.innerHTML = currentTime + 59;
    }
  }
  //checkEndGame();
  }, 1000);
}

// Atualiza o nome do jogador exibido ->
//Inicia o temporizador do jogo ->
//Carrega e configura o tabuleiro do jogo de memória ->
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('jogador');
  startTimer();
  loadGame();
}