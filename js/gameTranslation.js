/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
export class GameTranslation {

    static ver = '1.0';

    static cLang = null;

    static language() {
        if (this.cLang == null) {
            this.cLang = navigator.language;
            return this.cLang == 'en' || this.cLang == 'en-US' ? this.en 
            : this.cLang == 'pt' || this.cLang == 'pt-BR' ? this.pt 
            : this.en;
        } else return this.cLang == 'en' || this.cLang == 'en-US' ? this.en 
            : this.cLang == 'pt' || this.cLang == 'ept-BR' ? this.pt 
            : this.en;
    };

    static en = {

        // Page description
        gamePageDescription: `
        <div id="game-page-d-box" class="flex">            
            <img id="game-img" src="/post/p1_memory_cardz/img/cards.png">
            <div class="flexblock">
                <p> 
                    This project is a 10 card memory game.
                </p>
                <p> 
                    The main objective is to find the pairs of cards in the shortest time possible. 
                </p>
                <p> 
                    Also, the least amount of moves, the better  your final score will be. 
                </p>
                <p> 
                    Come on, just click the button below! 
                </p>
                <div id="open-game-btn" class="i-btn flex"> play </div>
            </div>
        </div>`,

        // Title screen
        version: `version ${this.ver}`,
        newGame: 'new game',
        language: 'language',
        about: 'about',
        quit: 'quit',
        githubMsg: 'Star me on Github',
    
        // About screen
        back: 'back',
        aboutMsg: `
        <p>
            This is a personal project of memory game of 10 cards.
        </p>
        <p>
            The main goal is to find all pairs in the shortest time possible and with the least amount of moves.
        </p>
        <p>
            All cards will be revealed at the start of the game for 2 seconds and after they are flipped the timer will start running.
        </p>
        <p>
            At the end of the game you will get your score, the time bonus score, the total score and your rank.
        </p>
        <p class="flex about-author">
            <img src="../../img/me.png">
            <span>
                Created by:<br>
                Josélio de S. C. Júnior 
            </span>
        </p>
        <div class="flex">
            <p class="flex about-contacts">
                <a id="game-link-1" href="https://github.com/joseliojunior" class="flex">
                <img src="../../img/githubIcon.png">
                </a>
                <a id="game-link-2" href="https://www.linkedin.com/in/josélio-de-souza-cavalcante-júnior-ba66791a3" class="flex">
                    <img src="../../img/linkedinIcon.png">
                </a>
                <a id="game-link-3" href="https://www.artstation.com/josliojnior" class="flex">
                    <img src="../../img/artstationIcon.png">
                </a>
            </p>
        </div>`,
    
        // In game
        pause: 'pause',
        resume: 'resume',
        mainMenu: 'main menu',
    
        // End screen
        score: 'score',
        timeBonus: 'time bonus',
        totalScore: 'total score',
        resetGame: 'reset game',
    };
    
    static pt = {

        // Page description
        gamePageDescription: `
        <div id="game-page-d-box" class="flex">            
            <img id="game-img" src="/post/p1_memory_cardz/img/cards.png">
            <div class="flexblock">
                <p> 
                    Este projeto é um jogo da memória de 10 cartas. 
                </p>
                <p> 
                    O objetivo principal é encontrar os pares de cartas no menor tempo possível. 
                </p>
                <p> 
                    Além disso, quanto menor a quantidade de movimentos, melhor será sua pontuação final. 
                </p>
                <p> 
                    Vamos lá, basta clicar no botão abaixo! 
                </p>
                <div id="open-game-btn" class="i-btn flex"> jogar </div>
            </div>
        </div>`,

        // Title screen
        version: `versão ${this.ver}`,
        newGame: 'novo jogo',
        language: 'idioma',
        about: 'sobre',
        quit: 'sair',
        githubMsg: 'Favorite-me no Github',
    
        // About screen
        back: 'voltar',
        aboutMsg: `
        <p>
            Este é um projeto pessoal de jogo da memória de 10 cartas.
        </p>
        <p>
            O objetivo principal é encontrar todos os pares de cartas no menor tempo possível e com a menor quantidade de movimentos.
        </p>
        <p>
            Todas as cartas serão reveladas ao início do jogo por 2 segundos e logo após viradas o temporizador começará a rodar.
        </p>
        <p>
            Ao final do jogo você receberá sua pontuação, a pontuação bônus de tempo, a pontuação total e seu rank.
        </p>
        <p class="flex about-author">
            <img src="../../img/me.png">
            <span>
                Criado por:<br>
                Josélio de S. C. Júnior 
            </span>
        </p>
        <div class="flex">
            <p class="flex about-contacts">
                <a id="game-link-1" href="https://github.com/joseliojunior" class="flex">
                <img src="../../img/githubIcon.png">
                </a>
                <a id="game-link-2" href="https://www.linkedin.com/in/josélio-de-souza-cavalcante-júnior-ba66791a3" class="flex">
                    <img src="../../img/linkedinIcon.png">
                </a>
                <a id="game-link-3" href="https://www.artstation.com/josliojnior" class="flex">
                    <img src="../../img/artstationIcon.png">
                </a>
            </p>
        </div>`,
    
        // In game
        pause: 'pausar',
        resume: 'retornar',
        mainMenu: 'menu principal',
    
        // End screen
        score: 'pontuação',
        timeBonus: 'bonus de tempo',
        totalScore: 'pontuação total',
        resetGame: 'resetar jogo',
    };
}