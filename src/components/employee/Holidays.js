import React, { Component, Fragment } from "react";
import AddHolidays from "./AddHolidays";
import { Button, ButtonToolbar } from 'react-bootstrap'
import { AddEmployee } from './AddEmployee'
import { Link, BrowserRouter } from 'react-router-dom'
import DeleteHolidays from "./DeleteHolidays";
import EditHolidays from "./EditHolidays";
import axios from 'axios';
class Holidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
      editDelOptionShow: 'hide',
      records: [],
      designation: '',
      allHolidays: [],
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
    axios.get("http://localhost:8089/prodigyportal/holidays/all")
      .then(response => {
        //console.log(response.data)
        this.setState({ records: response.data })
      })
      .catch();

  }
  render() {
    var count = 0;
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    const { records } = this.state
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false })
    let deleteModalClose = () => this.setState({ deleteModalShow: false })
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-sm-8">
              <h4 className="page-title">Holidays 2017</h4>
            </div>
            <div className="col-sm-4 text-right m-b-30">
              <ButtonToolbar>
                <BrowserRouter>
                  <Button
                    variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}
                  >Add New Holiday</Button>
                  <AddHolidays
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
                <table className="table table-striped custom-table m-b-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title </th>
                      <th>Holiday Date</th>
                      <th>Day</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr className="holiday-completed">
                      <td>1</td>
                      <td>New Year</td>
                      <td>1 Jan 2017</td>
                      <td>Sunday</td>
                      <td />
                    </tr> */}
                    {
                      records.map(record =>
                        <tr className="holiday-upcoming">
                          <td>{record.holidays_id}</td>
                          <td>{record.holidays_name}</td>
                          <td>{record.holiday_date}</td>
                          <td>{weekdays[new Date(record.holiday_date).getDay()]}</td>
                          <td className="text-right" style={{"width":'135px'}}>
                            <div className="dropdown">
                              <span onClick={((e) => this.showEditDelOption(e, record.holidays_id))}><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a></span>
                              {this.state.editDelOptionShow == 'show' ?
                                <ul className="list-group-item" name={record.holidays_id} style={{ visibility: this.state.editDelHideShow == record.holidays_id ? 'visible' : 'hidden' }}>
                                  <ButtonToolbar>
                                    <BrowserRouter>
                                      <a
                                        variant='primary'
                                        onClick={() => this.setState({ editModalShow: true })}
                                      >Edit</a>
                                      <EditHolidays
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
                                      >Delete</a>
                                      <DeleteHolidays
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
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
} export default Holidays;