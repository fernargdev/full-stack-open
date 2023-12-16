import Part from './Part'

const Content = (props) => {
  const part1 = props.course.parts[0]
  const part2 = props.course.parts[1]
  const part3 = props.course.parts[2]
  return (
    <main>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </main>
  )
}

export default Content
