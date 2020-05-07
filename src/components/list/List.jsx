import React, { Component } from 'react';
import classNames from 'classnames';
import './list.scss'
import { Link }  from 'react-router-dom';

class List extends Component {
    constructor(props){
        super();
        this.state = {
            limit: 20,
            currentPage: 6
        }
    }

    setPage = (currentPage) => {
        this.setState({currentPage})
    }

    render(){

        const {employees} = this.props;
        const {currentPage, limit} = this.state;
        let end = currentPage * limit; 
        const start = end - limit;

        const pagedData = employees.slice(start,end)
        let pages = [];
        for(let i=0;i<(employees.length / limit);i++){
            pages.push(i)
        }

        if(end > employees.length){
            end = employees.length;
        }

        return (
                <div>
                    <div className="pagination">
                        <h3>
                            Showing {pagedData.length} data -  {start}-{end} out of {this.props.employees.length}
                        </h3>
                        <div onClick={()=>this.setPage(currentPage-1)} className="page" >Prev</div>
                        {
                            pages.map((item,ind)=>{
                                const cl = {page:true, active:ind+1 === currentPage}
                                return <div onClick={()=>this.setPage(ind+1)} className={classNames(cl)} >{ind+1}</div>
                            })
                        }
                        <div onClick={()=>this.setPage(currentPage+1)} className="page" >Next</div>
                        
                    </div>
                <div className="list">
                    <div className="row header">
                        <div className="cell sm">#</div>
                        <div className="cell">Fullname</div>
                        <div className="cell">Email</div>
                        <div className="cell">City</div>
                        <div className="cell">State</div>
                    </div>
                    <div className="content">
                        {
                            pagedData.map((employee,ind)=>{
                                const { id, first_name, last_name, email, city, state } = employee;
                                return (
                                <Link key={id} className="row" to={`/employee/${id}`}>
                                    <div className="cell sm">{ind+1}</div>
                                    <div className="cell">{first_name} {last_name}</div>
                                    <div title={email} className="cell">{email}</div>
                                    <div className="cell">{city}</div>
                                    <div className="cell">{state}</div>
                                </Link>
                                )
                            })
                        }
                    </div>
                </div>
                </div>
        )
    }
}

export default List