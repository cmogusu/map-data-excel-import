import React from 'react'
import PropTypes from 'prop-types'

const TotalDeaths = ({ totalInfected, totalInfectedByTown }) => (
  <section>
    <div>
      <h3>Total Confirmed</h3>
      <div>{totalInfected}</div>
    </div>
    <div>
      <h4>Confirmed Cases by town</h4>
      <ul>
      {totalInfectedByTown.map(({ town, noOfInfected}) => (
        <li key={town}>
          <span>{noOfInfected}</span>
          <span>{town}</span>
        </li>
      ))}
      </ul>
    </div>
  </section>
)

TotalDeaths.propTypes = {
  totalInfected: PropTypes.number.isRequired,
  totalInfectedByTown: PropTypes.arrayOf(
    PropTypes.shape({
      town: PropTypes.string,
      noOfInfected: PropTypes.number,
    })
  ).isRequired,
}

export default TotalDeaths
