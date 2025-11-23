import * as vscode from "vscode";
import { TextEditorSelectionChangeKind } from "vscode";


function doHideActions(editor: vscode.TextEditor, isKeyboardChange: boolean)
{
    // we should skip auto-hiding if:
    // 1. there's no active editor
    // 2. there's an active debug session
    if (!vscode.window.activeTextEditor || vscode.debug.activeDebugSession) {
        return;
    }

    const config = vscode.workspace.getConfiguration("autoHide");

    if (isKeyboardChange && !config.hideOnKeyboard) {
        return;
    }

    // don't hide if the current document isn't a "real" text editor (e.g. output window or other text buffer without some file backing)
    // curiously, this still works as desired for terminals in the editor area (i.e. terminal tabs). idk why but okay!
    const path = vscode.window.activeTextEditor.document.fileName;
    const pathIsFile = path.includes(".") || path.includes("\\") || path.includes("/"); // dubious of this check but okay
    if (!pathIsFile || editor.document.uri.scheme == "output") {
        return;
    }

    if (config.autoHideReferences) {
        vscode.commands.executeCommand("closeReferenceSearch");
    }

    setTimeout(function () {
        if (config.autoHidePanel) {
            vscode.commands.executeCommand("workbench.action.closePanel");
        }
    }, config.panelDelay);

    setTimeout(function () {
        if (config.autoHideSideBar) {
            vscode.commands.executeCommand("workbench.action.closeSidebar");
        }
    }, config.sideBarDelay);

    setTimeout(function () {
        if (config.autoHideAuxiliaryBar) {
            vscode.commands.executeCommand("workbench.action.closeAuxiliaryBar");
        }
    }, config.sideBarDelay);
}

export function activate(context: vscode.ExtensionContext) {
    const initialConfig = vscode.workspace.getConfiguration("autoHide");

    if (initialConfig.hideOnOpen) {
        if (initialConfig.autoHideReferences) {
            vscode.commands.executeCommand("closeReferenceSearch");
        }

        if (initialConfig.autoHidePanel) {
            vscode.commands.executeCommand("workbench.action.closePanel");
        }

        if (initialConfig.autoHideSideBar) {
            vscode.commands.executeCommand("workbench.action.closeSidebar");
        }

        if (initialConfig.autoHideAuxiliaryBar) {
            vscode.commands.executeCommand("workbench.action.closeAuxiliaryBar");
        }
    }

    // this occurs when the user opens a new file (e.g. from terminal) or swaps tabs, it *does not* trigger
    // when going from terminal focus to editor focus if it's the same editor, sadly
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (!editor) {
            return;
        }

        doHideActions(editor, false);
    });

    vscode.window.onDidChangeTextEditorSelection(selection => {
        // no active editor means we shouldn't hide anything
        if (!vscode.window.activeTextEditor) {
            return;
        }

        // if there is no selection or there are multiple selections, do nothing
        if (selection.selections.length != 1 || selection.selections.find(a => a.isEmpty) == null) {
            return;
        }

        doHideActions(selection.textEditor, selection.kind == TextEditorSelectionChangeKind.Mouse);
    });

    context.subscriptions.push(
        vscode.commands.registerCommand("autoHide.toggleHidePanel", async () => {
            let config = vscode.workspace.getConfiguration("autoHide");
            await config.update(
                "autoHidePanel",
                !config.autoHidePanel,
                vscode.ConfigurationTarget.Workspace
            );
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("autoHide.toggleHideSideBar", async () => {
            let config = vscode.workspace.getConfiguration("autoHide");
            await config.update(
                "autoHideSideBar",
                !config.autoHideSideBar,
                vscode.ConfigurationTarget.Workspace
            );
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "autoHide.toggleHideAuxiliaryBar",
            async () => {
                let config = vscode.workspace.getConfiguration("autoHide");
                await config.update(
                    "autoHideAuxiliaryBar",
                    !config.autoHideAuxiliaryBar,
                    vscode.ConfigurationTarget.Workspace
                );
            }
        )
    );
}

export function deactivate() { }
