import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { AddEmployee } from './AddEmployee'
import { Link, BrowserRouter } from 'react-router-dom'
import DeleteDesignations from './DeleteDesignations';
import EditDesignations from './EditDesignations';
import AddDesignations from './AddDesignations';
import axios from 'axios'
class Designations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
      editDelOptionShow: 'hide',
      records: [],

      editDelHideShow: '',

    }
    // this.showEditDelOption =this.showEditDelOption.bind(this)
  }
  showEditDelOption = (e, data) => {
    // console.log(data)
    if (data == this.state.editDelHideShow) {
      if (this.state.editDelOptionShow == 'hide') {
        this.setState({
          editDelOptionShow: 'show',
          editDelHideShow: data
        })
      } else {
        this.setState({
          editDelOptionShow: 'hide',
          editDelHideShow: data
        })
      }
    } else {
      this.setState({
        editDelOptionShow: 'show',
        editDelHideShow: data
      })
    }
  }
  handleChanges = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  componentDidMount() {
    axios.get("http://localhost:8089/prodigyportal/designasion/all")
      .then(response => {
        //console.log(response.data)
        this.setState({ records: response.data })
      })
      .catch();

  }
  render() {
    const { records } = this.state
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false })
    let deleteModalClose = () => this.setState({ deleteModalShow: false })
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-sm-8">
              <h4 className="page-title">Designations</h4>
            </div>
            <div className="col-sm-4 text-right m-b-30">
              <ButtonToolbar>
                <BrowserRouter>

                  <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                  >Add New Designation</Button>

                  <AddDesignations
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                  />
                </BrowserRouter>
              </ButtonToolbar>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table m-b-0 datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Designation </th>
                      <th>Department </th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(record =>
                      <tr>
                        <td>{record.designasionId}</td>
                        <td>{record.designasion}</td>
                        <td>{record.designasionDescription}</td>
                        <td className="text-right" style={{"width":'135px'}}>
                          <div className="dropdown">
                            <span onClick={((e) => this.showEditDelOption(e, record.designasionId))}><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a></span>
                            {this.state.editDelOptionShow == 'show' ?
                              <ul className="list-group-item" name={record.designasionId} style={{ visibility: this.state.editDelHideShow == record.designasionId ? 'visible' : 'hidden' }}>

                                <ButtonToolbar>
                                  <BrowserRouter>

                                    <a
                                      variant='primary'
                                      onClick={() => this.setState({ editModalShow: true })}
                                    > <i className="fa fa-pencil m-r-5" />Edit</a>

                                    <EditDesignations
                                      show={this.state.editModalShow}
                                      onHide={editModalClose}
                                      defaultva={this.state.editDelHideShow}
                                      records={this.state.records}
                                    />
                                  </BrowserRouter>
                                </ButtonToolbar>
                                <ButtonToolbar>
                                  <BrowserRouter>

                                    <a
                                      variant='primary'
                                      onClick={() => this.setState({ deleteModalShow: true })}
                                    ><i className="fa fa-trash-o m-r-5" />Delete</a>

                                    <DeleteDesignations
                                      show={this.state.deleteModalShow}
                                      onHide={deleteModalClose}
                                      defaultva={this.state.editDelHideShow}
                                      records={this.state.records}
                                    />
                                  </BrowserRouter>
                                </ButtonToolbar>
                              </ul> : null}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
} export default Designations;