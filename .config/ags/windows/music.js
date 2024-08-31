
const mpris = await Service.import("mpris")

const artists = Variable("")
const title = Variable("")
const album = Variable("")
const cover_url = Variable("file:///home/chr/Pictures/pepe.png")

Utils.watch(null, mpris, "player-changed", () => {
    const player = get_player()
    if (!player) {
        artists.setValue("")
        title.setValue("")
        album.setValue("")
        cover_url.setValue("file:///home/chr/Pictures/pepe.png")
        return player
    }
    artists.setValue(player.track_artists.join(", "))
    title.setValue(player.track_title)
    album.setValue(player.track_album)
    cover_url.setValue(player.track_cover_url)
})

function get_player() {
    let spotify = mpris.players.find(p => p.name == "spotify")
    if (spotify) {
        return spotify
    }
    return mpris.players[0]
}

/** @param {string} url */
const get_art_css = (url) => `background-image: url("${url}");`


const ArtBox = Widget.Box({
        css: cover_url.bind().as(get_art_css),
        class_name: "music_art",
        vexpand: false, 
        hexpand: false,
    })

const Controls = Widget.Box({
        vertical: false,
        homogeneous: true,
        class_name: "music_controls",
        children: [
            Widget.Button({ label: " ⏮ ", class_name: "music_play_pause", on_primary_click: () => mpris.players[0].previous() }),
            Widget.Button({ label: " ⏯ ", class_name: "music_prev", on_primary_click: () => mpris.players[0].playPause() }),
            Widget.Button({ label: " ⏭ ", class_name: "music_next", on_primary_click: () => mpris.players[0].next() }),

        ]                
    })


const positionSlider = (player) => Widget.Slider({
        class_name: "position",
        draw_value: false,
        on_change: ({ value }) => player.position = value * player.length,
        visible: player.bind("length").as(l => l > 0),
        setup: self => {
            function update() {
                const value = player.position / player.length
                self.value = value > 0 ? value : 0
            }
            self.hook(player, update)
            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

const music_slider = mpris.bind("players")
    .as(players => players
        .filter(p => p.name == "spotify")
        .map(positionSlider)
    )


const Music =  Widget.Box({
        hpack: "center", 
        class_name: "music_window",
        vertical: false, 
        children: [
            ArtBox,
            Widget.Box({
                class_name: "music_info",
                vpack: "center",
                vertical: true, 
                children: [
                    Widget.Label({ class_name: "music_artist", label:  artists.bind() }),
                    Widget.Label({ class_name: "music_album", label:  album.bind() }),
                    Widget.Label({ class_name: "music_title", label:  title.bind() }),
                    Controls,
                    Widget.Box({
                        homogeneous: true,
                        children: music_slider,
                    }),
                ]
            }) 
        ]
    })

export function MusicWindow() {
    return Widget.Window({
        name: "music",
        anchor: ["top"],
        margins: [3, 3, 3, 3],
        child: Music, 
        class_name: "music_window",
        visible: false, 
    })
}


export function ToggleMusicWindow() {
    App.toggleWindow("WindowCloser-music")
    App.toggleWindow("music")
}
