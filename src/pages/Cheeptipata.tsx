import React, { Component } from "react";
import { connect } from "react-redux";
import { IonHeader, IonPage, IonToolbar, IonTitle, IonContent, withIonLifeCycle } from '@ionic/react';
import Footer from '../components/footer';

class Cheeptipata extends React.Component {

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
            <section>
                <div className="content">
                    <div className="title-block">
                        CHEEPTIPATA
        </div>
                    <div className="content">sdfsdf</div>
                </div>
                <Footer />
            </section>
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
)(Cheeptipata));