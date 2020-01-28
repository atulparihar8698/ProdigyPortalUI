import React, { Component } from "react";
import { Modal, Button , Form} from 'react-bootstrap'
import axios from 'axios';
export class AddHolidays extends Component {
  constructor(props) {
    super(props);
    this.state={
      holiday_date:'',
      holidays_name:''
    }
    this.createHoliday=this.createHoliday.bind(this)
  }
  createHoliday = (event) => {
    var holiday = {
      holiday_date: this.state.holiday_date,
      holidays_name: this.state.holidays_name,
      
    }
    console.log(holiday)
    axios.post("http://localhost:8089/prodigyportal/holidays/save", holiday, { 'Content-Type': 'application/json' })
      .then(response => {
        this.props.onHide()
        this.clear()
        window.location.reload(false);
      })
  }
  clear = () => {
    this.setState({
      holiday_date: '',
      holidays_name: '',
    })
  }
  handleDateChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
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
            Add New Holiday
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-dialog">

            <div className="modal-content modal-md" style={{ border: '0px' }}>

              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Holiday Name <span className="text-danger">*</span></label>
                    <input className="form-control" name="holidays_name" value={this.state.holidays_name} type="text" onChange={this.handleDateChange}/>
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
          <Button onClick={this.createHoliday}>Create Holiday</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default AddHolidays;