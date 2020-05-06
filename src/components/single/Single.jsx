import React, { Component } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./single.css";

class Single extends Component {
  render() {
    const { id } = this.props.match.params;
    const { employees } = this.props;

    let employee = {};
    for (let i = 0; i < employees.length; i++) {
      if (id == employees[i].id) {
        employee = employees[i];
        break;
      }
    }
    //aza start
    let months = {};
    let days = {};
    employee.logins.forEach((login) => {
      const { date } = login;
      const month = moment(date).format("MMM"); //Jan
      const day = moment(date).format("dddd"); //Tuesday
      console.log("day", day);
      if (months[month]) {
        months[month]++;
      } else {
        months[month] = 1;
      }
      if (days[day]) {
        days[day]++;
      } else {
        days[day] = 1;
      }
    });
    //months
    const arr = Object.keys(months).map((month) => {
      const count = months[month];
      return { month, count };
    });
    //days
    const dataa = Object.keys(days).map((day) => {
      const count = days[day];
      return { name: day, value: count };
    });

    //aza end

    return (
      <div className="single">
        <ul>
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
            width={400}
            height={450}
            data={arr}
            margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="chart">
          <PieChart width={800} height={400}>
            <Pie
              isAnimationActive={false}
              data={dataa}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    );
  }
}

export default withRouter(Single);
