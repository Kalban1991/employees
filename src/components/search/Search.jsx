import React, {Component} from 'react';
import {
    InputGroup,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
   } from 'reactstrap';

   const mappedData = {
    last_name: 'LastName',
    first_name: 'Name',
    city: 'City',
    state: 'State',
    email: 'Email',
  }

class Search extends Component {
    constructor(props){
        super()
        this.state= {
            showDropdown: false
        }
    }

    toggle = () => {
        this.setState({showDropdown: !this.state.showDropdown})
    }

    render(){
        const {value, searchBy, getSearch, selectOnChange} = this.props;
        const {showDropdown} = this.state;

        return (
            <div>
                <InputGroup>
            <Input value={value} onChange={getSearch} placeholder="Search..." />
            <InputGroupButtonDropdown addonType="append" isOpen={showDropdown} toggle={this.toggle}>
              <DropdownToggle caret>
                { searchBy.length ? mappedData[searchBy] : 'Select'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={()=>selectOnChange('first_name')}>Name</DropdownItem>
                <DropdownItem onClick={()=>selectOnChange('last_name')}>Lastname</DropdownItem>
                <DropdownItem onClick={()=>selectOnChange('email')}>Email</DropdownItem>
                <DropdownItem onClick={()=>selectOnChange('city')}>City</DropdownItem>
                <DropdownItem onClick={()=>selectOnChange('state')}>State</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </InputGroup>
            </div>
        )
    }
    
}

export default Search