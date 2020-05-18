import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import webSocket from 'socket.io-client';

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [ws, setWs] = useState(null);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    if (ws) {
      console.log('Success Connection');

      ws.on('getMessage', (message) => {
        console.log(message);
      });
    }
  }, [ws]);

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input
            placeholder='Name'
            className='joinInput'
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder='Room'
            className='joinInput mt-20'
            type='text'
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className='btn btn-primary my-3 btn-block'
            onClick={() => {
              setWs(webSocket(ENDPOINT));
            }}
          >
            Connect
          </button>
          <button
            className='btn btn-primary my-3 btn-block'
            onClick={() => {
              ws.emit('joinRoom', { userName: name, roomName: room});
            }}
          >
            Join Room
          </button>
          <button
            className='btn btn-primary my-3 btn-block'
            onClick={() => {
              ws.emit('getMessage', 'hi');
            }}
          >
            Message to self
          </button>
          <button
            className='btn btn-primary my-3 btn-block'
            onClick={() => {
              ws.emit('getMessageElse', 'hey');
            }}
          >
            Message to else
          </button>
          <button
            className='btn btn-primary my-3 btn-block'
            onClick={() => {
              ws.emit('getMessageAll', 'Ahoy');
            }}
          >
            Message to all
          </button>
          <button
            className='btn btn-primary my-3 btn-block'
            onClick={() => {
              ws.emit('leaveRoom');
            }}
          >
            Leave Room
          </button>
          <button className='btn btn-primary my-3 btn-block'>Disconnect</button>

          {/* <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className='button mt-20' type='submit'>
              Sign In
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export default Join;
