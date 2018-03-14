var electronInstaller = require(`electron-winstaller`)

var resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: `./build/win-unpacked`,
    outputDirectory: `./release/installer`,
    authors: `Pham Ba Trung Thanh`,
    exe: `mec.exe`,
})

resultPromise.then(() => console.log(`It worked!`), (e) => console.log(`No dice: ${e.message}`))
