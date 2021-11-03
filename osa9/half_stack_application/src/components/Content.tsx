import React from "react";
import { Part } from '../App'

const Content = ({courseParts}: {courseParts: Part[]}) => {
    return (
      <>{courseParts.map(course =>
        <p key={course.name}>{course.name} {course.exerciseCount}</p>
      )}</>
    )
}

export default Content