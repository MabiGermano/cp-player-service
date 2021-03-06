import YouTube from 'react-youtube';
import { useState } from 'react';
import { onPlayerStateChange, onReadyEvent, addToQueue } from '../../service/PlayerService';
import { nextVideo } from '../../service/ControlsService';


import socketIOClient from 'socket.io-client';
import './style.css';

const ENDPOINT = 'http://192.168.1.9:3333';
const socket = socketIOClient(ENDPOINT);
const player = document.querySelector('#player');

function MainPage() {
    const [doJump, setDoJump] = useState(false);
    const [progressBar, setProgressBar] = useState({
        max: 0,
        value: 0
    });

    const [videoUrl, setVideoUrl] = useState("");

    function buildServiceParams() {
        return {
            socket: socket,
            progressBar: progressBar,
            setProgressBar: setProgressBar,
            doJump: doJump,
            setDoJump: setDoJump
        }
    }

    function handdleVideoLinks (event) {
        addToQueue(videoUrl);
    }

    return (
        <>
            <main>
                <div id="player">
                    <YouTube containerClassName="video-container" videoId="GtvS897PiyQ"
                        opts={{
                            width: (window.innerWidth * 50) / 100,
                            height: (window.innerHeight * 75) / 100,
                            playerVars: { 'controls': 0 },
                        }}
                        onReady={event => onReadyEvent(event, buildServiceParams())}
                        onStateChange={event => onPlayerStateChange(event, buildServiceParams())}
                    />

                    <div>
                        <div className="input-group">
                            <input type="text" onChange={ (e) => { setVideoUrl(e.target.value) } }/>
                        </div>
                        <button onClick={handdleVideoLinks}>Go!</button>
                    </div>
                </div>

                <div id="queue">
                    <div id="list">

                    </div>

                    <div id="controls">
                    <div className="actions">
                            <div className="button-container">
                                <div className="arrows previous"></div>
                            </div>
                            <div className="button-container">
                                <div class="play-pause"></div>
                            </div>
                            <div className="button-container" onClick={nextVideo}>
                                <div className="arrows next"></div>
                            </div>
                        </div>
                        
                        <div className="progress">
                            <input type="range" min="0" max={progressBar.max} value={progressBar.value} step="1" className="range blue" />
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
}

export default MainPage;