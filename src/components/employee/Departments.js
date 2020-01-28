import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { AddEmployee } from './AddEmployee'
import { Link, BrowserRouter } from 'react-router-dom'
import DeleteDepartments from './DeleteDepartments';
import EditDepartments from './EditDepartments';
import AddDepartments from './AddDepartments';
import axios from 'axios'
class Departments extends Component {
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
    axios.get("http://localhost:8089/prodigyportal/department/all")
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
              <h4 className="page-title">Department</h4>
            </div>
            <div className="col-sm-4 text-right m-b-30">
              <ButtonToolbar>
                <BrowserRouter>

                  <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                  >Add New Department</Button>

                  <AddDepartments
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                  />
                </BrowserRouter>
              </ButtonToolbar>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>
                <table className="table table-striped custom-table m-b-0 datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Department Name</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(record =>
                      <tr>
                        <td>{record.department_Id}</td>
                        <td>{record.department}</td>
                        <td className="text-right" style={{"width":'135px'}}>
                          <div className="dropdown">
                            <span onClick={((e) => this.showEditDelOption(e, record.department_Id))}><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a></span>
                            {this.state.editDelOptionShow == 'show' ?
                              <ul className="list-group-item" name={record.department_Id} style={{ visibility: this.state.editDelHideShow == record.department_Id ? 'visible' : 'hidden' }}>

                                <ButtonToolbar>
                                  <BrowserRouter>

                                    <a
                                      variant='primary'
                                      onClick={() => this.setState({ editModalShow: true })}
                                    > <i className="fa fa-pencil m-r-5" />Edit</a>

                                    <EditDepartments
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

                                    <DeleteDepartments
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
} export default Departments;