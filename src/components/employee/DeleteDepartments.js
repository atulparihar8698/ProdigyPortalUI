import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
class DeleteDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department_Id: ''
    }
    this.deleteDepartment = this.deleteDepartment.bind(this)
  }
  componentDidMount() {
    this.state.department_Id = this.props.defaultva
  }
  deleteDepartment = () => {
    axios.delete("http://localhost:8089/prodigyportal/department/delete/" + this.state.department_Id)
      .then(response => {
        this.props.onHide()
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
            Delete Department
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <p>Are you sure want to delete this?</p>


        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={this.deleteDepartment}>Delete</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default DeleteDepartments;