const battery = await Service.import("battery")


export function Battery() {
    const text = Utils.merge([battery.bind("energy_rate"), battery.bind("percent"),], (e, p) => `${e}W ${p}%`)
    const icon = battery.bind("percent").as(p =>
        `battery-level-${Math.floor(p / 10) * 10}-symbolic`)

    return Widget.Box({
        class_name: "battery",
        children: [
            Widget.Icon({ icon }),
        ],
        tooltipText: text 
    })
}
