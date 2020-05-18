import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import Input from '..//Input/Input';
import Infobar from '../Infobar/Infobar';
import Messages from '../Messages/Messages';

let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState({ error: false, errorMessage: '' });
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit('join', { name, room }, (err) => {
      if (err === undefined) return null;
      setError({ error: true, errorMessage: err });
      return alert(err);
    });
    return () => {
      if (!error.error) {
        console.log('disconnect');
        socket.emit('disconnection');
      }
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevState) => {
        return [...prevState, message];
      });
    });
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <button
          className='btn btn-primary'
          onClick={() => {
         
          }}
        >
          Debug
        </button>
      </div>
    </div>
  );
};

export default Chat;
