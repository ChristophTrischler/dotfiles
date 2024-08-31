const systemtray = await Service.import("systemtray")


/**
 * @param {import("types/service/systemtray").TrayItem} item
 */
function getWidget(item) {
    return Widget.Button({
            class_name: "network",
            child: Widget.Icon({ 
                icon: item.bind("icon"),
                size: 28
            }),
            on_primary_click: (_, event) => item.activate(event),
            on_secondary_click: (_, event) => item.openMenu(event),
            tooltip_markup: item.bind("tooltip_markup"),
    })
}

export function SysTray() {
    const items = systemtray.bind("items")
        .as(items => items.filter(item => item.title == "Network").map(getWidget))

    return Widget.Box({
        children: items,
    })
}


export function Bluetooth() {
    return Widget.Button({
        class_name: "bluetooth",
        on_primary_click: () => Utils.execAsync("blueman-manager"),
        child: Widget.Icon({ 
                icon: "bluetooth-symbolic" ,
                size: 18
            }),
    })
}
