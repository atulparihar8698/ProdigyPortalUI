import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './assets/css/bootstrap-datetimepicker.min.css';
import './assets/css/dataTables.bootstrap.min.css';
import './assets/css/select2.min.css';
import './assets/css/style.css';

import Header from './components/header/Header.js'
import SideBar from './components/header/SideBar.js'
import AllEmployees from './components/employee/AllEmployees.js'
import Holidays from './components/employee/Holidays.js'
import Departments from './components/employee/Departments.js'
import Designations from './components/employee/Designations.js'
import Leaves from './components/employee/Leaves.js'
import Attendence from './components/employee/Attendence.js'
import EditEmployee from './components/employee/EditEmployee.js'
import EmployeeList from './components/employee/EmployeeList.js'
import MyProfile from './components/header/MyProfile.js'
function App() {
  return (
    <Router>
      <div>
        <div className="main-wrapper">
          <Header></Header>
          <SideBar></SideBar>
          <Switch>
            <Route path="/allemployees" component={AllEmployees} />
            <Route path="/" exact component={AllEmployees} />
            <Route path="/employeelist" component={EmployeeList}></Route>
            <Route path="/holidays" component={Holidays}></Route>
            <Route path="/departments" component={Departments}></Route>
            <Route path="/designations" component={Designations}></Route>
            <Route path="/leaves" component={Leaves}></Route>
            <Route path="/attendence" component={Attendence}></Route>
            <Route path="/editemployee" component={EditEmployee}></Route>
            <Route path="/myprofile" component={MyProfile}></Route>
          </Switch>

          <div className="sidebar-overlay" data-reff="#sidebar"></div>
        </div>
      </div>
    </Router>

  );
}
export default App;
