const Button = ({ setValue, value, text }) => {
  const setToValue = (setValue, value) => () => {
    setValue(value + 1)
  }

  return <button onClick={setToValue(setValue, value)}>{text}</button>
}

export default Button
