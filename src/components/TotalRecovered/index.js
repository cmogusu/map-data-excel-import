import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import { addCommasToNumber } from '../../services/common'
import './style.css'

const TotalRecovered = ({ totalRecovered, totalRecoveredByTown, onSetActiveId }) => {
  const handleClick = useCallback(event => {
    const { dataset } = event.currentTarget
    onSetActiveId(dataset.id)
  }, [onSetActiveId])

  return (
    <div className="mb-2 border bg-light total-recovered">
      <section className="p-2 d-flex justify-content-center align-items-center flex-column mb-2">
        <h3 className="h4">Total Recovered</h3>
        <span className="green h2 font-weight-bold">
          {addCommasToNumber(totalRecovered)}
        </span>
      </section>
      <section>
        <ul className="p-0 overflow-auto">
          {totalRecoveredByTown.map(({ id, town, totalRecovered}) => (
            <li
              className="list-unstyled border-bottom p-2 text-truncate"
              data-id={id}
              key={camelCase(town)}
              title={`Total recovered in ${town}`}
              onClick={handleClick}
            >
              <span className="green pr-2">
                {addCommasToNumber(totalRecovered)} recovered
              </span>
              <span className="text-capitalize">{town}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

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
