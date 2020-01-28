import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
class AddDesignations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designasion: '',
      designasionDescription: ''
    }
    this.AddDesignations = this.AddDesignations.bind(this)
  }
  changehandle = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  AddDesignations = () => {
    var designasionData = {
      designasion: this.state.designasion,
      designasionDescription: this.state.designasion
    }
    axios.post("http://localhost:8089/prodigyportal/designasion/save", designasionData, { 'Content-Type': 'application/json' })
      .then(response => {
        this.props.onHide()
        this.clear()
        window.location.reload(false);
      })
  }
  clear() {
    this.setState({
      designasion: '',
      designasionDescription: ''
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
            Add Designation
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-dialog">
            <div className="modal-content modal-md" style={{ border: '0px' }}>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Designation Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" name="designasion" value={this.state.designasion} onChange={this.changehandle} />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.AddDesignations}>Create Designation</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default AddDesignations;