import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Login from './pages/login';
import Manage from './pages/manage';
import Clockin from './components/clockIn';
import Employeeinfo from './components/employeeInfo';
import Changepassword from './components/changePassword';
import Payment from './components/payment'

export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/manage" component={Manage}>
            <IndexRoute component={Clockin} />
            <Route path="employeeinfo" component={Employeeinfo} />
            <Route path="changepassword" component={Changepassword}/>
            <Route path="payment" component={Payment}/>
        </Route>
    </Router>
)
