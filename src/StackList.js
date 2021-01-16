import { useEffect, useRef } from 'react'

function StackList(props) {
  const reversed = [...props.stack].reverse()
  const container = useRef()

  useEffect(() => {
    const el = container.current
    el.scrollTop = el.scrollHeight
  })
  
  return (
    <div className="stackList" ref={container}>
      <div className="stackList_spacer"></div>
      {
        reversed.filter(n => n !== '')
        .map((n, index) => <div key={index}>{n}</div>)
      }
    </div>
  )
}

export default StackList