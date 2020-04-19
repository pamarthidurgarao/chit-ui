import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {
  Link,
  Route,
  Switch,
  withRouter,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import logo from '../assets/images/logo4.png';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <div className="welcome-block">
        <div className="welcome text-center">
          <h3>WELCOME</h3>
          <div>
            <img src={logo} className="welcome-logo" />
          </div>
          <p className="welcome-content">Cheeptipata digital system u can track transtations alerts and notifications digital payment tracks.</p>
          <Link to="/signin" className="btn-theme">SIGN IN</Link>
          <Link to="/signup" className="btn-theme">SIGN UP</Link>
        </div>
      </div>
    </IonPage>
  );
};

export default Welcome;