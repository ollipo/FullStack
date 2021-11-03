import React from "react";
import { CoursePart } from '../App'

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({course}: {course: CoursePart}) => {
    const courseObj = Object.values(course)
    switch (course.type) {
        case "normal":
            return (
                <p>
                    <strong>{courseObj[0]} {courseObj[1]}</strong> <br/>
                    <i>{courseObj[2]}</i>
                </p>);
        case "groupProject":
            return (
                <p>
                    <strong>{courseObj[0]} {courseObj[1]}</strong> <br/>
                    project exercises {courseObj[2]}
                </p>);
        case "submission":
            return (
                <p>
                    <strong>{courseObj[0]} {courseObj[1]}</strong> <br/>
                    <i>{courseObj[2]}</i> <br/>
                    submit to {courseObj[3]}
                </p>);
        case "special":
            return (
                <p>
                    <strong>{courseObj[0]} {courseObj[1]}</strong> <br/>
                    <i>{courseObj[2]}</i> <br/>
                    required skills: {courseObj[3].join(', ')}
                </p>);
        default:
            return assertNever(course);
    }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
        <div>
            {courseParts.map(course => 
                <Part 
                    key={course.name} 
                    course={course} 
                />
            )}
        </div>
    )
}

export default Content