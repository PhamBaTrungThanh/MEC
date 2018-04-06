'use strict'
import log from 'electron-log'
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== `development`) {
    global.__static = require(`path`).join(__dirname, `/static`).replace(/\\/g, `\\\\`)
    global.log = log
}

let mainWindow
const winURL = process.env.NODE_ENV === `development`
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
        height: 500,
        useContentSize: true,
        width: 440,
        backgroundColor: `ffffff`,
        show: false,
        hasShadow: false,
        thickFrame: false,
    })
    mainWindow.setMenuBarVisibility(false)
    mainWindow.setMovable(true)
    // mainWindow.setMaximizable(false)
    mainWindow.loadURL(winURL)
    mainWindow.once(`ready-to-show`, () => {
        mainWindow.show()
        mainWindow.focus()
    })
    mainWindow.on(`closed`, () => {
        mainWindow = null
    })
}

app.on(`ready`, () => {
    createWindow()
})

app.on(`window-all-closed`, () => {
    if (process.platform !== `darwin`) {
        app.quit()
    }
})

app.on(`activate`, () => {
    if (mainWindow === null) {
        createWindow()
    }
})

autoUpdater.on(`update-downloaded`, () => {
    autoUpdater.quitAndInstall()
})

app.on(`ready`, () => {
    if (process.env.NODE_ENV === `production`) autoUpdater.checkForUpdates()
})
