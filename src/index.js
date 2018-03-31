import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.js'
import { Provider } from 'react-redux';

import 'isomorphic-fetch';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Login from './pages/login'

// const store = applyMiddleware()(createStore)();

ReactDOM.render(
    <Routes/>
    , document.getElementById('root')
);