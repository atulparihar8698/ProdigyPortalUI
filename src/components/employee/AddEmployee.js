import React, { Component } from "react";
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import DatePicker from "react-datepicker";
export class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      cnfrmPassword: '',
      phone: '',
      employeeId: '',
      email: '',
      designationRecord: [],
      companyRecords: [],
      company: '',
      joiningDate: '',
      designasion: ''
    }
    this.createEmployee = this.createEmployee.bind(this);
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChanges = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createEmployee = (event) => {
    var employee = {
      employeeId: this.state.employeeId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      joiningDate: this.state.joiningDate,
      phone: this.state.phone,
      designasion: this.state.designasion,
      company: this.state.company
    }
    console.log(employee)
    axios.post("http://localhost:8089/prodigyportal/employee/create", employee, { 'Content-Type': 'application/json' })
      .then(response => {
        this.props.onHide()
        this.clear()
        window.location.reload(false);
      })
  }

  handleDateChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  clear = () => {
    this.setState({
      employeeId: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      joiningDate: '',
      phone: '',
      designasion: '',
      company: '',
      cnfrmPassword: '',
    })
  }

  componentDidMount() {
    axios.get("http://localhost:8089/prodigyportal/designasion/all")
      .then(response => {
        this.setState({ designationRecord: response.data })
      })
      .catch();

    axios.get("http://localhost:8089/prodigyportal/company/all")
      .then(response => {
        this.setState({ companyRecords: response.data })
      })

    axios.get("http://localhost:8089/prodigyportal/employee/getMaxEmployeeId")
      .then(response => {
        console.log(response.data)
        this.setState({ employeeId: response.data })
      })
  }

  render() {
    const { designationRecord, companyRecords } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-dialog">

            <div className="modal-content modal-lg" style={{ border: '0px' }}>

              <div >
                <form >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">First Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Last Name</label>
                        <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Username <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Email <span className="text-danger">*</span></label>
                        <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Password</label>
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Confirm Password</label>
                        <input className="form-control" type="password" name="cnfrmPassword" value={this.state.cnfrmPassword} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Employee ID <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="employeeId" value={this.state.employeeId} onChange={this.changeHandler} readOnly />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Joining Date <span className="text-danger">*</span></label>
                        <Form.Control type="date" name="joiningDate" value={this.state.joiningDate} required onChange={this.handleDateChange} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Phone </label>
                        <input className="form-control" type="text" name="phone" value={this.state.phone} onChange={this.changeHandler} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Company</label>
                        <Form.Control as="select" name="company" value={this.state.company} onChange={this.handleChanges}>
                          <option key={0} value={0}>Select Company</option>
                          {
                            companyRecords.map(record => <option key={record.company_Id} value={record.company_Id}>{record.company}</option>)
                          }
                        </Form.Control>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="control-label">Designation</label>
                        <Form.Control as="select" className="select" name="designasion" value={this.state.designasion} onChange={this.handleChanges}>
                          <option key={0} value={0}>Select Designation</option>
                          {
                            designationRecord.map(record => <option key={record.designasionId} value={record.designasionId}>{record.designasion}</option>)
                          }
                        </Form.Control>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.createEmployee}>Create Employee</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}