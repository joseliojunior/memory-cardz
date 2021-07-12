import { Game } from "./game.js";
import { GameTitleScreen } from "./gameTitleScreen.js";
import { GameTranslation } from "./gameTranslation.js";

export class GameAbout {

    static elem = {
        aboutScreen: () => document.getElementById('about-screen')
    };

    static create() {
        const w = GameTranslation.language();
        const timer = 400;
        const gameCard = GameTitleScreen.elem.titleScreen();
        gameCard.style.transition = `${timer}ms`;
        gameCard.style.opacity = '0%';
        
        setTimeout(() => {
            gameCard.remove();
            Game.properties.content.innerHTML = `
            <section id="about-screen" class="flex">
                <section id="about-card" class="flexblock">
                    <div id="about-title-box" class="flex">
                        <div style="width: 50%;">
                            <div id="go-back-title-screen">
                            ${w.back}
                            </div>
                        </div>
                        <div id="about-title-text" class="flexblock">
                            ${w.about}
                        </div>
                        <div style="width: 50%;"></div>
                    </div>
                    <div id="about-text">
                        ${w.aboutMsg}
                    </div>
                </section>
            </section>`;
        }, timer);

        setTimeout(() => {
            this.backToTitleScreen();
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`game-link-${i}`).addEventListener('click', ()=> {
                    document.exitFullscreen();
                });
            };
            const gameCardAbout = this.elem.aboutScreen();
            gameCardAbout.style.transition = '1000ms';
            gameCardAbout.style.opacity = '100%';
        }, timer + 50);
    };

    static backToTitleScreen() {
        const backbtn = document.getElementById('go-back-title-screen');

        backbtn.addEventListener('click', ()=> {
            const timer = 400;
            const gameCardAbout = this.elem.aboutScreen();
            gameCardAbout.style.transition = `${timer}ms`;
            gameCardAbout.style.opacity = '0%';

            setTimeout(() => {
                gameCardAbout.remove();
                GameTitleScreen.create();
            }, timer);

        });
    };

};