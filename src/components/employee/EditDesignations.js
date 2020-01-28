import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
class EditDesignations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designasionid: '',
      designasion: '',
      designasionDescription: '',
      records: [],
      singleDesignation: []
    }
    this.EditDesignation = this.EditDesignation.bind(this)

  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  EditDesignation = () => {
    var designasionData = {

      designasionId: this.state.designasionid,
      designasion: this.state.designasion,
      designasionDescription: this.state.designasion
    }
    console.log(designasionData)
    axios.put("http://localhost:8089/prodigyportal/designasion/update", designasionData, { 'Content-Type': 'application/json' })
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

  componentDidMount() {
    this.state.designasionid = this.props.defaultva
    this.state.records = this.props.records
    //console.log(this.state.records)
    this.props.records.map(record => record.designasionId == this.state.designasionid ? this.state.singleDesignation = record : '')
    this.state.designasion = this.state.singleDesignation.designasion;
    //console.log(this.state.singleDesignation)
    // axios.get("http://localhost:8089/prodigyportal/designasion/designasionById/"+this.props.defaultva,{'Content-Type': 'application/json'})
    //   .then(response  =>{
    //   this.setState({records:response.data})
    // })

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
            Edit Designation
                        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-dialog">
            <div className="modal-content modal-md" style={{ border: '0px' }}>
              <div className="modal-body">
                <form>
                  

                  <div className="form-group">
                    <label>Designation Name <span className="text-danger">*</span></label>
                    <input className="form-control" name="designasion" value={this.state.designasion} type="text" onChange={this.handleChange} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.EditDesignation}>Edit Designation</Button>
          <Button style={{ background: '#d94343' }} onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} export default EditDesignations;