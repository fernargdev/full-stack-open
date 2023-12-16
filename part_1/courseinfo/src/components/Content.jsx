import Part from './Part'

const Content = (props) => {
  return (
    <main>
      <Part part={props.part1} exercise={props.exercise1} />
      <Part part={props.part2} exercise={props.exercise2} />
      <Part part={props.part3} exercise={props.exercise3} />
    </main>
  )
}

export default Content
