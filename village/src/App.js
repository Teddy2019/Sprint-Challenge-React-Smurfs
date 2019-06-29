import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, NavLink } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount(){
    axios.get ('http://localhost:3333/smurfs')
    .then(response =>  {this.setState({smurfs: response.data})})
    .catch(err => {console.log('Error:', err)})
  }

  updateSumrfs = (smurfs)=> {this.setState({smurfs: smurfs});}
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav className='Nav'>
          <NavLink to='/'>Smurfs List</NavLink>
          <NavLink className='Add' to ='/smurf-form' >Add New Sumurfs</NavLink>
        </nav>

        <Route path='/' exact render={() => <Smurfs smurfs={this.state.smurfs} />} />
        <Route path='/smurf-form' exact render={() => <SmurfForm updateSumrfs={this.updateSumrfs} />}/>
      </div>
    );
  }
}

export default App;
