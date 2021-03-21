import React, { Component } from "react";
import List from "./components/list/List";
import Search from "./components/search/Search";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import Single from "./components/single/Single";
import Add from "./components/single/Add";
import "./app.scss";

const apiurl = "http://localhost:5000/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      isLoading: false,
      addMode: false,
      searchBy: "",
      search: "",
      selected: {},
    };
  }

  delete = (id) => {
    const employees = this.state.employees.filter((emp) => {
      if (emp.id === id) {
        return false;
      }
      return true;
    });
    this.setState({ employees });
  };

  getApiData = () => {
    this.setState({ isLoading: true });
    fetch(`${apiurl}api/employees`)
      .then((json) => json.json())
      .then((employees) => this.setState({ employees, isLoading: false }));
  };

  componentDidMount() {
    this.getApiData();
  }

  getSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  selectOnChange = (searchBy) => {
    this.setState({ searchBy });
  };
  setEmployee = (selected) => {
    this.setState({ selected });
  };
  updateEmployee = (employee) => {
    const employees = this.state.employees.map((emp) => {
      if (emp.id === employee.id) {
        return employee;
      }
      return emp;
    });
    this.setState({ employees });
  };

  addNew = () => this.setState({ addMode: true });

  addModeClose = () => this.setState({ addMode: false });

  addEmployee = (employee) => {
    const { employees } = this.state;
    employee.id = uuidv4();
    employees.unshift(employee);
    this.setState({ employees });
  };

  filter = () => {
    const { employees, search, searchBy } = this.state;
    const filteredEmployees = employees.filter((employee) => {
      return searchBy.length
        ? employee[searchBy].toLowerCase().includes(search.toLowerCase())
        : true;
    });
    return filteredEmployees;
  };

  render() {
    const { isLoading, search, searchBy, selected, employees } = this.state;

    // Filtering / Searching by
    const filteredEmployees = this.filter();

    const loader = <div className="lds-dual-ring"></div>;
    let content = isLoading ? (
      loader
    ) : (
      <List
        delete={this.delete}
        setEmployee={this.setEmployee}
        employees={filteredEmployees}
      />
    );
    if (!isLoading && !filteredEmployees.length) {
      content = <div className="not-found">Data Not Found</div>;
    }
    return (
      <Router>
        <Switch>
          <div className="container">
            <Route path="/" exact>
              <Search
                searchBy={searchBy}
                selectOnChange={this.selectOnChange}
                value={search}
                getSearch={this.getSearch}
              />
              <Button
                onClick={this.addNew}
                color="primary"
                className="float-right"
              >
                Add Employee
              </Button>
              <Add
                addEmployee={this.addEmployee}
                onClose={this.addModeClose}
                addMode={this.state.addMode}
              />
              {content}
            </Route>
            <Route path="/page/:page" exact>
              <Search
                searchBy={searchBy}
                selectOnChange={this.selectOnChange}
                value={search}
                getSearch={this.getSearch}
              />
              {content}
            </Route>
            <Route path="/employee/:id">
              <Single
                updateEmployee={this.updateEmployee}
                employees={employees}
                data={selected}
              />
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
