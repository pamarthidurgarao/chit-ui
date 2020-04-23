import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IonHeader, IonPage, IonToolbar, IonTitle, IonContent, withIonLifeCycle } from '@ionic/react';
import logo from '../assets/images/logo2.png';
import menu from '../assets/images/menu.png';

class Footer extends React.Component {

  ionViewWillEnter() {
    // console.log('ionViewWillEnter event fired')
  }

  ionViewWillLeave() {
    // console.log('ionViewWillLeave event fired')
  }

  ionViewDidEnter() {
    // console.log('ionViewDidEnter event fired')
  }

  ionViewDidLeave() {
    // console.log('ionViewDidLeave event fired')
  }

  componentDidMount() {
    // console.log('sdfsdf');
  }
  render() {
    return (
      <footer>
        <img src={logo} className="content-logo" />
        <span className="menuicon"><img src={menu} />

          <div className="menuList">
            <ul>
              <li><a>Home</a></li>
              <li><Link to="/cheeptipata">Cheeptipata</Link></li>
              <li><a>Reports</a></li>
              <li><a>Profile</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div></span>
      </footer>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {

  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {

  };
};

export default withIonLifeCycle(connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer));