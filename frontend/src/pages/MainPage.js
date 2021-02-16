
function MainPage() {
    const player;

    function onYouTubePlayerAPIReady() {
        player = new YT.Player('ytplayer', {
            height: '360',
            width: '640',
            videoId: 'tcYodQoapMg',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        //event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PAUSED) {
            const time = getFormattedTime(player.getCurrentTime());
            document.querySelector('#info').innerHTML = `Foi passado para o tempo: ${time}`;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    function getFormattedTime(timeInSeconds) {
        return timeInSeconds < 60 ?
            `0:${Math.trunc(timeInSeconds)}` :
            `${Math.trunc(timeInSeconds / 60)}:${Math.trunc(timeInSeconds % 60)}`;
    }
    return (
        <main>
            <div id="ytplayer"></div>
            <div id="info"></div>
        </main>
    );
}

export default MainPage;