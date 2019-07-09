import React, { Component } from 'react';
import axios from 'axios';
import {Form, FormGroup, Label, Input, Button } from "reactstrap";

class SmurfFormEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      name: '',
      age: '',
      height: '',
      errorMessage: null
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    
    axios.get ('http://localhost:3333/smurfs')
      .then(response => {
          const res = response.data;
          const id = this.props.match.params.id
          let newData = res.filter(item => item.id === Number(id));
          const { name, age, height } = newData[0]
          this.setState({ name, age, height })
        })
      .catch(err => {
          this.setState({
            errorMessage: err.response.data.error
          })
        })
    }

    deleteSmurf = (e) => {
      e.preventDefault()
  
      const id = this.props.match.params.id
  
      axios.delete(`http://localhost:3333/smurfs/${id}`)
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

  updateSmurf = (e) => {
    const id = this.props.match.params.id
    const {name, age, height} = this.state;
    const payload = {name, age, height};
    e.preventDefault();
    axios.put(`http://localhost:3333/smurfs/${id}`, payload)
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
        {/* <FormGroup row>
          <Label for="name">Id</Label>
          <Input
            bsSize="lg"
            onChange={this.handleInputChange}
            placeholder="id"
            value={this.state.id}
            name="name"
          />
        </FormGroup>       */}
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
          <Button type="button" color="warning" onClick={this.updateSmurf}>Update</Button>
          <Button type="button" color="danger" onClick={this.deleteSmurf}>Delete</Button>
        </Form>
      </div>
    );
  }
}

export default SmurfFormEdit;
