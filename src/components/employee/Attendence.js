import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
class Attendence extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: '',
      month: '',
      dayOfMonth: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      years: [],
      attendenceRecord: [],
      employeeRecord: [],
      selectedMonth: '',
      selectedYear: '',
      holidayRecord: []
    }
  }

  handleChanges = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  componentDidMount() {
    //******** Year Calculation ************** */
    var year = 2000;
    var fullyear = new Date().getFullYear();
    var calcYear = fullyear - year;
    for (var i = 0; i <= calcYear; i++) {
      this.state.years[i] = year + i;
    }
    this.state.selectedYear = this.state.years[calcYear];
    this.state.selectedMonth = new Date().getMonth();
    //** ************************************ */


    var today = new Date();
    this.setState({ dayOfMonth: this.getDaysInMonth(today.getMonth(), today.getFullYear()) })



    axios.get("http://localhost:8089/prodigyportal/attendence/all")
      .then(response => {
        console.log(response.data)
        this.setState({
          attendenceRecord: response.data
        })
      })
      .catch();

    axios.get("http://localhost:8089/prodigyportal/employee/getAll")
      .then(response => {

        this.setState({

          employeeRecord: response.data
        })
      })
      .catch();
    axios.get("http://localhost:8089/prodigyportal/holidays/all")
      .then(response => {

        this.setState({
          holidayRecord: response.data
        })
      })
      .catch();

  }
  getDaysInMonth = function (month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
  };



  render() {
    var { attendenceRecord, holidayRecord, selectedYear, selectedMonth } = this.state

    var daysArray = []
    for (var i = 1; i <= this.state.dayOfMonth; i++) {
      daysArray[i - 1] = i
    }
    function getDayOfWeek(date) {
      var dayOfWeek = new Date(date).getDay();
      return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }
    function getDateInfo(date, empId) {

      var check = 'false';

      for (var i = 0; i < attendenceRecord.length; i++) {
        if (attendenceRecord[i].employeeId == empId) {
          if (attendenceRecord[i].attendence.length > 0) {
            for (var j = 0; j < attendenceRecord[i].attendence.length; j++) {
              if (new Date(attendenceRecord[i].attendence[j].login_time).getDate() == date) {
                check = 'true';
                break;
              } else if (getDayOfWeek(selectedYear + "-" + selectedMonth + 1 + "-" + date) == 'Saturday' || getDayOfWeek(selectedYear + "-" + selectedMonth + 1 + "-" + date) == 'Sunday') {
                check = 'WO';
                break;
              }
              else {
                check = 'false'
              }
            }
          } else {
            if (getDayOfWeek(selectedYear + "-" + selectedMonth + 1 + "-" + date) == 'Saturday' || getDayOfWeek(selectedYear + "-" + selectedMonth + 1 + "-" + date) == 'Sunday') {

              check = 'WO';
              break;
            }
            else {
              check = 'false'
            }
          }
        }
      }
      return check;
    }
    function refreshTable() {
      var tbl = <table className="table table-striped custom-table m-b-0">
        <thead>
          <tr>
            <th>Employee</th>
            {
              daysArray.map(days =>
                <th>{days}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            attendenceRecord.map(aRecords =>
              <tr>
                <td>{aRecords.firstName} {aRecords.lastName}</td>
                {
                  daysArray.map(days =>
                    getDateInfo(days, aRecords.employeeId) == 'true' ?
                      (
                        <td><i className="fa fa-check text-success" /> </td>
                      ) :
                      (
                        getDateInfo(days, aRecords.employeeId) == 'false' ?
                          (<td><i className="fa fa-close text-danger" /> </td>)
                          : (getDateInfo(days, aRecords.employeeId) == 'WO' ?
                            (<td>WO</td>) : null
                          )
                      )
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
      return tbl;
    }

    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-sm-8">
              <h4 className="page-title">Attendance Sheet</h4>
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-sm-3 col-xs-6">
              <div className="form-group form-focus">
                <label className="control-label">Employee Name</label>
                <input type="text" className="form-control floating" />
              </div>
            </div>
            <div className="col-sm-3 col-xs-6">
              <div className="form-group form-focus select-focus">
                <label className="control-label">Select Month</label>
                <Form.Control as="select" className="select floating" name="selectedMonth" value={this.state.selectedMonth} onChange={this.handleChanges}>
                  {
                    this.state.months.map(month =>
                      <option key={this.state.months.indexOf(month)} value={this.state.months.indexOf(month)}>{month}</option>
                    )
                  }
                </Form.Control>
              </div>
            </div>
            <div className="col-sm-3 col-xs-6">
              <div className="form-group form-focus select-focus">
                <label className="control-label">Select Year</label>
                <Form.Control as="select" className="select floating" name="selectedYear" value={this.state.selectedYear} onChange={this.handleChanges}>
                  {
                    this.state.years.map(year =>
                      <option key={this.state.years.indexOf(year)} value={year}>{year}</option>
                    )
                  }
                </Form.Control>
              </div>
            </div>
            <div className="col-sm-3 col-xs-6">
              <a href="#" className="btn btn-success btn-block"> Search </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">

                {
                  refreshTable()
                /* <table className="table table-striped custom-table m-b-0">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      {
                        daysArray.map(days =>
                          <th>{days}</th>
                        )
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      attendenceRecord.map(aRecords =>
                        <tr>
                          <td>{aRecords.firstName} {aRecords.lastName}</td>
                          {
                            daysArray.map(days =>
                              getDateInfo(days, aRecords.employeeId) == 'true' ?
                                (
                                  <td><i className="fa fa-check text-success" /> </td>
                                )
                                :
                                (
                                  getDateInfo(days, aRecords.employeeId) == 'false' ?
                                    (<td><i className="fa fa-close text-danger" /> </td>)
                                    : (getDateInfo(days, aRecords.employeeId) == 'WO' ?
                                      (<td>WO</td>) : null
                                    )
                                )
                            )
                          }
                        </tr>
                      )

                    }
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
} export default Attendence;