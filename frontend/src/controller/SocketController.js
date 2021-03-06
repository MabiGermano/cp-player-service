import { PlayerEvents } from '../utils/YouTubeEventsEnum';
import { CONTROLS } from '../service/ControlsService'


export function setTune(player, socket) {
    
    socket.on('SetTune', action => {
        const { playPause } = CONTROLS
        
        if (action.eventStatus === PlayerEvents.PAUSED) {
            playPause().classList.remove('pause');
            player.pauseVideo();
        } 
        
        if (action.eventStatus === PlayerEvents.PLAYING) {
            playPause().classList.add('pause');
            player.playVideo();
        } 
        
        if (action.eventStatus === PlayerEvents.JUMPED) {
            player.seekTo(action.time, true);
        }
    });
}