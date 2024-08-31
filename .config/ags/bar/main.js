import { Battery } from "./modules/battery.js"
import { Bluetooth, SysTray } from "./modules/system.js"
import { Clock } from "./modules/time.js"
import { Volume } from "./modules/volume.js"
import {  Workspaces } from "./modules/workspaces.js"
import { Backlight } from "./modules/backlight.js"
import { Music } from "./modules/music.js"



function Space() {
    return Widget.Box({
        css: "min-width: 20px;"
    })
}

function Left() {
    return Widget.Box({
        children: [Workspaces()],
        hpack: "start"
    })
}

function Center() {
    return Widget.Box({
        children: [Music()],
        hpack: "center"
    })
}

function Right() {
    return Widget.Box({
        children: [Backlight(), Volume(), Battery(),Space(), SysTray(),Bluetooth(), Space(), Clock()],
        hpack: "end",
    })
}


export function Bar() {
    return Widget.Window({
        class_name: "bar_window",
        name: "bar", 
        anchor: ["top", "left", "right"],
        child:  Widget.CenterBox({
            vertical: false, 
            class_name: "bar",
            startWidget: Left(),
            centerWidget: Center(),
            endWidget: Right(),
        }),
        exclusivity: "exclusive"
    })    
}


