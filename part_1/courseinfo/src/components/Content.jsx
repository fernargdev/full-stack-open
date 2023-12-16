import Part from './Part'

const Content = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]

  return (
    <main>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </main>
  )
}

export default Content
