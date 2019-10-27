// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
let levelScanner = require('electron').remote.require('./levelscanner')
let lastPlayed = undefined

generateYoutubePlayer().then(player => {
    levelScanner.startScanning(playid => {
        if (playid == lastPlayed) return

        lastPlayed = playid
        player.loadVideoById(playid, 0, 'large')
        player.playVideo()
        window.ytp = player
        player.setLoop(true)
        console.log(playid)
    })
})

function generateYoutubePlayer() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    return new Promise((accept, reject) => {
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        let player = undefined
        console.log(window)
        window.onYouTubeIframeAPIReady = function() {
            player = new YT.Player('player', {
                height: '600',
                width: '800',
                events: {
                    'onReady': () => {
                        accept(player)
                    },
                    'onStateChange': onPlayerStateChange
                }
            });

            console.log(player)
        }

        function onPlayerStateChange(event) {
            if (event.data != YT.PlayerState.PLAYING) {
                player.seekTo(0)
                player.playVideo()
            }
        }
        function stopVideo() {
            player.stopVideo();
        }
    })
}