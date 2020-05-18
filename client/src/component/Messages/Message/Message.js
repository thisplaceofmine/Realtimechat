import React from 'react';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
  let isSendedByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSendedByCurrentUser = true;
  }

  return isSendedByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{trimmedName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{text}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgoundLight'>
        <p className='messageText colorDark'>{text}</p>
      </div>
      <p className='sentText pl-10'>{user}</p>
    </div>
  );
};
export default Message;
