/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { InGame } from "./inGame.js";
import { GameTranslation } from "./gameTranslation.js";

export class GameEndScreen {

    static properties = {
        currentGameElem: () => document.getElementById('current-game'),
        resetGameBtn: () => document.getElementById('reset-game-btn'),
        mainMenuBtn: () =>  document.getElementById('main-menu-btn') 
    };

    static create(rankLetter, score, timeBonusScore, totalScore) {

        const w = GameTranslation.language();

        const endScreen = `
            <section id="end-card" class="flex">
                <section class="flexblock half-card1">
                    <div id="rank" class="flex grey-card">
                        <img src="../img/rank${rankLetter}.png">
                    </div>
                    <span>rank</span>
                </section>
                <section class="flexblock half-card2">
                    <div id="end-score" class="flexblock grey-card">
                        <span class="score-desc">${w.score}</span>
                        <span>${score} <sub>pts</sub><br></span>
                        <span class="score-desc">${w.timeBonus}</span>
                        <span>${timeBonusScore} <sub>pts</sub><br></span>
                        <span class="score-desc">${w.totalScore}</span>
                        <span>${totalScore} <sub>pts</sub><br></span>
                    </div>
                    <div id="reset-game-btn" class="e-btn flex">
                        ${w.resetGame}
                    </div>
                    <div id="main-menu-btn" class="e-btn flex">
                        ${w.mainMenu}
                    </div>
                </section>
            </section>`;

        const endNode = document.createElement('div');
        endNode.id = 'end-screen';
        endNode.classList = 'flex';
        endNode.innerHTML = endScreen;
        this.properties.currentGameElem().appendChild(endNode);

        setTimeout(() => {
            const endCard = document.getElementById('end-screen');
            endCard.style.transition = '1s';
            endCard.style.opacity = '100%';
        }, 0);

        this.properties.resetGameBtn().addEventListener('click', ()=> {
            InGame.resetGame();
        });
        this.properties.mainMenuBtn().addEventListener('click', ()=> {
            InGame.mainMenu();
        });

    };

};

