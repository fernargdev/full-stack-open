interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescription {
  // description: string
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartDescription {
  // description: string
  backgroundMaterial: string
  kind: 'background'
}

interface CousePartRequirement extends CoursePartDescription {
  requirements: string[]
  kind: 'special'
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CousePartRequirement

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
  const part = props.part

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (part.kind) {
    case 'basic':
      return (
        // <p>
        //   {part.name} {part.exerciseCount} {part.description}
        // </p>

        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>

          <p
            style={{
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {part.description}
          </p>
        </>
      )

    case 'group':
      return (
        // <p>
        //   {part.name} {part.exerciseCount} {part.groupProjectCount}
        // </p>

        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>

          <p
            style={{
              margin: 0,
            }}
          >
            project exercises {part.groupProjectCount}
          </p>
        </div>
      )

    case 'background':
      return (
        // <p>
        //   {part.name} {part.exerciseCount} {part.description}{' '}
        //   {part.backgroundMaterial}
        // </p>

        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>

          <p
            style={{
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {part.description}
          </p>

          <p
            style={{
              margin: 0,
            }}
          >
            {`submit to ${part.backgroundMaterial}`}
          </p>
        </>
      )

    case 'special':
      return (
        // <p>
        //   {part.name} {part.exerciseCount} {part.description}{' '}
        //   {part.requirements.join(', ')}
        // </p>

        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>

          <p
            style={{
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {part.description}
          </p>
          <p
            style={{
              margin: 0,
            }}
          >
            {`required skills: ${part.requirements.join(', ')}`}
          </p>
        </>
      )

    default:
      return assertNever(part)
  }
}

interface ContentProps {
  parts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <main
      style={{
        margin: '2.5rem 0',
      }}
    >
      {props.parts.map((part) => {
        return (
          <div
            key={part.name}
            style={{
              margin: '1.5rem 0',
            }}
          >
            <Part part={part} />
          </div>
        )
      })}
    </main>
  )
}

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

interface TotalProps {
  total: number
}

const Total = (props: TotalProps) => {
  return (
    <footer
      style={{
        fontSize: '1.5rem',
      }}
    >
      <p>
        Number of exercises:
        <span>{` ${props.total}`}</span>
      </p>
    </footer>
  )
}

const App = () => {
  const courseName = 'Half Stack application development'

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ]

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  )

  return (
    <>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </>
  )
}

export default App
