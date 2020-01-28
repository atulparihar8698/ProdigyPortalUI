import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';
class DeleteEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empID: '',

    }
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }
  componentDidMount() {
    this.setState({ empID: this.props.defaultva })
  }

  deleteEmployee = () => {
    console.log(this.state.empID)
    axios.delete("http://localhost:8089/prodigyportal/employee/delete/" + this.state.empID, { 'Content-Type': 'application/json' })
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
            Delete Employee
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>Are you sure want to delete this?</p>


        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={this.deleteEmployee}>Delete</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default DeleteEmployee;