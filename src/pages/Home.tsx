import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css';
import { connect } from "react-redux";
import Footer from '../components/footer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <div className="content">
        <div className="title-block">
          CHIT HOME
        </div>
      </div>
      <Footer />
    </IonPage>
  );
};

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export default Home;
