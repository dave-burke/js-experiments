import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      stack: [],
    }
    this.handleInputchange = this.handleInputchange.bind(this)
    this.handlePushClick = this.handlePushClick.bind(this)
  }

  handleInputchange(e) {
    let value = Number(e.target.value)
    if(isNaN(value)) {
      value = ''
    }
    this.setState(state => ({
      input: value,
    }))
  }

  handlePushClick(e) {
    this.setState(state => ({
      stack: [...state.stack, this.state.input]
    }));
  }

  render() {
    return (
      <div className="App">
        Number:
        <input type="text" onChange={this.handleInputchange} value={this.state.input}></input>
        <button onClick={this.handlePushClick}>Push</button>
        <ol>
          {this.state.stack.map((n, index) => <li key={index}>{n}</li>)}
        </ol>
      </div>
    );
  }
}

export default App;
