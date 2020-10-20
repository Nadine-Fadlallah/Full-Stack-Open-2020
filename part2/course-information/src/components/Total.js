import React from "react";

const Total = ({ course }) => {
  const exercises = course.parts.map((part)=>part.exercises)

  return (
    <b>
      total of {exercises.reduce((a,b)=>a+b,0)} exercises
    </b>
  );
};

export default Total;
