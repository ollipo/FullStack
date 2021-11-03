import React from "react";
import { Part } from '../App'

const Total = ({courseParts}: {courseParts: Part[]}) => {
    return (
      <>{<p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>}</>
    )
}

export default Total