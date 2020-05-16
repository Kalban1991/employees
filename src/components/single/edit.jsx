import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label, Input } from 'reactstrap';

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      employee:{}
    }
  }

   componentWillReceiveProps(props){
     if(props.employee){
      this.setState({employee: props.employee})
     }
   }

   onChangeName = e => {
     const {employee} = this.state;
     employee.first_name = e.target.value;
    this.setState({employee})
   }

    render(){
      const { first_name, last_name, city, state, email } = this.state.employee;
    return (
      <Modal isOpen={this.props.editMode} toggle={this.props.onCancel}>
        <ModalHeader toggle={this.props.onCancel}>Editing {first_name}</ModalHeader>
        <ModalBody>
        <Col>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
          <Input onChange={this.onChangeName} value={first_name} />
      </InputGroup>
        <InputGroup className="mt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Lastname</InputGroupText>
          </InputGroupAddon>
          <Input value={last_name} />
      </InputGroup>
      <InputGroup className="mt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Email</InputGroupText>
          </InputGroupAddon>
          <Input value={email} />
      </InputGroup>
      <InputGroup className="mt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>City</InputGroupText>
          </InputGroupAddon>
          <Input value={city} />
      </InputGroup>
      <InputGroup className="mt-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>State</InputGroupText>
          </InputGroupAddon>
          <Input value={state} />
      </InputGroup>
         
        </Col>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.onCancel}>Save</Button>{' '}
          <Button color="secondary" onClick={this.props.onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
    }
  }
  
  export default Edit;