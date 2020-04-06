import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'

const TotalRecovered = ({ totalRecovered, totalRecoveredByTown }) => (
  <div className="mb-2 border bg-light">
    <section className="p-2 d-flex justify-content-center align-items-center flex-column mb-2">
      <h3 className="h4">Total Recovered</h3>
      <span className="green h2 font-weight-bold">{totalRecovered}</span>
    </section>
    <section>
      <ul className="p-0 overflow-auto">
        {totalRecoveredByTown.map(({ town, totalRecovered}) => (
          <li className="list-unstyled border-bottom p-2" key={camelCase(town)}>
            <span className="green pr-2">{totalRecovered} recovered</span>
            <span className="text-capitalize">{town}</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
)

TotalRecovered.propTypes = {
  totalRecovered: PropTypes.number.isRequired,
  totalRecoveredByTown: PropTypes.arrayOf(
    PropTypes.shape({
      town: PropTypes.string,
      totalRecovered: PropTypes.number,
    })
  ).isRequired,
}

export default TotalRecovered
