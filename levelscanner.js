const fs = require('fs')

const levelToYoutubeMap = JSON.parse(fs.readFileSync('./leveltoyoutubemap.json'))

let intervalId

exports.startScanning = (cakeback) => {
    intervalId = setInterval(() => {
        let { name } = JSON.parse(fs.readFileSync("./currentlevel.json"));
        console.log(name);
        let play = levelToYoutubeMap[name]
        console.log(play);
        cakeback(play)
    }, 3000)
}

exports.stopScanning = () => clearInterval(intervalId)