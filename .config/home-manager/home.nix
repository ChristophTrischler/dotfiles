{ pkgs, ... }:
{
  gtk = {
    enable = true;
    theme = {
      # name = "SolArc-Dark";
      # package = pkgs.solarc-gtk-theme;
      name = "NumixSolarizedDarkMagenta";
      package = pkgs.numix-solarized-gtk-theme;
    };
    iconTheme = {
      name = "Arc";
      package = pkgs.arc-icon-theme;
    };
  };
  home.stateVersion = "23.11";
  home.username = "chr";
  home.homeDirectory = "/home/chr";
}

