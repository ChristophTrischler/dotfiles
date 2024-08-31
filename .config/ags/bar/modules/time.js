
const date = Variable("", {
    poll: [1000, 'date "+%b%e"'],
})

const time = Variable("", {
    poll: [1000, 'date "+%H:%M"']
})

export function Clock() {
    return Widget.Box({
        children: [
            Widget.Label({
            class_name: "clock",
            label: time.bind(),
            }),
            Widget.Label({
                class_name: "date", 
                label: date.bind()
            })
        ]
    })
}

