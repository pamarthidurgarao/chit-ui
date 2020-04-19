import React, { Component, useEffect, Suspense } from "react";
import {
  Link,
  Route,
  Switch,
  withRouter,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { render } from "react-dom";
import { connect } from "react-redux";
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import Welcome from './pages/Welcome';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => {
  let routes = (
    <Switch>
      <Route path="/" component={Welcome} exact={true} />
      <Route path="/signin" component={SignIn} exact={true} />
      <Route path="/signup" component={SignUp} exact={true} />
      <Route path="/home" component={Home} exact={true} />
    </Switch>
  );
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {routes}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
