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
import logo from '../assets/images/logo1.png';

const SignUp: React.FC = () => {
    return (
        <IonPage>
            <div className="welcome-block">
                <div className="welcome text-center">
                    <h3>SIGNUP</h3>
                    <div>
                        <img src={logo} className="welcome-logo" />
                    </div>

                    <div className="sign-methods">
                        <Link to="/home" className="btn-mail">SIGNIN WITH EMAIL</Link>
                        <Link to="/home" className="btn-fb">
                            SIGNIN WITH FACEBOOK</Link>
                    </div>
                    <Link to="/" className="btn-theme">BACK</Link>
                    <Link to="/signin" className="btn-theme">SIGN IN</Link>
                </div>
            </div>
        </IonPage>
    );
};

export default SignUp;