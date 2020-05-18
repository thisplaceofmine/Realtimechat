import React from 'react';
import { Link } from 'react-router-dom';

import './Infobar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const Infobar = ({ room }) => {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online image' />
        <h3>{room}</h3>
      </div>
      <div className='rightInnerContainer'>
        <Link to="/">
          <img src={closeIcon} alt='close image' />
        </Link>
      </div>
    </div>
  );
};
export default Infobar;
