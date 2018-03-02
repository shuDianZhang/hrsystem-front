import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Login from './pages/login'
import Manage from './pages/manage'

export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/manage" component={Manage}></Route>
    </Router>
)
