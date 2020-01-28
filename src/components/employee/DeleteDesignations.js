import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
class DeleteDesignations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designationId: ''
    }
    this.deleteDesignation = this.deleteDesignation.bind(this)
  }
  componentDidMount() {
    this.state.designationId = this.props.defaultva
  }
  deleteDesignation = () => {
    axios.delete("http://localhost:8089/prodigyportal/designasion/delete/" + this.state.designationId)
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
            Delete Designation
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>Are you sure want to delete this?</p>



        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={this.deleteDesignation}>Delete</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default DeleteDesignations;