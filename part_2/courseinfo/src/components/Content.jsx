import Part from './Part'

const Content = ({ parts }) => {
  return (
    <main>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </main>
  )
}

export default Content
