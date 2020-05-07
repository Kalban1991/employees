import React from 'react';
import { search, select } from './search.module.scss';

const Search = (props) => {
    const {value, searchBy, getSearch, selectOnChange} = props;
    return (
        <div>
            <input value={value} onChange={getSearch} className={search} placeholder="Search..." />
            <select value={searchBy} onChange={selectOnChange} className={select}>
                { !searchBy.length && <option value="">Select</option>}
                <option value="first_name">Name</option>
                <option value="last_name">Lastname</option>
                <option value="email">Email</option>
                <option value="city">City</option>
                <option value="state">State</option>
            </select>
        </div>
    )
}

export default Search