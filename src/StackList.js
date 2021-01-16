function StackList(props) {
  const reversed = [...props.stack].reverse()
  return (
    <div>
      {reversed.filter(n => n !== '').map((n, index) => <p key={index}>{n}</p>)}
    </div>
  )
}

export default StackList