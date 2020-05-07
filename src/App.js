<<<<<<< HEAD
=======

>>>>>>> master
import React, { Component } from "react";
import List from "./components/list/List";
import Search from "./components/search/Search";
import "./app.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Single from "./components/single/Single";
<<<<<<< HEAD

class App extends Component {
  constructor() {
=======


class App extends Component {
  constructor() {
    console.log("constructor");
>>>>>>> master
    super();
    this.state = {
      employees: [],
      isLoading: false,
      searchBy: "",
      search: "",
      selected: {},
    };
  }

  getApiData = () => {
    this.setState({ isLoading: true });
    fetch("https://raw.githubusercontent.com/maratgaip/json/master/people.json")
      .then((json) => json.json())
      .then((employees) => this.setState({ employees, isLoading: false }));
  };

  componentDidMount() {
    this.getApiData();
  }

  getSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  selectOnChange = (e) => {
    this.setState({ searchBy: e.target.value });
  };
  setEmployee = (selected) => {
    this.setState({ selected });
  };

  filter = () => {
    const { employees, search, searchBy } = this.state;
<<<<<<< HEAD

=======
>>>>>>> master
    const filteredEmployees = employees.filter((employee) => {
      return searchBy.length
        ? employee[searchBy].toLowerCase().includes(search.toLowerCase())
        : true;
    });
    return filteredEmployees;
  };

  render() {
<<<<<<< HEAD
    console.log("employees", employees);
=======
>>>>>>> master
    const { isLoading, search, searchBy, selected, employees } = this.state;

    // Filtering / Searching by
    const filteredEmployees = this.filter();

    const loader = <div className="lds-dual-ring"></div>;
    let content = isLoading ? (
      loader
    ) : (
      <List setEmployee={this.setEmployee} employees={filteredEmployees} />
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
              {content}
            </Route>
            <Route path="/employee/:id">
              <Single employees={employees} data={selected} />
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
