/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { Layout } from '../../../js/Classes.js';
import { Game } from './game.js';

const ids = {
    content: document.getElementById('content'),
    loading: document.getElementById('loading-screen'),
    starThemeBtn: document.getElementById('star-theme-btn'),
    themeLinkElement: document.getElementById('theme')
};

class main {

    static setLayout() {
        Layout.themePicker(ids.starThemeBtn, ids.themeLinkElement);
    };

    static loadEnd() {
        this.setLayout();
        setTimeout(() => {
            ids.loading.remove();
        }, 500);  
    };

    static get init() {
        Game.init();
        this.loadEnd();
        window.addEventListener('resize', this.setLayout);
    };
};

main.init;