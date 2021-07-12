/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { Game } from "./game.js";
import { GameAbout } from "./gameAbout.js";
import { GameTranslation } from "./gameTranslation.js";

export class GameTitleScreen {

    static elem = {
        titleScreen: () => document.getElementById('title-screen'),
        newGame: () => document.getElementById('new-game-btn'),
        about: () => document.getElementById('about-game-btn'),
        language: () => document.getElementById('language-game-btn'),
        quit: () => document.getElementById('quit-game-btn')
    };

    static create() {

        const w = GameTranslation.language();

        const titleScreen = `
        <section id="title-screen" class="flex" style="opacity: 0%;">
            <section id="title-card" class="flexblock">

                <section id="game-logo" class="flexblock">
                   <span>MEMORY</span> 
                   <span>CARDZ</span>
                   <span id="game-version">${w.version}</span> 
                </section>

                <section id="title-btn-box" class="flexblock">

                    <div id="new-game-btn" class="t-btn flex">
                        ${w.newGame}
                    </div>
                    <div id="language-game-btn" class="t-btn flex">
                        ${w.language}
                    </div>
                    <div id="about-game-btn" class="t-btn flex">
                        ${w.about}
                    </div>
                    <div id="quit-game-btn" class="t-btn flex">
                        ${w.quit}
                    </div>

                </section>

                <section id="github-msg-box">
                    <a id="game-link-4" href="https://github.com/joseliojunior?tab=repositories" >${w.githubMsg}</a>
                </section>

            </section>
        </section>
        `;

        Game.properties.content.innerHTML = titleScreen;
        this.elem.titleScreen().style.transition = '400ms';
        this.elem.titleScreen().style.opacity = '100%';
        this.initButtons();

    };

    static initButtons() {

        document.getElementById('game-link-4').addEventListener('click', ()=> {
            document.exitFullscreen();
        });

        // New game
        this.elem.newGame().addEventListener('click', ()=> {

            const timer = 400;
            this.elem.titleScreen().style.transition = `${timer}ms`;
            this.elem.titleScreen().style.opacity = '0%';

            setTimeout(() => {
                this.elem.titleScreen().style.display = 'none';
                Game.newGame();
            }, timer);

        });

        // Language
        let langStatus = GameTranslation.cLang == 'pt' ? false : true;
        this.elem.language().addEventListener('click', () => {

            if (langStatus) {
                GameTranslation.cLang = 'pt';
                this.create();
                langStatus = false;
            } else {
                GameTranslation.cLang = 'en';
                this.create();
                langStatus = true;              
            }; 
        });

        // About
        this.elem.about().addEventListener('click', ()=> {
            GameAbout.create();
        });

        // Quit
        this.elem.quit().addEventListener('click', ()=> {
            document.exitFullscreen();
            Game.properties.content.style.display = 'none';
        });

    };

};