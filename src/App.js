
import React, { Component } from "react";
import List from "./components/list/List";
import Search from "./components/search/Search";
import "./app.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Single from "./components/single/Single";


class App extends Component {
  constructor() {
    console.log("constructor");
    super();
    this.state = {
      employees: [],
      isLoading: false,
      searchBy: "",
      search: "",
      selected: {},
    };
  }

<<<<<<< HEAD
  getApiData = () => {
    this.setState({ isLoading: true });
    fetch("https://raw.githubusercontent.com/maratgaip/json/master/people.json")
      .then((json) => json.json())
      .then((employees) => this.setState({ employees, isLoading: false }));
  };
=======
    delete =(id) => {
        const employees = this.state.employees.filter(emp=>{
            if(emp.id === id){
                return false
            }
            return true
        })
        this.setState({employees})
    }

    getApiData = () => {
        this.setState({isLoading:true})
        fetch('https://raw.githubusercontent.com/maratgaip/json/master/people.json')
        .then(json=>json.json())
        .then(employees=>this.setState({employees, isLoading:false}))
    }
>>>>>>> 3e0f4d8b6ac6b6e97432c6915ffdf2cae81c855b

  componentDidMount() {
    this.getApiData();
  }

  getSearch = (e) => {
    this.setState({ search: e.target.value });
  };

<<<<<<< HEAD
  selectOnChange = (e) => {
    this.setState({ searchBy: e.target.value });
  };
  setEmployee = (selected) => {
    this.setState({ selected });
  };
=======
    selectOnChange = (searchBy) => {
        this.setState({searchBy});
    }
    setEmployee = (selected) => {
        this.setState({selected});
    }
>>>>>>> 3e0f4d8b6ac6b6e97432c6915ffdf2cae81c855b

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

<<<<<<< HEAD
    // Filtering / Searching by
    const filteredEmployees = this.filter();
=======
        const loader = <div className="lds-dual-ring"></div>;
        let content = isLoading ? loader : <List delete={this.delete} setEmployee={this.setEmployee} employees={filteredEmployees} />
        if(!isLoading && !filteredEmployees.length){
            content = <div className="not-found">Data Not Found</div>
        }
        return (
            <Router>
            <Switch>
                <div className="container">
                    <Route path="/" exact>
                        <Search searchBy={searchBy} selectOnChange={this.selectOnChange} value={search} getSearch={this.getSearch} />
                        {content}
                    </Route>
                    <Route path="/page/:page" exact>
                        <Search searchBy={searchBy} selectOnChange={this.selectOnChange} value={search} getSearch={this.getSearch} />
                        {content}
                    </Route>
                    <Route path="/employee/:id">
                        <Single employees={employees} data={selected} />
                    </Route>
                </div>
            </Switch>
            </Router>
        )
>>>>>>> 3e0f4d8b6ac6b6e97432c6915ffdf2cae81c855b

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
