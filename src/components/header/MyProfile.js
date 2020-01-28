import React,{Component} from 'react'

class MyProfile extends Component{
    render(){
        return(

            <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-sm-8">
              <h4 className="page-title">My Profile</h4>
            </div>
            <div className="col-sm-4 text-right m-b-30">
              <a href="edit-profile.html" className="btn btn-primary rounded"><i className="fa fa-plus" /> Edit Profile</a>
            </div>
          </div>
          <div className="card-box">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#"><img className="avatar" src="assets/img/user.jpg" alt="" /></a>
                    </div>
                  </div>
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 m-b-0">John Doe</h3>
                          <small className="text-muted">Web Designer</small>
                          <div className="staff-id">Employee ID : FT-0001</div>
                          <div className="staff-msg"><a href="chat.html" className="btn btn-custom">Send Message</a></div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <span className="title">Phone:</span>
                            <span className="text"><a href>9876543210</a></span>
                          </li>
                          <li>
                            <span className="title">Email:</span>
                            <span className="text"><a href>johndoe@example.com</a></span>
                          </li>
                          <li>
                            <span className="title">Birthday:</span>
                            <span className="text">24th July</span>
                          </li>
                          <li>
                            <span className="title">Address:</span>
                            <span className="text">1861 Bayonne Ave, Manchester Township, NJ, 08759</span>
                          </li>
                          <li>
                            <span className="title">Gender:</span>
                            <span className="text">Male</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card-box m-b-0">
                <h3 className="card-title">Skills</h3>
                <div className="skills">
                  <span>IOS</span>
                  <span>Android</span> 
                  <span>Html</span>
                  <span>CSS</span>
                  <span>Codignitor</span>
                  <span>Php</span>
                  <span>Javascript</span>
                  <span>Wordpress</span>
                  <span>Jquery</span>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card-box">
                <h3 className="card-title">Education Informations</h3>
                <div className="experience-box">
                  <ul className="experience-list">
                    <li>
                      <div className="experience-user">
                        <div className="before-circle" />
                      </div>
                      <div className="experience-content">
                        <div className="timeline-content">
                          <a href="#/" className="name">International College of Arts and Science (UG)</a>
                          <div>Bsc Computer Science</div>
                          <span className="time">2000 - 2003</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="experience-user">
                        <div className="before-circle" />
                      </div>
                      <div className="experience-content">
                        <div className="timeline-content">
                          <a href="#/" className="name">International College of Arts and Science (PG)</a>
                          <div>Msc Computer Science</div>
                          <span className="time">2000 - 2003</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-box m-b-0">
                <h3 className="card-title">Experience</h3>
                <div className="experience-box">
                  <ul className="experience-list">
                    <li>
                      <div className="experience-user">
                        <div className="before-circle" />
                      </div>
                      <div className="experience-content">
                        <div className="timeline-content">
                          <a href="#/" className="name">Web Designer at Zen Corporation</a>
                          <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="experience-user">
                        <div className="before-circle" />
                      </div>
                      <div className="experience-content">
                        <div className="timeline-content">
                          <a href="#/" className="name">Web Designer at Ron-tech</a>
                          <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="experience-user">
                        <div className="before-circle" />
                      </div>
                      <div className="experience-content">
                        <div className="timeline-content">
                          <a href="#/" className="name">Web Designer at Dalt Technology</a>
                          <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="notification-box">
          <div className="msg-sidebar notifications msg-noti">
            <div className="topnav-dropdown-header">
              <span>Messages</span>
            </div>
            <div className="drop-scroll msg-list-scroll">
              <ul className="list-box">
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">R</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Richard Miles </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item new-message">
                      <div className="list-left">
                        <span className="avatar">J</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">John Doe</span>
                        <span className="message-time">1 Aug</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">T</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Tarah Shropshire </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">M</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Mike Litorus</span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">C</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Catherine Manseau </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">D</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Domenic Houston </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">B</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Buster Wigton </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">R</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Rolland Webber </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">C</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author"> Claire Mapes </span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">M</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Melita Faucher</span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">J</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Jeffery Lalor</span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">L</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Loren Gatlin</span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="chat.html">
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar">T</span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">Tarah Shropshire</span>
                        <span className="message-time">12:28 AM</span>
                        <div className="clearfix" />
                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="chat.html">See all messages</a>
            </div>
          </div>
        </div>
      </div>
        )
    }
}export default MyProfile