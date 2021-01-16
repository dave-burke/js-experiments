import { useState } from 'react'
import './App.css';
import StackList from './StackList';

function App() {
  const [input, setInput] = useState('')
  const [stack, setStack] = useState([])

  function canEval() {
    return stack.length >= 2
  }
  
  function handleKeyUp(e) {
    const { key } = e
    switch(key) {
      case 'Enter':
        handlePushClick()
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        doEval(key)
        break;
      default:
        // noop
        break;
    }
  }

  function handleInputchange(e) {
    let value = e.target.value
    if(!/^-?[0123456789.]*$/.test(value)) {
      e.preventDefault();
    } else {
      setInput(value)
    }
  }

  function handlePushClick() {
    if(input !== '') {
      setInput('')
      setStack([Number(input), ...stack])
    }
  }

  function handleEvalButton(e) {
    doEval(e.target.innerText)
  }

  function doEval(op) {
    if(!canEval()) {
      return
    }
    const [a, b] = stack
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
    setStack([result, ...stack.slice(2)])
  }

  return (
    <div className="App">
      <p>
        Number:
        <input
          type="text"
          onKeyUp={handleKeyUp}
          onChange={handleInputchange}
          value={input}
        ></input>
        <button onClick={handlePushClick}>Push</button>
      </p>
      <p>
        <button disabled={!canEval()} onClick={handleEvalButton}>+</button>
        <button disabled={!canEval()} onClick={handleEvalButton}>-</button>
        <button disabled={!canEval()} onClick={handleEvalButton}>*</button>
        <button disabled={!canEval()} onClick={handleEvalButton}>/</button>
      </p>
      { canEval() || <p>(Operators disabled until there are at least two numbers on the stack)</p>}
      <StackList stack={stack}></StackList>
    </div>
  );
}

export default App;
