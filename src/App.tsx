import React, { ReactElement, ReactNode } from 'react';
import './App.css';

// Conventional props

const HeadingFC: React.FC<{ title: string }> = ({title}) => <h1>{title}</h1>

function Heading({ title }: { title: string }) {
  return (
    <h1>{title}</h1>
  );
}

function HeadingWithContent({ children } : { children: React.ReactNode }): React.ReactElement {
  return <h1>{children}</h1>;
}

// Default props
const defaultContainerProps = {
  heading: <strong>My heading</strong>,
};

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps
function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

Container.defaultProps = defaultContainerProps;

// Functional props
function TextWithNumber({
  header,
  children
}: {
  header?: (num: number) => ReactNode
  children: (num: number) => ReactNode
}) {
  const [state, stateSet] = React.useState<number>(1)

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      {children(state)}
      <div>
        <button onClick={() => stateSet(state + 1)}>Add +1</button>
      </div>
    </div>
  )
}

// List
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[],
  render: (item: ListItem) => ReactNode
}) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}

// Class component
class MyHeader extends React.Component<{
  title: ReactNode,
}>{
  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

function App() {
  return (
    <div className='App'>
      <Heading title="Passing props using typescript" />
      <HeadingWithContent>
        <strong>HeadingWithContent - I am strong!</strong>
      </HeadingWithContent>
      <Container>Container children string</Container>
      <HeadingFC title='functional heading'/>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number is {num}</div>}
      </TextWithNumber>
      <List
        items={['one', 'two', 'three']}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      />
      <MyHeader title='Header with classes' />
    </div>
  );
}

export default App;
