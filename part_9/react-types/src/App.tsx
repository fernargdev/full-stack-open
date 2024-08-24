interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1>{props.name}</h1>
    </header>
  )
}

interface ContentProps {
  parts: {
    name: string
    exerciseCount: number
  }[]
}

const Content = (props: ContentProps) => {
  return (
    <main>
      {props.parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </main>
  )
}

interface TotalProps {
  total: number
}

const Total = (props: TotalProps) => {
  return (
    <section>
      <p>Number of exercises {props.total}</p>
    </section>
  )
}

const App = () => {
  const courseName = 'Half Stack application development'

  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  )

  // const-declarations

  // return (
  //   <div>
  //     <Header name={courseName} />
  //     <Content ... />
  //     <Total ... />
  //   </div>
  // )

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  )

  // return (
  //   <div>
  //     <h1>{courseName}</h1>
  //     <p>
  //       {courseParts[0].name} {courseParts[0].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[1].name} {courseParts[1].exerciseCount}
  //     </p>
  //     <p>
  //       {courseParts[2].name} {courseParts[2].exerciseCount}
  //     </p>
  //     <p>Number of exercises {totalExercises}</p>
  //   </div>
  // )
}

export default App
