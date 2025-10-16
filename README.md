# Auto Hide (Still?)

It is 2025. The GitHub [issues](https://github.com/microsoft/vscode/issues/3742) ([multiple](https://github.com/microsoft/vscode/issues/10952)) have been open for 9 years. The people are downtrodden, but continue fighting for... hiding distracting UI elements when not needed?

Jokes aside, for me as a low vision user, I really can't have the VS Code UI chewing up my screen when I want to code. This is an accessibility thing, I do wish they would fix it without the need for an extension. Alas.

## Fork notes
**Forked from [sirmspencer/vscode-autohide](https://github.com/sirmspencer/vscode-autohide)**

I forked this because I wanted auto-hide to *also* happen on keyboard input in the editor, not just for mouse clicks. I am not a mouse person, generally.

Much of README is unedited below here, although I made some light edits for my own benefit.

Extension install page: <https://marketplace.visualstudio.com/items?itemName=doubleyewdee.vscode-autohide-still>

## Features

### Auto-hide side bar
Causes the side bar to be hidden whenever the user enters a text editor area.

This works best with the sidebar on the right side of the screen (as it ensures the editor text does not shift when the side bar is shown/hidden).

![Auto-hide side bar](Images/Features/AutoHideSideBar.gif)

### Auto-hide bottom panel
Same thing as above, except for the bottom panel (output, terminal, etc. are contained in the panel).

## Settings
* `autoHide.autoHideSideBar`: Hide the side bar when the user clicks into a text editor. [boolean, default: `true`]
* `autoHide.autoHidePanel`: Hide the panel (output, terminal, etc.) when the user clicks into a text editor. [boolean, default: `true`]
* `autoHide.autoHideReferences`: Hide the References panel (`Go to References`) when the user clicks into a text editor. [boolean, default: `true`]
* `autoHide.sideBarDelay`: How long to wait before hiding the side bar. A delay prevents text from being selected. A longer delay allows the horizontal scroll to adjust to the change in selection before the side bar hiding causes the horizontal scroll to adjust, avoiding conflicts. [number, default: `450`]
* `autoHide.panelDelay`: How long to wait before hiding the panel. Same as for the side bar when the panel is on the side.  If the panel is on the bottom, there is no need for delay. [number, default: `300`]
* `autoHide.hideOnOpen`: Hide side bar and panel when VSCode first opens. [boolean, default: `false`]
* `autoHide.hideOnKeyboard`: Hide side bar and panel when user presses any keys in the editor. [boolean, default: `true`]

## Commands

* `autoHide.toggleHideSideBar`: Toggle `autoHide.autoHideSideBar` setting for current workspace. Use this command to pin/unpin the side bar.
* `autoHide.toggleHidePanel`: Toggle `autoHide.autoHidePanel` setting for current workspace. Use this command to pin/unpin the panel.

## Developing

1) Clone/download repo: <https://github.com/doubleyewdee/vscode-autohide.git>
2) Make code changes in "src" folder.
3) Run "npm run compile". (this will start compiler in watch mode) [if editing in vscode, Ctrl+Shift+B also works]
4) In vscode, open the Debug panel and launch the extension from there.

## Publishing

### Get access token

<https://dev.azure.com/>

### login

```sh
vsce login [username]
```

### Publish package

```sh
vsce package
vsce publish
```

<https://code.visualstudio.com/api/working-with-extensions/publishing-extension>n>

## Credit to 'VTools for Visual Studio Code'

This extension is a heavily modified version of:
<https://marketplace.visualstudio.com/items?itemName=venryx.vscode-vtools>
