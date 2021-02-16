import YouTube from 'react-youtube';
import { useEffect, useState } from 'react';
import { onPlayerStateChange, onReadyEvent } from '../service/PlayerService';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3333';

function MainPage() {
    const [response, setResponse] = useState(0);
    let socket;
    
    useEffect(() => {
        socket = socketIOClient(ENDPOINT);

      }, []);
  

return (

    <main>
        <YouTube videoId="tcYodQoapMg" onReady={onReadyEvent} onStateChange={event => onPlayerStateChange(event, socket)} />
    </main>
);
}

export default MainPage;