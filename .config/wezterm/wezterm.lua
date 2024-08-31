local wezterm = require 'wezterm'
local act = wezterm.action
local config = {}

config.mouse_bindings = {
	-- Bind 'Up' event of CTRL-Click to open hyperlinks
	{
		event = { Up = { streak = 1, button = 'Left' } },
		mods = 'CTRL',
		action = act.OpenLinkAtMouseCursor,
	},
	-- Disable the 'Down' event of CTRL-Click to avoid weird program behaviors
	{
		event = { Down = { streak = 1, button = 'Left' } },
		mods = 'CTRL',
		action = act.Nop,
	},
}

config.color_scheme = 'Solarized Dark (Gogh)'

return config
