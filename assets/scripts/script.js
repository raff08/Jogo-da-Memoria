const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

let techs = [
  "bootstrap",
  "css",
  "electron",
  "firebase",
  "html",
  "javascript",
  "jquery",
  "mongo",
  "node",
  "react",
];

let cards = null;

startGame();

function startGame() {

  cards = createCardsFromTechs(techs);
  shuffleCards(cards); /*Função para embaralhar as cartas */ 
  initializeCards(cards); /*Essa função vai pegar o modelo das cartas e transformar em algo visual */ 

}



  function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");

    cards.forEach(card => {                                     /* Criando a div card onde vai ser inserido outras duas divs (front e back)*/     
        let cardElement = document.createElement('div');
        
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement); 

        cardElement.addEventListener('click', flipCard); 
       
        gameBoard.appendChild(cardElement);

    })

  }

 function createCardContent (card, cardElement) { /* Criando 2 divs, card front e card back*/

    createCardFace (FRONT, card, cardElement);
    createCardFace (BACK, card, cardElement);

  }

  function createCardFace(face, card, element){

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
   
    if (face === FRONT) { /*Conteudo da cart front */ 
      
      let iconElement = document.createElement('img');
      iconElement.classList.add(ICON);
      iconElement.src = "./assets/images/" + card.icon + ".png";
      cardElementFace.appendChild(iconElement);

    } else { /*Conteudo da card back */ 
      cardElementFace.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementFace); 

  } 



function shuffleCards(cards){

  let currentIndex = cards.length; /*Embaralhamento das cartas atraves do tamanho do array */ 
  let randomIndex = 0;  

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex); /*Vamos pegar a ultima carta e trocar de lugar com um valor aleatorio dentro do array */ 
    currentIndex--; /*Diminuir o Index para que a ultima carta que foi embaralhada não ser novamente embaralhada */ 

    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]; /*Invertendo os valores */ 

  }

}

function createCardsFromTechs(techs) {

  let cards = [];

    techs.forEach ((tech) => {
        cards.push(createPairFromTech(tech)); /* Colocando dentro de 'cards' os objetos criados na função CreatePairFromTech */
    })

  return (cards.flatMap(pair => pair)); /* Retornado um array com as cartas*/
  /* flatMap está separando os arrays que estao 2 a 2 */

}

function createPairFromTech(tech) { /* Passando o par das cartas da mesma tech */
  return [
    {
      id: createIdWithTech(tech), 
      icon: tech,
      flipped: false,
    },
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipped: false,
    },
  ];
}

function createIdWithTech(tech) {
  return tech + parseInt(Math.random() * 1000); /*Dando um valor randomico inteiro para cada carta do par*/
}


function flipCard() {
  
  this.classList.add("flip")

}