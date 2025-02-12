import React, { Component } from 'react';
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button } from "reactstrap";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      errorMessage: null
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const {name, age, height} = this.state
    const payload = {name, age, height}
    axios.post('http://localhost:3333/smurfs', payload)
			.then((response) => {
				this.setState({
					errorMessage: null
				})

        this.props.updateSumrfs(response.data)
        this.props.history.push('/')
				
			})
			.catch((err) => {
				this.setState({
					errorMessage: err.response.data.error
				})
			})

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateSmurf = (e) => {
    const id = this.props.match.params.id
    const {name, age, height} = this.state;
    const payload = {name, age, height};
    e.preventDefault();
    axios.put(`http://localhost:3333/smurfss/${id}`, payload)
			.then((response) => {
				this.setState({
					errorMessage: null
				})

				this.props.updateSumrfs(response.data)
				this.props.history.push('/')
			})
			.catch((err) => {
				this.setState({
					errorMessage: err.response.data.error
				})
			})

}



  render() {
    return (
      <div className="SmurfForm">
        <Form onSubmit={this.addSmurf}>       
        <FormGroup row>
          <Label for="name">Name</Label>
          <Input
            bsSize="lg"
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
        </FormGroup>
        <FormGroup row>
          <Label for="age">Age</Label>
          <Input
            bsSize="lg"
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
        </FormGroup>
        <FormGroup row>
          <Label for="height">Height</Label>
          <Input
            bsSize="lg"
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
        </FormGroup>
          <Button type="submit" color="success">Add to the village</Button>
        </Form>
      </div>
    );
  }
}

export default SmurfForm;
