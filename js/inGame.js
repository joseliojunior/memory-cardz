/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { Game } from "./game.js";
import { GameTitleScreen } from "./gameTitleScreen.js";
import { GameTranslation } from "./gameTranslation.js";

export class InGame {

    static properties = {
        sec: 0,
        min: 1,
        hr: 0,
        gameTimer: 0,
        currentGameElem: () => document.getElementById('current-game'),
        pauseScreenElem: () => document.getElementById('pause-screen'),
        seconds: () => document.getElementById('game-timer-sec'),
        minutes: () => document.getElementById('game-timer-min'),
        pauseBtn: () => document.getElementById('pause-game-btn'),
        resumeBtn: () => document.getElementById('resume-btn'),
        resetGameBtn: () => document.getElementById('reset-game-btn'),
        mainMenuBtn: () => document.getElementById('main-menu-btn'),
        currentScoreElem: () => document.getElementById('current-score')    
    };

    static currentScore(value) {
        const currentValue = this.properties.currentScoreElem().innerHTML;
        this.properties.currentScoreElem().innerHTML = +currentValue + value;
    };

    static timer() {
        const self = InGame;

        if (self.properties.sec > 59) {
            self.properties.sec = 0;
        
            if (self.properties.min > 59) {
                self.properties.min = 0;
                self.resetProperties();
                setTimeout(() => { self.mainMenu(); }, 0);
            };
        
            if (self.properties.min < 10) {
                self.properties.minutes().innerHTML = `0${self.properties.min++}`;
            } else {
                self.properties.minutes().innerHTML = self.properties.min++;
            };
        };
        if (self.properties.sec < 10) {
            self.properties.seconds().innerHTML = `0${self.properties.sec++}`;
        } else {
            self.properties.seconds().innerHTML = self.properties.sec++;
        };
    };

    static pauseGame() {

        const w = GameTranslation.language();

        const paused = `
        <section id="pause-card" class="flexblock">
            <div id="resume-btn" class="p-btn flex">
                ${w.resume}
            </div>
            <div id="reset-game-btn" class="p-btn flex">
                ${w.resetGame}
            </div>
            <div id="main-menu-btn" class="p-btn flex">
                ${w.mainMenu}
            </div>
        </section>`;

        const pauseNode = document.createElement('div');
        pauseNode.id = 'pause-screen';
        pauseNode.classList = 'flex';
        pauseNode.innerHTML = paused;

        this.properties.currentGameElem().appendChild(pauseNode);

        setTimeout(() => {
            const pauseElem = this.properties.pauseScreenElem();
            pauseElem.style.transition = '1s';
            pauseElem.style.opacity = '100%';
        }, 0);

    };

    static resetProperties() {
        window.clearInterval(this.properties.gameTimer);
        this.properties.sec = 0;
        this.properties.min = 0;
        Game.properties.deck = 0;
        Game.properties.arr = [];
        Game.properties.score = 0;
        Game.properties.matches = 0;
    };

    static resetGame() {
        const currentGame = this.properties.currentGameElem();
        currentGame.style.transition = '700ms';
        currentGame.style.opacity = '0%';

        setTimeout(() => {
            this.resetProperties();
            currentGame.remove();
            Game.newGame();
        }, 700);
    };

    static mainMenu() {
        const currentGame = this.properties.currentGameElem();
        currentGame.style.transition = '700ms';
        currentGame.style.opacity = '0%';

        setTimeout(() => {
            this.resetProperties();
            currentGame.remove();
            GameTitleScreen.create();
        }, 700);
    };

    static newTimer() {

        let setTime = window.setInterval(this.timer, 1000);
        this.properties.gameTimer = setTime;

        this.properties.pauseBtn().addEventListener('click', () => {
            window.clearInterval(setTime);
            this.pauseGame();

            this.properties.resumeBtn().addEventListener('click', ()=> {
                const pauseElem = this.properties.pauseScreenElem();
                pauseElem.style.transition = '1s';
                pauseElem.style.opacity = '0%';
    
                setTime = window.setInterval(this.timer, 1000);

                setTimeout(() => {
                    pauseElem.remove();
                }, 1100);
            });

            this.properties.resetGameBtn().addEventListener('click', ()=> {
                this.resetGame();
            });

            this.properties.mainMenuBtn().addEventListener('click', ()=> {
                this.mainMenu();
            });
        });
    };

};