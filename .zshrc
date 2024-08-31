# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
# typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet


# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"


plugins=(
    git
    archlinux
    zsh-autosuggestions
    zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh


source $HOME/.oh-my-zsh/custom/themes/powerlevel10k/powerlevel10k.zsh-theme

[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

eval "$(ssh-agent)"

for FILE in ~/.ssh/*
do
  LINE=$(head -n 1 "$FILE")
  if [[ "$LINE" == "-----BEGIN OPENSSH PRIVATE KEY-----" ]]
  then 
    ssh-add "$FILE"
  fi 
done   


clear
pfetch


export PATH=$HOME/.cargo/bin:$HOME/.local/bin:$HOME/go/bin:$PATH
export SUDO_EDITOR="nvim"
export PF_CUSTOM_LOGOS=$HOME/.config/pfetch_logos


bindkey '^H' backward-kill-word



alias v=nvim
alias c="clear && pfetch"

eval "$(zoxide init --cmd cd zsh)"

#eval "$(starship init zsh)"
