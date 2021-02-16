import { useState } from 'react';
import YouTube from 'react-youtube';
function MainPage() {
    const [t, setT] = useState(-1);


    function onReadyEvent(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    function onPlayerStateChange(event) {
        const time = getFormattedTime(600);
        setT(event.data);
        // if (event.data == YT.PlayerState.PAUSED) {
        //     const time = getFormattedTime(player.getCurrentTime());
        //     document.querySelector('#info').innerHTML = `Foi passado para o tempo: ${time}`;
        // }
    }

    function getFormattedTime(timeInSeconds) {
        return timeInSeconds < 60 ?
            `0:${Math.trunc(timeInSeconds)}` :
            `${Math.trunc(timeInSeconds / 60)}:${Math.trunc(timeInSeconds % 60)}`;
    }

    const opts = {
        height: '360',
        width: '640',
    };

    // player = new YT.Player('ytplayer', {
    //     height: '360',
    //     width: '640',
    //     videoId: 'tcYodQoapMg',
    //     events: {
    //         'onReady': onPlayerReady,
    //         'onStateChange': onPlayerStateChange
    //     }
    // });


return (

    <main>
        <YouTube videoId="tcYodQoapMg" opts={opts} onReady={onReadyEvent} onStateChange={onPlayerStateChange} />
        {t}
    </main>
);
}

export default MainPage;