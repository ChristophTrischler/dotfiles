
const audio = await Service.import("audio")


const sliderActiv = Variable(false) 

let timer = null

const get_icon = (v) => {
    if (timer) {
        timer.destroy()
    }
    sliderActiv.setValue(true)
    timer = setTimeout(() => sliderActiv.setValue(false), 1000)

    if (v > 66) {
        return " 󰕾 ";
    }
    if (v > 33) {
        return " 󰖀 ";
    }
    if (v > 0) {
        return " 󰕿 ";
    }
    return "   "; 
}

const get_volume = (v, m) => m ? 0 : v*100; 


const volume_value = Utils.merge([audio.speaker.bind("volume"), audio.speaker.bind("is_muted")], get_volume)
const icon = volume_value.as(get_icon)

const label = Widget.Label ({
        class_name: "volume",
        label: icon,
    })


const slider = Widget.Revealer({
        reveal_child: sliderActiv.bind(),
        transitionDuration: 1000,
        transition: 'slide_right',
        child: Widget.Slider({
            hexpand : true,
            drawValue: false, 
            class_name: "volume_slider",
            value: volume_value,
            min: 0,
            max: 100,
            onChange: ({value}) => audio.speaker.volume = value / 100,
        })
})


export function Volume() {
    return Widget.EventBox({
        child: Widget.Box({
            children: [label, slider]
        }),
        onHover: () => sliderActiv.setValue(true),
        onHoverLost: () => sliderActiv.setValue(false),
    })
    
}
