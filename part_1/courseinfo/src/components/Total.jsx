const Total = (props) => {
  return (
    <footer>
      <p>
        Number of exercises{' '}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </footer>
  )
}

export default Total
