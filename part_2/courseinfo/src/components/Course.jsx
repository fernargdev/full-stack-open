import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
  return (
    <section>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </section>
  )
}

export default Course
