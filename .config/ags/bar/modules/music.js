import { ToggleMusicWindow } from "../../windows/music.js"

const mpris = await Service.import("mpris")

const label = Utils.watch("", mpris, "player-changed", () => {
    let spotify = mpris.players.find(p => p.name == "spotify")
    if (spotify) {
        return `${spotify.track_artists.join(", ")}  - ${spotify.track_title}`
    }
    if (!mpris.players[0] || mpris.players[0].track_artists.length == 0 || mpris.players[0].track_title == "Unknown title") {
        return ""
    } 
    return `${mpris.players[0].track_artists.join(", ")}  - ${mpris.players[0].track_title}`
})

const art_css = Utils.watch("", mpris, "player-changed", get_art_url)

function get_art_url() {
    let spotify = mpris.players.find(p => p.name == "spotify")
    if (spotify) {
        return spotify.track_cover_url 
    }
    return "file:///home/chr/Pictures/pepe.png"
}


/**
 * @param {string} url 
 */
function get_art_css(url) {
    return `background-image: url("${url}");`
}

const label_and_art = Widget.Box({
    children: [
        Widget.Box({
            css: art_css.as(get_art_css),
            class_name: "art",
            vexpand: false, 
            hexpand: false,
        }),
        Widget.Label({ label }),
    ]
})



export function Music() {
    return Widget.Button({
                    class_name: "media",
                    on_primary_click: () => ToggleMusicWindow(),
                    child: label_and_art,
    }) 
}
