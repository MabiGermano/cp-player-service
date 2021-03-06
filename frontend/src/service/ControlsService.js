import { getPlayerInstance } from './PlayerService';

// porque isso funciona dessa forma?
export const CONTROLS = {
    playPause: () => document.querySelector('.play-pause'),
    progressBar: () => document.querySelector('.progress input[type=range]')
}

export function playPauseActions(player) {
    
    const { playPause } = CONTROLS;
    console.log(playPause)
    playPause().addEventListener('click', (e) => {
        const selfClassList = e.target.classList;
        if(!selfClassList.contains('pause')) {
            player.playVideo();
            selfClassList.add('pause');
        }else {
            player.pauseVideo();
            selfClassList.remove('pause');
        }
    });
}

export function jumpVideo(player, setDoJump) {
    
    const { progressBar } = CONTROLS;
    const progressBarElement = progressBar();
    progressBarElement.addEventListener('input', (e) => {
        let v = progressBarElement.value;
        setDoJump(true)
        player.seekTo(v);     
    });
}

export function nextVideo() {
    getPlayerInstance().nextVideo();    
}

export function previousVideo() {
    getPlayerInstance().previousVideo();
}

export function playVideoAt(index) {
    getPlayerInstance().playVideoAt(index);
}