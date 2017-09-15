import React from 'react'
import Star from "./Star"
import PropTypes from 'prop-types'

const FiveStar = (props) => {
  let rating = props.rating
  const starVals = [] // create an array of star-fill values e.g. 4.6 will become [1, 1, 1, 1, 0.6]
  while (rating > 1) {
    starVals.push(1)
    rating--
  }
  starVals.push(rating)
  return (
     <div className="star-container">
      {starVals.map((value, idx) => (
        <Star fillPercent={value*100} id={idx} key={"star"+idx} />
      ))}
     </div>
  )
}

FiveStar.propTypes = {
  rating: PropTypes.number.isRequired
}

export default FiveStar
