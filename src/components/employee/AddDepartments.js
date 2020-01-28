import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
class AddDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: ''

    }
    this.createDepartment = this.createDepartment.bind(this)
  }
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  createDepartment = () => {
    var departmentData = {
      department: this.state.department,
    }
    axios.post("http://localhost:8089/prodigyportal/department/save", departmentData, { 'Content-Type': 'application/json' })
      .then(response => {
        this.props.onHide()
        this.clear()
        window.location.reload(false);
      })
  }
  clear() {
    this.setState({ department: '' })
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
                    <label>Department Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" name="department" value={this.state.department} onChange={this.changeHandler} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.createDepartment}>Create Department</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default AddDepartments;