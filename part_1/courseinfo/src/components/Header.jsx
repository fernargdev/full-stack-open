const Header = (props) => {
  const name = props.course.name
  return (
    <header>
      <h1>{name}</h1>
    </header>
  )
}

export default Header
