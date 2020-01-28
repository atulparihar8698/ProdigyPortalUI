import React, { Component } from "react";
import logo from '../../img/logo.png'
import user from '../../img/user.jpg'
import NotificationBox from '../header/NotificationBox.js'
import axios from 'axios'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMenu: false,
      displaySidebar: false,
      marginProp: '14px',
      displayProfile: false,
      logmsg: 'Check In',
      btnBootstrap: 'btn btn-success',
      hours: '0',
      minutes: '0',
      seconds: '0',
      btnTimeVisibility: 'hidden',
      attendence_id: '',
      login_time: '',
      logout_time: '',
      employeeId: ''
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.hideSideBar = this.hideSideBar.bind(this)
    this.showProfile = this.showProfile.bind(this);
    this.hideProfile = this.hideProfile.bind(this)

  };


  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }
  showSideBar(event) {
    event.preventDefault();
    this.setState({ displaySidebar: true, marginProp: '-300px' }, () => {
      document.addEventListener('click', this.hideSideBar);
    });
  }
  hideSideBar() {
    this.setState({ displaySidebar: false, marginProp: '14px' }, () => {
      document.removeEventListener('click', this.hideSideBar);
    });
  }
  showProfile(event) {
    event.preventDefault();
    this.setState({ displayProfile: true }, () => {
      document.addEventListener('click', this.hideProfile);
    });
  }
  hideProfile() {
    this.setState({ displayProfile: false }, () => {
      document.removeEventListener('click', this.hideProfile);
    });
  }
  checkIn = () => {
    if (this.state.logmsg == 'Check In') {
      this.setState({ logmsg: 'Check Out', btnBootstrap: 'btn btn-success', btnTimeVisibility: 'visible' })

      axios.get("http://localhost:8089/prodigyportal/attendence/save")
        .then(response => {
          setInterval(this.timeCounter.bind(this), 1000);
          this.setState({
            records: response.data,
            timeCount: response.data.login_time,
            attendence_id: response.data.attendence_id,
            login_time: response.data.login_time,
            logout_time: response.data.logout_time,
            employeeId: response.data.employeeId

          })
        })
        .catch();
    } else {
      this.setState({ logmsg: 'Check In', btnBootstrap: 'btn btn-danger', btnTimeVisibility: 'hidden' })
      var attendence = {
        attendence_id: this.state.attendence_id,
        login_time: this.state.login_time,
        logout_time: new Date(),
        employeeId: this.state.employeeId
      }
      axios.put("http://localhost:8089/prodigyportal/attendence/update", attendence, { 'Content-Type': 'application/json' })

        .then(response => {
          window.location.reload(false);
        })
        .catch();
    }

  }
  timeCounter() {
    var date1, date2;
    date1 = new Date();

    date2 = new Date(this.state.timeCount);

    var res = Math.abs(date1 - date2) / 1000;

    this.setState({
      hours: Math.floor(res / 3600) % 24,
      minutes: Math.floor(res / 60) % 60,
      seconds: parseInt(res % 60),
    })

  }
  
  render() {

    return (
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src={logo} width={40} height={40} alt="" />
          </a>
        </div>
        <div className="page-title-box pull-left">
          <h3>Prodigy Software and Services</h3>
        </div>
        <button type="button" className="btn btn-light" style={{ marginLeft: '230px', width: '150px', marginTop: '13px', visibility: this.state.btnTimeVisibility }}>{this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds}</button>
        <button type="button" className={this.state.btnBootstrap} style={{ marginTop: '15px', marginLeft: '15px' }} onClick={this.checkIn} >{this.state.logmsg}</button>

        <a id="mobile_btn" className="mobile_btn pull-left" href="#sidebar"><i className="fa fa-bars" aria-hidden="true" /></a>
        <ul className="nav navbar-nav navbar-right user-menu pull-right" style={{ display: "inline-block" }}>
          <li className="dropdown hidden-xs">
            <a href="#" className="pull-right" data-toggle="" onClick={this.showDropdownMenu}><i className="fa fa-bell-o" /> <span className="badge bg-purple pull-right" >3</span></a>


            {this.state.displayMenu ? (


              <div className="dropdown notifications list-group-item" style={{ marginTop: '59px' }}>
                <div className="topnav-dropdown-header">
                  <span>Notifications</span>
                </div>
                <div className="drop-scroll">
                  <ul className="media-list">
                    <li className="media notification-message">
                      <a href="activities.html">
                        <div className="media-left">
                          <span className="avatar">
                            <img alt="John Doe" src={user} className="img-responsive img-circle" />
                          </span>
                        </div>
                        <div className="media-body">
                          <p className="m-0 noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                          <p className="m-0"><span className="notification-time">4 mins ago</span></p>
                        </div>
                      </a>
                    </li>
                    <li className="media notification-message">
                      <a href="activities.html">
                        <div className="media-left">
                          <span className="avatar">V</span>
                        </div>
                        <div className="media-body">
                          <p className="m-0 noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                          <p className="m-0"><span className="notification-time">6 mins ago</span></p>
                        </div>
                      </a>
                    </li>
                    <li className="media notification-message">
                      <a href="activities.html">
                        <div className="media-left">
                          <span className="avatar">L</span>
                        </div>
                        <div className="media-body">
                          <p className="m-0 noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                          <p className="m-0"><span className="notification-time">8 mins ago</span></p>
                        </div>
                      </a>
                    </li>
                    <li className="media notification-message">
                      <a href="activities.html">
                        <div className="media-left">
                          <span className="avatar">G</span>
                        </div>
                        <div className="media-body">
                          <p className="m-0 noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                          <p className="m-0"><span className="notification-time">12 mins ago</span></p>
                        </div>
                      </a>
                    </li>
                    <li className="media notification-message">
                      <a href="activities.html">
                        <div className="media-left">
                          <span className="avatar">V</span>
                        </div>
                        <div className="media-body">
                          <p className="m-0 noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
                          <p className="m-0"><span className="notification-time">2 days ago</span></p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <a href="activities.html">View all Notifications</a>
                </div>
              </div>

            ) :
              (
                null
              )
            }



          </li>
          <li className="dropdown hidden-xs">
            <a href="javascript:;" id="open_msg_box" className="hasnotifications pull-right" onClick={this.showSideBar} ><i className="fa fa-comment-o" /> <span className="badge bg-purple pull-right">8</span></a>

            <NotificationBox
              marginprop={this.state.marginProp}
            />



          </li>
          <li className="dropdown">
            <a href="profile.html" onClick={this.showProfile} className="dropdown-toggle user-link" data-toggle="dropdown" title="Admin" style={{ marginRight: '20px' }}>
              <span className="user-img"><img className="img-circle" src={user} width={40} alt="Admin" />
                <span className="status online" /></span>
              <span>Admin</span>
              <i className="caret" />
            </a>
            {this.state.displayProfile ?
              (<ul className="dropdown-menu list-group-item">
                <li><a href="myprofile">My Profile</a></li>
                <li><a href="edit-profile.html">Edit Profile</a></li>
                <li><a href="settings.html">Settings</a></li>
                <li><a href="login.html">Logout</a></li>
              </ul>
              ) : (null)
            }
          </li>
        </ul>
        <div className="dropdown mobile-user-menu pull-right">
          <a href="#" className="dropdown-toggle pull-right" data-toggle="dropdown " aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
          <ul className="dropdown-menu pull-right">
            <li><a href="profile.html">My Profile</a></li>
            <li><a href="edit-profile.html">Edit Profile</a></li>
            <li><a href="settings.html">Settings</a></li>
            <li><a href="login.html">Logout</a></li>
          </ul>
        </div>
      </div>
    );
  }
} export default Header;