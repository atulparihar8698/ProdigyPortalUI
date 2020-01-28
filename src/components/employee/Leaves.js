import React, { Component, Fragment } from "react";
import AddLeave from "./AddLeave";
import { Button, ButtonToolbar } from 'react-bootstrap'
import { AddEmployee } from './AddEmployee'
import { Link, BrowserRouter } from 'react-router-dom'
import EditLeave from './EditLeave'
import DeleteLeave from './DeleteLeave'
import axios from 'axios';
class Leaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
      editDelOptionShow: 'hide',
      empLeavesRecords: [],
      designation: '',
      allHolidays: [],
      editDelHideShow: '',
      leaveRecords: [],
      allEmployees: [],
      desigRecords: []

    }
    // this.showEditDelOption =this.showEditDelOption.bind(this)
  }
  showEditDelOption = (e, data) => {
  
    if (data == this.state.editDelHideShow) {
      if (this.state.editDelOptionShow == 'hide') {
        this.setState({
          editDelOptionShow: 'show',
          editDelHideShow: data
        })
      } else {
        this.setState({
          editDelOptionShow: 'hide',
          editDelHideShow: data
        })
      }
    } else {
      this.setState({
        editDelOptionShow: 'show',
        editDelHideShow: data
      })
    }
  }
  handleChanges = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  componentDidMount() {
    axios.get("http://localhost:8089/prodigyportal/empleaves/all")
      .then(response => {
        this.setState({ empLeavesRecords: response.data })
      })
      .catch();
    axios.get("http://localhost:8089/prodigyportal/leavetype/all")
      .then(response => {
        this.setState({ leaveRecords: response.data })
      })
      .catch();
    axios.get("http://localhost:8089/prodigyportal/employee/getAll")
      .then(response => {
        this.setState({ allEmployees: response.data })
      })
      .catch();

    axios.get("http://localhost:8089/prodigyportal/designasion/all")
      .then(response => {
        this.setState({ desigRecords: response.data })
      })
      .catch();
  }
  render() {
    const { empLeavesRecords, leaveRecords, allEmployees, desigRecords } = this.state
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false })
    let deleteModalClose = () => this.setState({ deleteModalShow: false })

    // var empFirsChar='';
    // var empName=''
    // var empdesig=''
    // function getEmployee(empid){
    //   for(let i=0;i<allEmployees.length;i++){
    //     if(allEmployees[i].employeeId==empid){
    //       empFirsChar=allEmployees[i].firstName.charAt(0)

    //     }
    //   }
    // }
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-xs-8">
              <h4 className="page-title">Leave Request</h4>
            </div>
            <div className="col-xs-4 text-right m-b-30">
              <ButtonToolbar>
                <BrowserRouter>
                  <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                  >Add Leave</Button>
                  <AddLeave
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                  />
                </BrowserRouter>
              </ButtonToolbar>
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-sm-3 col-md-2 col-xs-6">
              <div className="form-group form-focus">
                <label className="control-label">Employee Name</label>
                <input type="text" className="form-control floating" />
              </div>
            </div>
            <div className="col-sm-3 col-md-2 col-xs-6">
              <div className="form-group form-focus select-focus">
                <label className="control-label">Leave Type</label>
                <select className="select floating">
                  <option value> -- Select -- </option>
                  <option value>Casual Leave</option>
                  <option value={1}>Medical Leave</option>
                  <option value={1}>Loss of Pay</option>
                </select>
              </div>
            </div>
            <div className="col-sm-3 col-md-2 col-xs-6">
              <div className="form-group form-focus select-focus">
                <label className="control-label">Leave Status</label>
                <select className="select floating">
                  <option value> -- Select -- </option>
                  <option value={0}> Pending </option>
                  <option value={1}> Approved </option>
                  <option value={2}> Rejected </option>
                </select>
              </div>
            </div>
            <div className="col-sm-3 col-md-2 col-xs-6">
              <div className="form-group form-focus">
                <label className="control-label">From</label>
                <div className="cal-icon"><input className="form-control floating datetimepicker" type="text" /></div>
              </div>
            </div>
            <div className="col-sm-3 col-md-2 col-xs-6">
              <div className="form-group form-focus">
                <label className="control-label">To</label>
                <div className="cal-icon"><input className="form-control floating datetimepicker" type="text" /></div>
              </div>
            </div>
            <div className="col-sm-3 col-md-2 col-xs-6">
              <a href="#" className="btn btn-success btn-block"> Search </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table m-b-0 datatable">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>No of Days</th>
                      <th>Reason</th>
                      <th className="text-center">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      empLeavesRecords.map(record =>
                        <tr>
                          <td>
                            <a className="avatar">
                              {allEmployees.map(
                                emp => emp.employeeId == record.employee_id ? emp.firstName.charAt(0) : ''
                              )}
                            </a>
                            <h2><a href="#">
                              {allEmployees.map(
                                emp => emp.employeeId == record.employee_id ? emp.firstName + ' ' + emp.lastName : ''
                              )
                              }
                              <span>
                                {
                                  allEmployees.map(
                                    emp => emp.employeeId == record.employee_id ? (
                                      desigRecords.map(
                                        desig => emp.designasion == desig.designasionId ? desig.designasion : ''
                                      )) : ('')
                                  )
                                }
                              </span>
                            </a>
                            </h2>
                          </td>
                          <td>{leaveRecords.map(lrecord => lrecord.leavetype_id == record.leave_type ? lrecord.leave_type : '')}</td>
                          <td>{record.leave_from}</td>
                          <td>{record.leave_to}</td>
                          <td>{record.no_days} days</td>
                          <td>{record.reason}</td>
                          <td className="text-center">
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-purple" /> {record.status == 'N' ? ('New') : (record.status == 'D' ? ('Declined') : (record.status == 'A' ? ('Approved') : ('')))} <i className="caret" />
                              </a>
                              <ul className="dropdown-menu pull-right">
                                <li><a href="#"><i className="fa fa-dot-circle-o text-purple" /> New</a></li>
                                <li><a href="#"><i className="fa fa-dot-circle-o text-info" /> Pending</a></li>
                                <li><a href="#"><i className="fa fa-dot-circle-o text-success" /> Approved</a></li>
                                <li><a href="#"><i className="fa fa-dot-circle-o text-danger" /> Declined</a></li>
                              </ul>
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="dropdown">
                              <span onClick={((e) => this.showEditDelOption(e, record.leave_id))} ><a href="#" className="action-icon dropdown-toggle" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a></span>
                              {this.state.editDelOptionShow == 'show' ?
                                <ul className="list-group-item" name={record.leave_id} style={{ visibility: this.state.editDelHideShow == record.leave_id ? 'visible' : 'hidden' }}>
                                  <ButtonToolbar>
                                    <BrowserRouter>
                                      <a onClick={() => this.setState({ editModalShow: true })}
                                      ><i className="fa fa-pencil m-r-5" />Edit</a>
                                      <EditLeave
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        defaultva={this.state.editDelHideShow}
                                      />
                                    </BrowserRouter>
                                  </ButtonToolbar>
                                  <ButtonToolbar>
                                    <BrowserRouter>
                                      <a onClick={() => this.setState({ deleteModalShow: true })}
                                      ><i className="fa fa-trash-o m-r-5" />Delete</a>
                                      <DeleteLeave
                                        show={this.state.deleteModalShow}
                                        onHide={deleteModalClose}
                                        defaultva={this.state.editDelHideShow}
                                      />
                                    </BrowserRouter>
                                  </ButtonToolbar>

                                </ul> : null
                              }

                            </div>
                          </td>
                        </tr>



                      )

                    }

                  </tbody>
                </table>
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
    );
  }
} export default Leaves;