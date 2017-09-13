import React, {Component} from 'react'
import Star from "./Star"

const FiveStar = (props) => {
  console.log(props.rating)
  let rating = props.rating
  const starVals = []
  while (rating > 1) {
    starVals.push(1)
    rating--
  }
  starVals.push(rating)
  console.log(starVals)
 return (
     <div className="star-container">
      {starVals.map((value, idx) => (
        <Star fillPercent={value*100} id={idx} key={"star"+idx} />
      ))}
     </div>
 )
}

export default FiveStar
