import './App.css';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
const ENDPOINT = 'http://localhost:3333';

function App() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <span>{response}</span>
    </p>
  )
}
export default App;
