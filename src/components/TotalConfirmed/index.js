import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'

const TotalConfirmed = ({ totalInfected, totalInfectedByTown }) => (
  <div className="mb-2">
    <section className="border p-2 total-confirmed d-flex justify-content-center align-items-center flex-column mb-2 bg-light">
      <h3 className="h4">Total Confirmed</h3>
      <span className="red total-number h2 font-weight-bold">{totalInfected}</span>
    </section>
    <section className="mb-2 border bg-light">
      <h4 className="small font-weight-bold py-3 px-2 text-center">
        Confirmed Cases by town
      </h4>
      <ul className="p-0 overflow-auto">
        {totalInfectedByTown.map(({ town, number}) => (
          <li className="list-unstyled border-top p-2" key={camelCase(town)}>
            <span className="red pr-2">{number}</span>
            <span className="text-capitalize">{town}</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
)

TotalConfirmed.propTypes = {
  totalInfected: PropTypes.number.isRequired,
  totalInfectedByTown: PropTypes.arrayOf(
    PropTypes.shape({
      town: PropTypes.string,
      number: PropTypes.number,
    })
  ).isRequired,
}

export default TotalConfirmed
