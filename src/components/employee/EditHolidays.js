import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
class EditHolidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holiday_date: '',
      holidays_name: '',
      records: [],
      holidays_id: '',
      singleHoliday: []
    }
    this.EditHolidays = this.EditHolidays.bind(this)
  }
  EditHolidays = () => {
    var holiday = {
      holidays_id: this.state.holidays_id,
      holiday_date: this.state.holiday_date,
      holidays_name: this.state.holidays_name,

    }
    console.log(holiday)
    axios.put("http://localhost:8089/prodigyportal/holidays/update", holiday, { 'Content-Type': 'application/json' })
      .then(response => {
        this.props.onHide()
        this.clear()
        window.location.reload(false);
      })
  }
  clear = () => {
    this.setState({
      holidays_id: '',
      holiday_date: '',
      holidays_name: '',
    })
  }
  handleDateChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  componentDidMount() {
    this.state.holidays_id = this.props.defaultva
    this.state.records = this.props.records
    this.props.records.map(record => record.holidays_id == this.state.holidays_id ? this.state.singleHoliday = record : '')
    this.state.holidays_id = this.state.singleHoliday.holidays_id
    this.state.holidays_name = this.state.singleHoliday.holidays_name
    this.state.holiday_date = this.state.singleHoliday.holiday_date
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Holiday
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-dialog">
            <div className="modal-content modal-md" style={{ border: '0px' }}>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Holiday Name <span className="text-danger">*</span></label>
                    <input className="form-control" name="holidays_name" value={this.state.holidays_name} type="text" onChange={this.handleDateChange} />
                  </div>
                  <div className="form-group">
                    <label>Holiday Date <span className="text-danger">*</span></label>
                    <Form.Control type="date" name="holiday_date" value={this.state.holiday_date} onChange={this.handleDateChange} />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.EditHolidays}>Edit Holiday</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default EditHolidays;