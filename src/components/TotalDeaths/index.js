import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'

const TotalDeaths = ({ totalDeaths, totalDeathsByTown }) => (
  <div className="mb-2 border bg-light">
    <section className="p-2 d-flex justify-content-center align-items-center flex-column mb-2">
      <h3 className="h4">Total Deaths</h3>
      <span className="black h2 font-weight-bold">{totalDeaths}</span>
    </section>
    <section>
      <ul className="p-0 overflow-auto">
        {totalDeathsByTown.map(({ town, totalDeaths}) => (
          <li className="list-unstyled border-bottom p-2" key={camelCase(town)}>
            <span className="black pr-2">{totalDeaths} deaths</span>
            <span className="text-capitalize">{town}</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
)

TotalDeaths.propTypes = {
  totalDeaths: PropTypes.number.isRequired,
  totalDeathsByTown: PropTypes.arrayOf(
    PropTypes.shape({
      town: PropTypes.string,
      totalDeaths: PropTypes.number,
    })
  ).isRequired,
}

export default TotalDeaths
