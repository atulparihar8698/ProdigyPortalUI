import React, { Component, Fragment } from "react";
import { Button, ButtonToolbar, Form } from 'react-bootstrap'
import { AddEmployee } from './AddEmployee'
import { Link, BrowserRouter } from 'react-router-dom'
import EditEmployee from './EditEmployee'
import DeleteEmployee from './DeleteEmployee'
import { GetDesignation } from '../../services/EmployeeService.js'
import axios from 'axios';

class AllEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
      editDelOptionShow: 'hide',
      records: [],
      designation: '',
      allEmployees: [],
      editDelHideShow: '',
      empid: ''
    }
    // this.showEditDelOption =this.showEditDelOption.bind(this)
  }
  showEditDelOption = (e, data) => {
   
    // console.log(data)
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
    axios.get("http://localhost:8089/prodigyportal/designasion/all")
      .then(response => {
        //console.log(response.data)
        this.setState({ records: response.data })
      })
      .catch();
    axios.get("http://localhost:8089/prodigyportal/employee/getAll")
      .then(response => {
        //console.log(response.data)
        this.setState({ allEmployees: response.data })
      })
      .catch();

  }

  render() {
    const { records, allEmployees, editDelHideShow } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false })
    let deleteModalClose = () => this.setState({ deleteModalShow: false })
    return (

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-xs-4">
              <h4 className="page-title">Employee</h4>
            </div>
            
            <div className="col-xs-8 text-right m-b-20" style={{"margin-left": '613px' }}>
              {/* <a href="#" className="btn btn-primary rounded pull-right" data-toggle="modal" data-target="#add_employee"><i className="fa fa-plus" /> Add Employee</a> */}

              
              <div className="view-icons">
                <Link to="/allemployees" className="grid-view btn btn-link active"><i className="fa fa-th" /></Link>
                <Link to="/employeelist" className="list-view btn btn-link"><i className="fa fa-bars" /></Link>
              </div>
              
            </div>
            <ButtonToolbar>
                <BrowserRouter>

                  <Button style={{"margin-bottom": '20px', "border-radius": '20px'}}
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                  >Add Employee</Button>

                  <AddEmployee
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                  />
                </BrowserRouter>
              </ButtonToolbar>
          </div>
          <div className="row filter-row">

            <div className="col-sm-3 col-xs-6">
              <div className="form-group form-focus">
                <label className="control-label">Employee ID</label>
                <input type="text" className="form-control floating" />
              </div>
            </div>
            <div className="col-sm-3 col-xs-6">
              <div className="form-group form-focus">
                <label className="control-label">Employee Name</label>
                <input type="text" className="form-control floating" />
              </div>
            </div>
            <div className="col-sm-3 col-xs-6">
              <div className="form-group form-focus select-focus">
                <label className="control-label">Designation</label>
                <Form.Control as="select" className="select" name="designasion" value={this.state.designasion} onChange={this.handleChanges}>
                  {

                    records.map(record => <option key={record.designasionId} value={record.designasionId}>{record.designasion}</option>)
                  }
                </Form.Control>
              </div>
            </div>
            <div className="col-sm-3 col-xs-6">
              <a href="#" className="btn btn-success btn-block"> Search </a>
            </div>
          </div>
          <div className="row staff-grid-row">
            {allEmployees.map(employee =>

              <div className="col-md-4 col-sm-4 col-xs-6 col-lg-3">
                <div className="profile-widget">
                  <div className="profile-img">
                    <a href="profile.html" className="avatar">{employee.firstName.charAt(0)}</a>
                  </div>
                  <div className="dropdown profile-action">
                    <span onClick={((e) => this.showEditDelOption(e, employee.employeeId))} ><a href="#" className="action-icon dropdown-toggle" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a></span>
                    {this.state.editDelOptionShow == 'show' ?
                      <ul className="list-group-item" name={employee.employeeId} style={{ visibility: this.state.editDelHideShow == employee.employeeId ? 'visible' : 'hidden' }}>
                        <ButtonToolbar>
                          <BrowserRouter>
                            <a  onClick={() => this.setState({ editModalShow: true })}
                            ><i className="fa fa-pencil m-r-5" />Edit</a>
                            <EditEmployee
                              show={this.state.editModalShow}
                              onHide={editModalClose}
                              defaultva={this.state.editDelHideShow}
                            />
                          </BrowserRouter>
                        </ButtonToolbar>
                        <ButtonToolbar>
                          <BrowserRouter>
                            <a  onClick={() => this.setState({ deleteModalShow: true })}
                            ><i className="fa fa-trash-o m-r-5" />Delete</a>
                            <DeleteEmployee
                              show={this.state.deleteModalShow}
                              onHide={deleteModalClose}
                              defaultva={this.state.editDelHideShow}
                            />
                          </BrowserRouter>
                        </ButtonToolbar>

                      </ul> : null
                    }
                  </div>
                  <h4 className="user-name m-t-10 m-b-0 text-ellipsis"><a href="profile.html">{employee.firstName} {employee.lastName}</a></h4>
                  <div className="small text-muted" >
                    {
                      records.map(record =>
                        record.designasionId == employee.designasion ? record.designasion : ''
                      )
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    );
  }
} export default AllEmployees;