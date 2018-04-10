import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Login from './pages/login';
import Manage from './pages/manage';
import Clockin from './components/clockIn';
import Employeeinfo from './components/employeeInfo';
import Changepassword from './components/changePassword';
import Payment from './components/payment'
import Holiday from './components/holiday'
import Attendance from './components/attendance'
import Aducation from './components/aducation'
import SendResume from './pages/sendresume'
import RewardAndPunishRecord from './components/rewardAndPunishRecord'
import Interview from './components/interviewInfo'

export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/manage" component={Manage}>
            <IndexRoute component={Clockin} />
            <Route path="employeeinfo" component={Employeeinfo} />
            <Route path="changepassword" component={Changepassword} />
            <Route path="payment" component={Payment} />
            <Route path="holiday" component={Holiday} />
            <Route path="attendance" component={Attendance} />
            <Route path="aducation" component={Aducation} />
            <Route path="record" component={RewardAndPunishRecord} />
            <Route path="interview" component={Interview} />
        </Route>
        <Route path="sendresume" component={SendResume}></Route>
    </Router>
)
