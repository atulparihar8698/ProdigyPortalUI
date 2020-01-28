import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
class EditLeave extends Component {
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
            leaveRecords: []
        }
        this.EditLeave = this.EditLeave.bind(this)
    }
    EditLeave = () => {

        var leaveObj = {
            leave_type: this.state.leave_type,
            leave_from: this.state.leave_from,
            leave_to: this.state.leave_to,
            reason: this.state.reason,
            no_days: this.state.no_days,
            status: 'N',
            employee_id: 'PGI-1'
        }


        axios.put("http://localhost:8089/prodigyportal/holidays/update", leaveObj, { 'Content-Type': 'application/json' })
            .then(response => {
                this.props.onHide()
                this.clear()
                window.location.reload(false);
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
    handleDateChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount() {
        axios.get("http://localhost:8089/prodigyportal/leavetype/all")
            .then(response => {
                this.setState({ leaveRecords: response.data })
            })
            .catch();
        var leaveid = this.props.defaultva
        axios.get("http://localhost:8089/prodigyportal/empleaves/empLeavesById/"+leaveid)
            .then(response => {
                console.log(response.data)
                this.setState({
                    leave_id: response.data.leave_id,
                    leave_type: response.data.leave_type,
                    leave_from: response.data.leave_from,
                    leave_to: response.data.leave_to,
                    reason: response.data.reason,
                    no_days: response.data.no_days,
                    status: response.data.status,
                    employee_id: response.data.employee_id
                })
            })
            .catch();
    }
    render() {
        const { leaveRecords } = this.state
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Leave
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
                                            <option value={0} key={0}  >Select Leave Type</option>
                                            {
                                                leaveRecords.map(record => <option value={record.leavetype_id} key={record.leavetype_id} >{record.leave_type}</option>)
                                            }
                                        </Form.Control>
                                    </div>
                                    <div className="form-group">
                                        <label>From <span className="text-danger">*</span></label>
                                        <Form.Control type="date" name="leave_from" value={this.state.leave_from} required onChange={this.handleDateChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>To <span className="text-danger">*</span></label>
                                        <Form.Control type="date" name="leave_to" value={this.state.leave_to} required onChange={this.handleDateChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of days <span className="text-danger">*</span></label>
                                        <input className="form-control" readOnly name="no_days" type="text" value={this.state.no_days} onChange={this.handleChange} />
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
                    <Button onClick={this.EditLeave}>Edit Holiday</Button>
                    <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
} export default EditLeave;