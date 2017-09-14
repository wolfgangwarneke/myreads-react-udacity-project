import React from 'react'
import PropTypes from 'prop-types'

const Star = (props) => {
  const fillPercent = props.fillPercent || 100
 return (
   <svg className="star-svg" width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
     <defs>
        {fillPercent < 100 ? (
          <linearGradient id="Gradient2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="yellow" />
            <stop offset={fillPercent + "%"} stopColor="yellow" />
            <stop offset={(fillPercent + 5) + "%"} stopColor="#eee" stopOpacity="20" />
            <stop offset="110%" stopColor="#eee" stopOpacity="20" />
          </linearGradient>
        ) : ""}
      </defs>
    <g>
     <title>Background</title>
     <rect fill="rgba(0,0,0,0)" id={"background"+props.id} height="402" width="402" y="-1" x="-1" />
     <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
      <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
     </g>
    </g>
    <g>
     <title>Star</title>
     <path stroke="#666666" id={"star"+props.id} d="m6.5,153.731085l147.821894,0l45.678103,-149.731085l45.678129,149.731085l147.821868,0l-119.590205,92.53784l45.680466,149.731085l-119.590257,-92.54036l-119.590231,92.54036l45.680479,-149.731085l-119.590244,-92.53784z" strokeWidth="5" fill={fillPercent < 100 ? "url(#Gradient2)" : "yellow"} />
    </g>
   </svg>
 )
}

Star.propTypes = {
  fillPercent: PropTypes.number,
  id: PropTypes.number
}

export default Star
