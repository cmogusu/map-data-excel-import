import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import { addCommasToNumber } from '../../services/common'
import './style.css'

const TotalInfected = ({ totalInfected, totalInfectedByTown, onSetActiveId }) => {
  const handleClick = useCallback(event => {
    const { dataset } = event.currentTarget
    onSetActiveId(dataset.id)
  }, [onSetActiveId])

  return (
    <div className="mb-2 total-infected">
      <section className="border p-2 total-confirmed d-flex justify-content-center align-items-center flex-column mb-2 bg-light">
        <h3 className="h4">Total Confirmed</h3>
        <span className="red total-number h2 font-weight-bold">
          {addCommasToNumber(totalInfected)}
        </span>
      </section>
      <section className="mb-2 border bg-light">
        <h4 className="small font-weight-bold py-3 px-2 text-center">
          Confirmed Cases by town
        </h4>
        <ul className="p-0 overflow-auto">
          {totalInfectedByTown.map(({ id, town, totalInfected}) => (
            <li
              className="list-unstyled border-top p-2 text-truncate"
              data-id={id}
              key={camelCase(town)}
              title={`Total infected in ${town}`}
              onClick={handleClick}
            >
              <span className="red pr-2">{addCommasToNumber(totalInfected)}</span>
              <span className="text-capitalize">{town}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

TotalInfected.propTypes = {
  totalInfected: PropTypes.number.isRequired,
  totalInfectedByTown: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      town: PropTypes.string,
      totalInfected: PropTypes.number,
    })
  ).isRequired,
  onSetActiveId: PropTypes.func.isRequired,
}

export default TotalInfected
