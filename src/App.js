import { useState } from 'react'
import './App.css';
import StackList from './StackList';

function App() {
  const [stack, setStack] = useState([''])
  const [lastOp, setLastOp] = useState('')

  function canEval() {
    return stack.length >= 2
  }
  
  function handleEnterClick() {
    setStack(['', ...stack])
  }

  function handleEvalButton(e) {
    doEval(e.target.innerText)
  }

  function handleNumberButton(e) {
    pushNumber(e.target.innerText)
  }

  function handleNegateButton(e) {
    setStack([
      '-' + stack[0],
      ...stack.slice(1),
    ])
  }

  function pushNumber(n) {
    setStack([
      stack[0] + n, // string concatenation
      ...stack.slice(1)
    ])
  }

  function handleKeyUp(e) {
    const { key } = e
    console.log(`handling ${key}`)
    if(key === 'Enter') {
      handleEnterClick()
    }
    if(!Number.isNaN(Number(key))) {
      pushNumber(key)
    }
  }

  function doEval(op) {
    if(!canEval()) {
      return
    }
    const newStack = stack
    if(newStack[0] === '') {
      newStack.shift()
    }
    const b = Number(newStack.shift())
    const a = Number(newStack.shift())
    switch(op) {
      case '+':
        newStack.push(a + b)
        setLastOp(`${a} + ${b} = ${newStack[0]}`)
        break;
      case '-':
        newStack.push(a - b)
        setLastOp(`${a} - ${b} = ${newStack[0]}`)
        break;
      case '*':
        newStack.push(a * b)
        setLastOp(`${a} * ${b} = ${newStack[0]}`)
        break;
      case '/':
        newStack.push(a / b)
        setLastOp(`${a} / ${b} = ${newStack[0]}`)
        break;
      default:
        throw new Error('Unknown op')
    }
    setStack(['', ...newStack])
  }

  return (
    <div className="App" onKeyUp={handleKeyUp}>
      <StackList stack={stack}></StackList>
      <div>
        <button className="square" onClick={handleNumberButton}>7</button>
        <button className="square" onClick={handleNumberButton}>8</button>
        <button className="square" onClick={handleNumberButton}>9</button>
      </div>
      <div>
        <button className="square" onClick={handleNumberButton}>4</button>
        <button className="square" onClick={handleNumberButton}>5</button>
        <button className="square" onClick={handleNumberButton}>6</button>
      </div>
      <div>
        <button className="square" onClick={handleNumberButton}>1</button>
        <button className="square" onClick={handleNumberButton}>2</button>
        <button className="square" onClick={handleNumberButton}>3</button>
      </div>
      <div>
        <button className="square" onClick={handleNumberButton}>0</button>
        <button className="square" onClick={handleNumberButton}>.</button>
        <button className="square" onClick={handleNegateButton}>(-)</button>
      </div>
      <div>
        <button className="square" disabled={!canEval()} onClick={handleEvalButton}>+</button>
        <button className="square" disabled={!canEval()} onClick={handleEvalButton}>-</button>
        <button className="square" disabled={!canEval()} onClick={handleEvalButton}>*</button>
        <button className="square" disabled={!canEval()} onClick={handleEvalButton}>/</button>
      </div>
      <div>
        <button onClick={handleEnterClick}>Enter</button>
      </div>
      { canEval() || <p>(Operators disabled until there are at least two numbers on the stack)</p>}
      <p>{lastOp}</p>
      <p>{JSON.stringify(stack)}</p>
    </div>
  );
}

export default App;
