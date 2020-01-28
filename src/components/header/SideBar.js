import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SideBar extends Component {

  constructor() {
    super();
    this.state = {
      empMenuVisible: 'none',
    }
  }

  hideAndShowEmployeeMenu = () => {
    if (this.state.empMenuVisible == 'none') {
      this.setState({
        empMenuVisible: 'visible'
      }, () => {
        console.log(this.state.empMenuVisible)
      })

    } else {
      this.setState({
        empMenuVisible: 'none'
      })
    }

  }
  onSubMenuClick = () => {
    this.setState({
      empMenuVisible: 'visible'
    })
  }
  render() {
    return (

      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner drop-scroll msg-list-scroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="active">
                <a href="index.html">Dashboard</a>
              </li>


              <li className="submenu">
                <span onClick={this.hideAndShowEmployeeMenu}><a href="#" className="noti-dot"><span> Employees</span> <span className="menu-arrow" /></a></span>
                {this.state.empMenuVisible == 'visible' ?
                  <ul className="list-unstyled">
                    <span onClick={this.onSubMenuClick}><Link to="/allemployees">All Employees</Link></span>
                    <span onClick={this.onSubMenuClick}><Link to="/holidays">Holidays</Link></span>
                    <span onClick={this.onSubMenuClick}><Link to="/leaves"><span>Leave Requests</span><span className="badge bg-primary pull-right">1</span></Link></span>
                    <span onClick={this.onSubMenuClick}><Link to="attendence">Attendance</Link></span>
                    <span onClick={this.onSubMenuClick}><Link to="/departments">Departments</Link></span>
                    <span onClick={this.onSubMenuClick}><Link to="/designations">Designations</Link></span>
                  </ul> : null}
              </li>
              <li>
                <a href="clients.html">Clients</a>
              </li>
              <li>
                <a href="projects.html">Projects</a>
              </li>
              <li>
                <a href="tasks.html">Tasks</a>
              </li>
              <li className="submenu">
                <a href="#"><span> Calls</span> <span className="menu-arrow" /></a>
                <ul className="list-unstyled" style={{ display: 'none' }}>
                  <li><a href="voice-call.html">Voice Call</a></li>
                  <li><a href="video-call.html">Video Call</a></li>
                  <li><a href="incoming-call.html">Incoming Call</a></li>
                </ul>
              </li>
              <li>
                <a href="contacts.html">Contacts</a>
              </li>
              <li>
                <a href="leads.html">Leads</a>
              </li>
              <li className="submenu">
                <a href="#"><span> Accounts </span> <span className="menu-arrow" /></a>
                <ul className="list-unstyled" style={{ display: 'none' }}>
                  <li><a href="estimates.html">Estimates</a></li>
                  <li><a href="invoices.html">Invoices</a></li>
                  <li><a href="payments.html">Payments</a></li>
                  <li><a href="expenses.html">Expenses</a></li>
                  <li><a href="provident-fund.html">Provident Fund</a></li>
                  <li><a href="taxes.html">Taxes</a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#"><span> Payroll </span> <span className="menu-arrow" /></a>
                <ul className="list-unstyled" style={{ display: 'none' }}>
                  <li><a href="salary.html"> Employee Salary </a></li>
                  <li><a href="salary-view.html"> Payslip </a></li>
                </ul>
              </li>
              <li>
                <a href="worksheet.html">Timing Sheet</a>
              </li>
              <li>
                <a href="tickets.html">Tickets</a>
              </li>
              <li>
                <a href="events.html">Events</a>
              </li>
              <li>
                <a href="inbox.html">Email</a>
              </li>
              <li>
                <a href="chat.html">Chat <span className="badge bg-primary pull-right">5</span></a>
              </li>
              <li>
                <a href="assets.html">Assets</a>
              </li>
              <li>
                <a href="activities.html">Activities</a>
              </li>
              <li>
                <a href="users.html">Users</a>
              </li>
              <li className="submenu">
                <a href="#"><span> Reports </span> <span className="menu-arrow" /></a>
                <ul className="list-unstyled" style={{ display: 'none' }}>
                  <li><a href="expense-reports.html"> Expense Report </a></li>
                  <li><a href="invoice-reports.html"> Invoice Report </a></li>
                </ul>
              </li>
              <li>
                <a href="settings.html">Settings</a>
              </li>
              <li className="submenu">
                <a href="#"><span> Pages </span> <span className="menu-arrow" /></a>
                <ul className="list-unstyled" style={{ display: 'none' }}>
                  <li><a href="login.html"> Login </a></li>
                  <li><a href="register.html"> Register </a></li>
                  <li><a href="forgot-password.html"> Forgot Password </a></li>
                  <li><a href="profile.html"> Profile </a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>


    );
  }

} export default SideBar;