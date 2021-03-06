import { PlayerEvents } from '../utils/YouTubeEventsEnum';
import { playPauseActions, jumpVideo } from './ControlsService';
import { setTune } from '../controller/SocketController'

let playerInstance;

export function onReadyEvent(event, serviceParams) {
    const { progressBar, setProgressBar, setDoJump, socket } = serviceParams; 
    
    setProgressBar(
        {
            ...progressBar,
            max: event.target.getDuration()
        }
    );

    playerInstance = Object.freeze(event.target);
    
    resizeVideoByScreen(event.target.getIframe());

    playPauseActions(event.target);
    jumpVideo(event.target, setDoJump);

    setTune(event.target, socket);
}

export function onPlayerStateChange(event, serviceParams) {
    const { socket, progressBar, setProgressBar, doJump, setDoJump } = serviceParams;

    let action = {
        eventStatus: doJump ? PlayerEvents.JUMPED : event.data,
        time: event.target.getCurrentTime(),
    };
    if(doJump) {
        setDoJump(false)
    }

    let intervalID;
    if (event.data === PlayerEvents.PLAYING) {
        setInterval(() => {
            intervalID = setProgressBar({...progressBar, value: event.target.getCurrentTime()});
        }, 1000);
    }else{
        clearInterval(intervalID);
    }
    
    socket.emit('PlayerAction', action)
}

export function addToQueue(id) {
    console.log(playerInstance);
    
    playerInstance.loadVideoById(id);
}

export function getPlayerInstance() {
    return playerInstance;
}

function resizeVideoByScreen(iframe) {
    window.addEventListener('resize',  () => { 
        const player = document.querySelector('#player'); 
        iframe.width = player.offsetWidth;
        iframe.height = (window.innerHeight * 75) / 100;
    });
}
