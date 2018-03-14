var electronInstaller = require(`electron-winstaller`)
var fs = require(`fs`)
fs.createReadStream(`LICENSE`).pipe(fs.createWriteStream(`./build/win-unpacked/LICENSE`))
var resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: `./build/win-unpacked`,
    outputDirectory: `./release/installer`,
    authors: `Pham Ba Trung Thanh`,
    exe: `MEC Manager.exe`,
    noMsi: false,
})

resultPromise.then(() => console.log(`It worked!`), (e) => console.log(`No dice: ${e.message}`))
