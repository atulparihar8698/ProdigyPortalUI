import React, { Component } from "react";
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import DatePicker from "react-datepicker";
export class AddLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leave_id: '',
            leave_type: 0,
            leave_from: '',
            leave_to: '',
            reason: '',
            status: '',
            no_days: '',
            employee_id: '',
            LeaveTypeRecords: []
        }
        this.sendLeaveRequest = this.sendLeaveRequest.bind(this);
    }

    sendLeaveRequest = (event) => {
        var leaveObj = {
            leave_type: this.state.leave_type,
            leave_from: this.state.leave_from,
            leave_to: this.state.leave_to,
            reason: this.state.reason,
            no_days: this.state.no_days,
            status: 'N',
            employee_id: 'PGI-1'
        }
        axios.post("http://localhost:8089/prodigyportal/empleaves/save", leaveObj, { 'Content-Type': 'application/json' })
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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    clear = () => {
        this.setState({
            leave_id: '',
            leave_type: 0,
            leave_from: '',
            leave_to: '',
            reason: '',
            no_days: '',
            status: '',
            employee_id: ''
        })
    }



    componentDidMount() {

        axios.get("http://localhost:8089/prodigyportal/leavetype/all")
            .then(response => {
                this.setState({ LeaveTypeRecords: response.data })
            })
            .catch();

        // axios.get("http://localhost:8089/prodigyportal/company/all")
        //   .then(response => {
        //     this.setState({ companyRecords: response.data })
        //   })

        // axios.get("http://localhost:8089/prodigyportal/employee/getMaxEmployeeId")
        //   .then(response => {
        //     console.log(response.data)
        //     this.setState({ employeeId: response.data })
        //   })
    }

    render() {
        const { LeaveTypeRecords } = this.state;
        var dt1 = new Date(this.state.leave_from);
        var dt2 = new Date(this.state.leave_to);
        this.state.no_days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)) + 1;

        var diff = isNaN(this.state.no_days) ? '0' : this.state.no_days
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Leave Request
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="modal-dialog">
                        <div className="modal-content modal-md" style={{ border: '0px' }}>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Leave Type <span className="text-danger">*</span></label>
                                        <Form.Control as="select" className="select" name="leave_type" value={this.state.leave_type} onChange={this.handleChange}>
                                            <option value={0} key={0} defaultChecked >Select Leave Type</option>
                                            {
                                                LeaveTypeRecords.map(record => <option value={record.leavetype_ID} key={record.leavetype_ID} >{record.leave_TYPE}</option>)
                                            }
                                        </Form.Control>
                                    </div>
                                    <div className="form-group">
                                        <label>From <span className="text-danger">*</span></label>
                                        <Form.Control type="date" name="leave_from" value={this.state.leave_from} onChange={this.handleDateChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>To <span className="text-danger">*</span></label>
                                        <Form.Control type="date" name="leave_to" value={this.state.leave_to} onChange={this.handleDateChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of days <span className="text-danger">*</span></label>
                                        <input className="form-control" readOnly name="no_days" type="text" value={diff} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Remaining Leaves <span className="text-danger">*</span></label>
                                        <input className="form-control" readOnly defaultValue={12} type="text" name="remain_days" value={this.state.remain_days} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Leave Reason <span className="text-danger">*</span></label>
                                        <textarea rows={4} cols={5} className="form-control" name="reason" value={this.state.reason} onChange={this.handleChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.sendLeaveRequest}>Send Leave Request</Button>
                    <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
} export default AddLeave;