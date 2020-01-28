import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';
class DeleteHolidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holiday_id: '',

    }
    this.deleteHolidays = this.deleteHolidays.bind(this)
  }
  componentDidMount() {
    this.setState({ holiday_id: this.props.defaultva })
  }

  deleteHolidays = () => {
    console.log(this.state.holiday_id)
    axios.delete("http://localhost:8089/prodigyportal/holidays/delete/" + this.state.holiday_id, { 'Content-Type': 'application/json' })
      .then(response => {
        window.location.reload(false);
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
            Delete Holiday
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <p>Are you sure want to delete this?</p>


        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={this.deleteHolidays}>Delete</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default DeleteHolidays;