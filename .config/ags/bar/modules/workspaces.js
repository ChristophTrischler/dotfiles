
const hyprland = await Service.import("hyprland")

const workspaceNames = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]



const activeId = hyprland.active.workspace.bind("id")


/**
 * @param {number} id
 */
function createWorkspaces(id) {
    return Widget.Button({
        on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
        child: Widget.Label(`${workspaceNames[id - 1]}`),
        class_name: activeId.as(i => `${i === id ? "focused workspace" : "workspace"}`), 
    })
}


const baseWorkspaces = [1, 2, 3, 4, 5].map(createWorkspaces)


/**
 * @param {import("types/service/hyprland").Workspace[]}  w
 */
const workspaces = hyprland.bind("workspaces").as((w) => w.filter(w => w.id > 5).map(w => createWorkspaces(w.id)))



export function Workspaces() {

    return Widget.Box({
        class_name: "workspaces",
        children: [  ...baseWorkspaces , Widget.Box({ children: workspaces })],
    })
}

/**
*@param {string} title
*/
function get_title(title)  {
    if (title.includes("—")){
        title = title.split("—")[0]
    }
    if (title.length > 40) {
        title = title.slice(0, 35) + "..."
    }
    return title
}

const title = hyprland.active.client.bind("title").as(get_title)

export function ClientTitle() {
    return Widget.Label({
        class_name: "client-title",
        label: title,
    })
}

