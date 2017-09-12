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
     <div>
      {starVals.map((value) => (
        <div>
        <div>{value}</div>
        <Star fillPercent={value*100} /></div>
      ))}
     </div>
 )
}

export default FiveStar
