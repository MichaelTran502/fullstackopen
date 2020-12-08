import React from 'react';

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name}/>
			<Content parts={course.parts}/>
		</div>
	)
}

const Content = ({parts}) => {
	return (
		<div>
			{parts.map(part =>
					<Part key={part.id} part={part} />
			)}
			<Total parts={parts}/>
		</div>
	)
}

const Header = ({name}) => {
	return (
		<h1>{name}</h1>
	)
}
  
const Part = ({part}) => {
	return (
		<p>{part.name} {part.exercises}</p>
	)
}

const Total = ({parts}) => {

	const total = parts.reduce((sum, part) => {
		return sum + part.exercises;
	}, 0)

	return (
		<p><b>total of {total} exercises</b></p>
	)
}




export default Course