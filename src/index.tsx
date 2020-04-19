import React, { Component } from "react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';


const rootReducer = combineReducers({
});

const store = createStore(
    rootReducer
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
