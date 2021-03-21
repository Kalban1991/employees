import React, { Component } from "react";
import classNames from "classnames";
import "./list.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class List extends Component {
  constructor(props) {
    super();
    const page = Number(props.match.params.page);
    const currentPage = !isNaN(page) ? page : 1;
    this.state = {
      limit: 20,
      currentPage,
    };
  }

  setPage = (currentPage) => {
    this.setState({ currentPage });
  };
  delete = (id, e) => {
    e.preventDefault(); // Prevents event to redirect using links(a)
    this.props.delete(id);
  };

  render() {
    const { employees } = this.props;
    const { currentPage, limit } = this.state;
    let end = currentPage * limit;
    const start = end - limit;

    const pagedData = employees.slice(start, end);
    let pages = [];
    for (let i = 0; i < employees.length / limit; i++) {
      pages.push(i);
    }

    if (end > employees.length) {
      end = employees.length;
    }

    return (
      <div>
        <div className="pagination">
          <h3>
            Showing {pagedData.length} data - {start}-{end} out of{" "}
            {this.props.employees.length}
          </h3>
          <div onClick={() => this.setPage(currentPage - 1)} className="page">
            Prev
          </div>
          {pages.map((item, ind) => {
            const cl = { page: true, active: ind + 1 === currentPage };
            return (
              <Link
                onClick={() => this.setPage(ind + 1)}
                to={`/page/${ind + 1}`}
                className={classNames(cl)}
              >
                {ind + 1}
              </Link>
            );
          })}
          <div onClick={() => this.setPage(currentPage + 1)} className="page">
            Next
          </div>
        </div>
        <div className="list">
          <div className="row header">
            <div className="cell sm">#</div>
            <div className="cell">Fullname</div>
            <div className="cell">Email</div>
            <div className="cell">City</div>
            <div className="cell">State</div>
            <div className="cell">Action</div>
          </div>
          <div className="content">
            {pagedData.map((employee, ind) => {
              const {
                _id,
                first_name,
                last_name,
                email,
                city,
                state,
              } = employee;
              return (
                <Link key={_id} className="row" to={`/employee/${_id}`}>
                  <div className="cell sm">{_id}</div>
                  <div className="cell">
                    {first_name} {last_name}
                  </div>
                  <div
                    onClick={(e) => e.preventDefault()}
                    title={email}
                    className="cell"
                  >
                    {email}
                  </div>
                  <div className="cell">{city}</div>
                  <div className="cell">{state}</div>
                  <div
                    className="cell delete"
                    onClick={(e) => this.delete(_id, e)}
                  >
                    Delete
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(List);
