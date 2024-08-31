import brightness from "../../services/brightnessService.js"

const sliderActiv = Variable(false) 

let timer = null

/**
 * @param {number} b 
 */
const get_icon = (b) => {
    if (timer) {
        timer.destroy()
    }
    sliderActiv.setValue(true)
    timer = setTimeout(() => sliderActiv.setValue(false), 1000)


    if (b > 90) return " 󰃠 ";
    if (b > 80) return " 󰃟 ";
    if (b > 60) return " 󰃝 ";
    if (b > 50) return " 󰃞 ";
    if (b > 30) return " 󰃜 ";
    if (b > 15) return " 󰃛 ";
    return " 󰃚 ";
}


const value = brightness.bind("screen_value").as(v => v * 100)
const icon = value.as(get_icon) 

const label = Widget.Label ({
        class_name: "brightness",
        label: icon,
    })


const slider = Widget.Revealer({
        reveal_child: sliderActiv.bind(),
        transitionDuration: 1000,
        transition: 'slide_right',
        child: Widget.Slider({
            hexpand : true,
            drawValue: false, 
            class_name: "brightness_slider",
            value: value,
            min: 0,
            max: 100,
        })
})


export function Backlight() {
    return Widget.EventBox({
        child: Widget.Box({
            children: [label, slider]
        }),
        onHover: () => sliderActiv.setValue(true),
        onHoverLost: () => sliderActiv.setValue(false),
    })
    
}
