import './App.css';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import Routes from './routes';
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
    <Routes/>
  )
}
export default App;
