import { useEffect, useState } from 'react'
import './App.css';
import StackList from './StackList';

function App() {
  const [stack, setStack] = useState([''])
  const [lastOp, setLastOp] = useState('')


  useEffect(() => {
    function handleKeyUp(e) {
      console.log(e)
      const { key } = e
      if(key === 'Enter') {
        handleEnterClick()
      } else if(key === 'Backspace') {
        handleBackspace()
      }else if(!Number.isNaN(Number(key))) {
        pushNumber(key)
      } else if(key === '-') {
        if(stack[0] === '') {
          pushNumber(key)
        } else {
          doEval(key)
        }
      } else if(key === '.') {
        pushNumber('.')
      } else if(['+', '*', '/'].includes(key)) {
        doEval(key)
      }
    }

    console.log('addEventListener')
    document.body.addEventListener('keyup', handleKeyUp)
    return () => {
      console.log('removeEventListener')
      document.body.removeEventListener('keyup', handleKeyUp)
    }
  })

  function canEval() {
    return stack.filter(n => n !== '').length >= 2
  }
  
  function handleEnterClick() {
    if(stack[0] !== '') {
      setStack(['', ...stack])
    }
  }

  function handleEvalButton(e) {
    doEval(e.target.innerText)
  }

  function handleNumberButton(e) {
    pushNumber(e.target.innerText)
  }

  function handleNegateButton() {
    setStack([
      '-' + stack[0],
      ...stack.slice(1),
    ])
  }

  function handleBackspace() {
    let first = stack[0]
    if(first.length > 1) {
      first = first.slice(0, first.length - 1)
    }
    setStack([
      first,
      ...stack.slice(1),
    ])
  }

  function handleSwap() {
    if(!canEval) return

    const newStack = [...stack]
    if(newStack[0] === '') {
      newStack.shift()
    }
    if(newStack.length > 1) {
      const a = newStack.shift()
      const b = newStack.shift()
      newStack.unshift(a)
      newStack.unshift(b)
      if(stack[0] === '') {
        newStack.unshift('')
      }
      setStack(newStack)
    }
  }

  function pushNumber(n) {
    setStack([
      stack[0] + n, // string concatenation
      ...stack.slice(1)
    ])
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
    <div className="App">
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
        <button disabled={!canEval()} onClick={handleSwap}>Swap</button>
      </div>
      <div>
        <button onClick={handleBackspace}>Backspace</button>
      </div>
      <div>
        <button onClick={handleEnterClick}>Enter</button>
      </div>
      <p>Last operation was: {lastOp}</p>
      <p>Stack = {JSON.stringify(stack)}</p>
      { canEval() || <p>(Operators disabled until there are at least two numbers on the stack)</p>}
    </div>
  );
}

export default App;
