
const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartRequirement extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement ;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const Part = ({ part }: { part: CoursePart}) => {
    switch (part.kind){
      case "basic":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p><i>{part.description}</i></p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>project exercise {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p><i>{part.description}</i></p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p><i>{part.description}</i></p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </div>
        )
    }
  }

  const Header = ({ name }: { name: string }): JSX.Element => {
    return <h1>{name}</h1>;
  };

  interface Content {
    name: string;
    exerciseCount: number;
  }

/*   const Content = ({ content }: { content: Content[] }): JSX.Element => {
    return (
      <div>
       {content.map( content => <p key={content.name}>{content.name} {content.exerciseCount}</p>)}
      </div>
    )
  } */

  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <div>
       {parts.map( part => {return (
          <div key={part.name}>
            <Part part={part}/>
          </div>
        )}
      )}
      </div>
    )
  }

  const Total = ({ content }: { content: Content[]}): JSX.Element => {
    return (
      <h3>
        Number of exercises{" "}
        {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </h3>
    )
  }

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts} />
      <Total content={courseParts}/>
    </div>
  );
};

export default App;
