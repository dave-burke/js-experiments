import { Component } from 'react';
import './App.css';
import StackList from './StackList';

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      stack: [],
    }
    this.handleInputchange = this.handleInputchange.bind(this)
    this.handlePushClick = this.handlePushClick.bind(this)
    this.handleEvalButton = this.handleEvalButton.bind(this)
    this.canEval = this.canEval.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  canEval() {
    return this.state.stack.length >= 2
  }
  
  handleKeyUp(e) {
    const { key } = e
    switch(key) {
      case 'Enter':
        this.handlePushClick()
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.doEval(key)
        break;
      default:
        // noop
        break;
    }
  }

  handleInputchange(e) {
    let value = e.target.value
    if(!/^-?[0123456789.]*$/.test(value)) {
      e.preventDefault();
    } else {
      this.setState(state => ({
        input: value,
      }))
    }
  }

  handlePushClick() {
    if(this.state.input !== '') {
      this.setState(state => ({
        input: '',
        stack: [Number(state.input), ...state.stack]
      }));
    }
    this.inputEl.focus()
  }

  handleEvalButton(e) {
    this.doEval(e.target.innerText)
  }

  doEval(op) {
    if(!this.canEval()) {
      return
    }
    const [a, b] = this.state.stack
    let result
    switch(op) {
      case '+':
        result = a + b
        break;
      case '-':
        result = a - b
        break;
      case '*':
        result = a * b
        break;
      case '/':
        result = a / b
        break;
      default:
        throw new Error('Unknown op')
    }
    this.setState(state => ({
      stack: [result, ...this.state.stack.slice(2)]
    }))
    this.inputEl.focus()
  }

  render() {
    return (
      <div className="App">
        <p>
          Number:
          <input
            type="text"
            ref={inputEl => (this.inputEl = inputEl)}
            onKeyUp={this.handleKeyUp}
            onChange={this.handleInputchange}
            value={this.state.input}
          ></input>
          <button onClick={this.handlePushClick}>Push</button>
        </p>
        <p>
          <button disabled={!this.canEval()} onClick={this.handleEvalButton}>+</button>
          <button disabled={!this.canEval()} onClick={this.handleEvalButton}>-</button>
          <button disabled={!this.canEval()} onClick={this.handleEvalButton}>*</button>
          <button disabled={!this.canEval()} onClick={this.handleEvalButton}>/</button>
        </p>
        { this.canEval() || <p>(Operators disabled until there are at least two numbers on the stack)</p>}
        <StackList stack={this.state.stack}></StackList>
      </div>
    );
  }
}

export default App;
