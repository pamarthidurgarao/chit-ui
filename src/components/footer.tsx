import React from 'react';
import logo from '../assets/images/logo2.png';

interface ContainerProps { }

const Footer: React.FC<ContainerProps> = () => {
  return (
    <footer>
      <img src={logo} className="content-logo" />
    </footer>
  );
};

export default Footer;
