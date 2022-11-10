let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"],

      cards: null,

    setCard: function(id){

        let card = this.cards.filter(card => card.id===id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function(){
        if (!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;

    },

    clearCards: function(){

        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;

    },

    unflipCards() {

        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();

    },

    checkGameOver(){

       return this.cards.filter(cards=>!cards.flipped).length == 0;

    },
    
    

      createCardsFromTechs: function() {

        this.cards = [];
      
          this.techs.forEach ((tech) => {
              this.cards.push(this.createPairFromTech(tech)); /* Colocando dentro de 'cards' os objetos criados na função CreatePairFromTech */
          })
        this.cards = this.cards.flatMap(pair => pair); /* flatMap está separando os arrays que estao 2 a 2 */
        this.shuffleCards();
        //return this.cards;
      },
      
        createPairFromTech: function (tech) { /* Passando o par das cartas da mesma tech */
        return [
          {
            id: this.createIdWithTech(tech), 
            icon: tech,
            flipped: false,
          },
          {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
          },
        ];
      },
      
     createIdWithTech: function(tech) {
        return tech + parseInt(Math.random() * 1000); /*Dando um valor randomico inteiro para cada carta do par*/
      },

      shuffleCards: function(cards){

        let currentIndex = this.cards.length; /*Embaralhamento das cartas atraves do tamanho do array */ 
        let randomIndex = 0;  
      
        while (currentIndex !== 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex); /*Vamos pegar a ultima carta e trocar de lugar com um valor aleatorio dentro do array */ 
          currentIndex--; /*Diminuir o Index para que a ultima carta que foi embaralhada não ser novamente embaralhada */ 
      
          [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]; /*Invertendo os valores */ 
      
        }
      
      }





}