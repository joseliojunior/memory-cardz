/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { GameEndScreen } from "./gameEndScreen.js";
import { GameTitleScreen } from "./gameTitleScreen.js";
import { InGame } from "./inGame.js";
import { GameTranslation } from "./gameTranslation.js";

export class Game {

    static properties = {
        gamePageDescription: document.getElementById('game-page-description'),
        content: document.getElementById('content'),
        get initBtn() { return document.getElementById('open-game-btn') },
        deck: 0,
        deckSize: 10,
        arr: [],
        score: 0,
        matches: 0
    };

    static init() {

        this.properties.gamePageDescription.innerHTML = GameTranslation.language().gamePageDescription;

        this.properties.initBtn.addEventListener('click', ()=> {

            const styleNode = document.createElement('style');
            styleNode.innerHTML = `
            @media only screen and (orientation:portrait) {
                body {
                    align-items: center;
                    justify-content: center;
                }
                #content {
                    height: 100vmin !important;
                    width: 100vmax !important;
                    transform: rotate(90deg);
                }
            }`;

            document.body.appendChild(styleNode);
            document.body.requestFullscreen();
            this.properties.content.style.display = 'flex';
            GameTitleScreen.create();
        });
    };

    static newGame() {

        const w = GameTranslation.language();

        this.properties.content.innerHTML = `
        <div id="current-game">
            <div id="game-timer" class="flex">
                <div id="pause-game-btn" class="p-btn flex">
                    ${w.pause}
                </div>
                <span>
                    <span>${w.score}</span>:
                    <span id="current-score">0</span>
                </span>
                <div>
                    <span id="game-timer-min">00</span>:<span id="game-timer-sec">00</span>
                </div>  
            </div>
            <div id="cardbox0" class="cardbox"></div>
            <div id="cardbox1" class="cardbox"></div>
        </div>`;
    
        const cardBoxA = document.getElementById('cardbox0');
        const cardBoxB = document.getElementById('cardbox1');
    
        const cardsArr = [];
        for (let i = 0; i < this.properties.deckSize; i++) {
            if (i >= this.properties.deckSize / 2) {
                cardsArr.push(`<div id="card${i}" class="card">
                <img src="/post/p1_memory_cardz/img/${i - this.properties.deckSize / 2}.png" class="front-face">
                </div>`);
            } else {
                cardsArr.push(`<div id="card${i}" class="card">
                <img src="/post/p1_memory_cardz/img/${i}.png" class="front-face">
                </div>`);
            };  
        };
        cardsArr.sort(() => Math.random() - 0.5);
    
        cardBoxA.innerHTML = `${cardsArr.slice(0, cardsArr.length / 2).join('')}`;
        cardBoxB.innerHTML = `${cardsArr.slice(cardsArr.length / 2 , cardsArr.length).join('')}`;
        
        setTimeout(() => {
            for (let i = 0; i <= 9; i++) { this.card(i); };

            const innerGame = document.getElementById('current-game');
            innerGame.style.transition = '400ms';
            innerGame.style.opacity = '100%';

            const innerGameTimer = document.getElementById('game-timer');
            innerGameTimer.style.transition = '400ms';
            innerGameTimer.style.opacity = '100%';
        }, 100);

        this.reveal(2000);
        setTimeout(() => { InGame.newTimer(); }, 900);

    };

    static reveal(timer) {
        const open = 'rotateY(0deg)';
        const close = 'rotateY(180deg)';
    
        for (let i = 0; i <= 9; i++) {
            const elem = document.getElementById(`card${i}`).style;
            elem.transition = '700ms';
            elem.transform = open;
            setTimeout(() => { elem.transform = close; }, timer);
        };
    };

    static flipper(quickElem) {

        const time = 700;
        const open = `rotateY(0deg) rotateZ(${
            Math.floor(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1)
        }deg) scaleY(1.2) scaleX(1.2)`;
        const close = 'rotateY(180deg)';
        const shadow = '15px 15px 20px #000000';
    
        const qElem = quickElem.style;
        qElem.transition = `${time}ms`;
        qElem.transform = open;
        qElem.boxShadow = shadow;
        qElem.zIndex = 1;
    
        const eA = document.getElementById(`card${this.properties.arr[0]}`);
        const eB = document.getElementById(`card${this.properties.arr[1]}`);
    
        if (this.properties.arr.length == 2 &&
            Math.abs(this.properties.arr[0] - this.properties.arr[1]) == (this.properties.deck / 2)) {
    
            this.properties.score += 1000;
            InGame.currentScore(1000);
    
            this.properties.matches++;
            this.endGame(this.properties.matches, this.properties.deck / 2);

            const pair = x => {
                const y = document.getElementById(`card${x}`);
                y.parentNode.replaceChild(y.cloneNode(true), y);
                
                setTimeout(() => {
                    const z = document.getElementById(`card${x}`);
                    z.style.transition = `${time}ms`;
                    z.style.transform = 'rotateZ(0deg) scaleY(1) scaleX(1)';
                    z.style.boxShadow = 'none';
                    z.style.zIndex = 0;
                }, time);
            };
    
            pair(this.properties.arr[0]);
            pair(this.properties.arr[1]);
            this.properties.arr = [];
        };
    
        if (this.properties.arr.length >= 2) {
            this.properties.score -= 500;
            InGame.currentScore(-500);
    
            eB.style.transition = `${time}ms`;
            eB.style.transform = open;
            eB.style.boxShadow = shadow;
            eB.style.zIndex = 1;
    
            this.properties.arr = [];
    
            const unpair = x => {
                x.style.transition = `${time}ms`;
                x.style.transform = close;
                x.style.boxShadow = 'none';
                x.style.zIndex = 0;
            };
    
            setTimeout(() => { unpair(eA); unpair(eB); }, time - 100);
        };
    };

    static card(value) {
        this.properties.deck++;
        
        const element = document.getElementById(`card${value}`);
        element.style.opacity = '100%';
    
        element.addEventListener('click', ()=> {
            this.properties.arr.push(value);
            this.flipper(element);
        });
    };

    static endGame(key, value) {
        if (key === value) {

            window.clearInterval(InGame.properties.gameTimer);

            const minutes = InGame.properties.minutes().innerHTML;
            const seconds = InGame.properties.seconds().innerHTML;

            const score = this.properties.score;
            const timeScore = (60 - ((minutes * 60) + seconds * 1)) * 10;
            const totalScore = score + timeScore;
    
            if (totalScore >= 5000 && timeScore >= 560) {
                GameEndScreen.create('ss', score, timeScore, totalScore);
            } else if (totalScore >= 5000 && timeScore >= 500) {
                GameEndScreen.create('s', score, timeScore, totalScore);
            } else if (totalScore >= 4500) {
                GameEndScreen.create('a', score, timeScore, totalScore);
            } else if (totalScore >= 3500) {
                GameEndScreen.create('b', score, timeScore, totalScore);
            } else if (totalScore >= 2500) {
                GameEndScreen.create('c', score, timeScore, totalScore);
            } else if (totalScore >= 1500) {
                GameEndScreen.create('d', score, timeScore, totalScore);
            } else {
                GameEndScreen.create('f', score, timeScore, totalScore);
            };
        };
    };

};