import React, { Component } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { Button } from "reactstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Edit from "./Edit";

import "./single.css";

class Single extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
    };
  }

  onEdit = () => this.setState({ editMode: true });
  onClose = () => this.setState({ editMode: false });

  render() {
    const { id } = this.props.match.params;
    const { employees, updateEmployee } = this.props;
    const { editMode } = this.state;

    let employee = { logins: [] };
    for (let i = 0; i < employees.length; i++) {
      if (Number(id) === employees[i].id) {
        employee = employees[i];
        break;
      }
    }
    let months = {}; // { January: 14, February: 10 }
    employee.logins.forEach((login) => {
      const { date } = login;
      const month = moment(date).format("MMM"); // January
      if (months[month]) {
        months[month]++;
      } else {
        months[month] = 1;
      }
    });
    const data = Object.keys(months).map((month) => {
      return { month, login: months[month] };
    });

    return (
      <div className="single">
        {employee.first_name && (
          <Edit
            updateEmployee={updateEmployee}
            employee={employee}
            editMode={editMode}
            onClose={this.onClose}
          />
        )}
        <ul>
          <li>
            <div className="property">Action</div>
            <Button onClick={this.onEdit} color="primary">
              Edit
            </Button>
          </li>
          <li>
            <div className="property">Id</div>
            <div className="value">{employee.id}</div>
          </li>
          <li>
            <div className="property">Name</div>
            <div className="value">{employee.first_name}</div>
          </li>
          <li>
            <div className="property">Lastname</div>
            <div className="value">{employee.last_name}</div>
          </li>
          <li>
            <div className="property">City</div>
            <div className="value">{employee.city}</div>
          </li>
          <li>
            <div className="property">State</div>
            <div className="value">{employee.state}</div>
          </li>
          <li>
            <div className="property">Email</div>
            <div className="value">{employee.email}</div>
          </li>
        </ul>
        <div className="chart">
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="login" fill="#82ca9d" />
          </BarChart>
        </div>
        <div id="logins">
          <h4>
            Login Count for {employee.first_name}: {employee.logins.length}
          </h4>
          {employee.logins.map((login, i) => {
            return (
              <div key={i}>
                {moment(login.date).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Single);
