function StackList(props) {
    return (
        <ul>
          {props.stack.map((n, index) => <li key={index}>{n}</li>)}
        </ul>
    )
}

export default StackList