import React, { Component } from "react";
import Header from './header/Header.js';
import AllEmployees from './employee/AllEmployees.js'
import EmployeeList from './employee/EmployeeList.js'



class Home extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <AllEmployees></AllEmployees>
                <div className="sidebar-overlay" data-reff="#sidebar"></div>
            </div>
        );
    }
} export default Home;

