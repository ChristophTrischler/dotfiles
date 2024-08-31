import {Bar } from "./bar/main.js"; 
import { MusicWindow } from "./windows/music.js";
import { WindowCloser } from "./windows/popup.js";
import { NotificationPopups } from "./windows/notifications.js"


Utils.monitorFile(
    // directory that contains the scss files
    `${App.configDir}/style`,

    // reload functioln
    function() {        // main scss file
        const scss = `${App.configDir}/style.scss`

        // target css file
        const css = `${App.configDir}/out/style.css`

        // compile, reset, apply
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
)
    



App.config({ style: `${App.configDir}/out/style.css`, windows: [Bar(), MusicWindow(), WindowCloser("music"), NotificationPopups() ] })




