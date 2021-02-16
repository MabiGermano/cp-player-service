import { PlayerEvents } from '../utils/YouTubeEventsEnum';

export function onReadyEvent(event) {
    event.target.pauseVideo();
}

export function onPlayerStateChange(event, socket) {
    console.log(event.target)
    let time;
    if (event.data === PlayerEvents.PAUSED) {
        time = event.target.getCurrentTime()
        socket.emit('PlayerAction', time);
    }

    socket.on('SetTune', data => {
        console.log(`SetTune: ${data}`);
        event.target.seekTo(data, true);
    })

}

// export function synchronize (event, time) {
    
// }