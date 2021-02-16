import YouTube from 'react-youtube';
import { PlayerEvents } from '../utils/YouTubeEventsEnum';
import { useState } from 'react';

function MainPage() {
    const [time, setTime] = useState(0);

    function onReadyEvent(event) {
        event.target.pauseVideo();
    }
    
    function onPlayerStateChange(event) {
        if (event.data === PlayerEvents.PAUSED) {
            setTime(getFormattedTime(event.target.getCurrentTime()));
        }
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

return (

    <main>
        <YouTube videoId="tcYodQoapMg" opts={opts} onReady={onReadyEvent} onStateChange={onPlayerStateChange} />
        {time}
    </main>
);
}

export default MainPage;