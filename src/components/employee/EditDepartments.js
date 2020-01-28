import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
class EditDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: '',
      department_Id: '',
      records: [],
      singleDepartment: ''
    }

    this.editDepartment = this.editDepartment.bind(this)

  }
  editDepartment = () => {
    var departmentData = {
      department_Id: this.state.department_Id,
      department: this.state.department
    }
    console.log(departmentData)
    axios.put("http://localhost:8089/prodigyportal/department/update", departmentData, { 'Content-Type': 'application/json' })
      .then(response => {
        this.props.onHide()
        this.clear()
        window.location.reload(false);
      })
  }
  clear() {
    this.setState({
      department: '',
      department_Id: ''
    })
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  componentDidMount() {
    this.state.department_Id = this.props.defaultva
    this.state.records = this.props.records
    this.props.records.map(record => record.department_Id == this.state.department_Id ? this.state.singleDepartment = record : '')
    this.state.department = this.state.singleDepartment.department;
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
                    <input className="form-control" name="department" value={this.state.department} type="text" onChange={this.handleChange} />
                  </div>
                </form>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.editDepartment}>Save Changes</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default EditDepartments;