'use strict'

import { app, BrowserWindow, autoUpdater, dialog } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== `development`) {
    global.__static = require(`path`).join(__dirname, `/static`).replace(/\\/g, `\\\\`)
}

let mainWindow
const winURL = process.env.NODE_ENV === `development`
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const squirrelUrl = `https://mec-deploy.herokuapp.com/update/win32/:version`

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
const startAutoUpdater = (squirrelUrl) => {
    // The Squirrel application will watch the provided URL
    autoUpdater.setFeedURL(squirrelUrl)
    // Display a success message on successful update
    autoUpdater.addListener(`update-downloaded`, (event, releaseNotes, releaseName) => {
        dialog.showMessageBox({message: `The release ${releaseName} has been downloaded`})
    })
    // Display an error message on update error
    autoUpdater.addListener(`error`, (error) => {
        dialog.showMessageBox({message: `Auto updater error: ${error}`})
    })
    // tell squirrel to check for updates
    autoUpdater.checkForUpdates()
}
const handleSquirrelEvent = () => {
    if (process.argv.length === 1) {
        return false
    }
    const squirrelEvent = process.argv[1]
    switch (squirrelEvent) {
    case `--squirrel-install`:
    case `--squirrel-updated`:
    case `--squirrel-uninstall`:
        setTimeout(app.quit, 1000)
        return true
    case `--squirrel-obsolete`:
        app.quit()
        return true
    }
}

if (handleSquirrelEvent()) {
    app.quit()
}
app.on(`ready`, () => {
    if (process.env.NODE_ENV === `production`) startAutoUpdater(squirrelUrl)
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
