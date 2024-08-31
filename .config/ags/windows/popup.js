/**
 * @param {string} menu
 * @param {number} monitor
 */
export const WindowCloser = (menu, monitor = 0 ) => {
    const name = `WindowCloser-${menu}`;

    function close() {
        App.closeWindow(menu);
        App.closeWindow(name);
    }

    return Widget.Window({
        name,
        className: 'window_closer',
        layer: 'top',
        monitor,
        visible: false,
        anchor: ['top', 'bottom', 'left', 'right'],
        child: Widget.EventBox({
            onPrimaryClick: close
        })
    })
}
