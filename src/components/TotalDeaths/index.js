import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import { addCommasToNumber } from '../../services/common'
import './style.css'

const TotalDeaths = ({ totalDeaths, totalDeathsByTown, onSetActiveId }) => {
  const handleClick = useCallback(event => {
    const { dataset } = event.currentTarget
    onSetActiveId(dataset.id)
  }, [onSetActiveId])

  return (
    <div className="mb-2 border bg-light total-deaths">
      <section className="p-2 d-flex justify-content-center align-items-center flex-column mb-2">
        <h3 className="h4">Total Deaths</h3>
        <span className="black h2 font-weight-bold">
          {addCommasToNumber(totalDeaths)}
        </span>
      </section>
      <section>
        <ul className="p-0 overflow-auto">
          {totalDeathsByTown.map(({ id, town, totalDeaths }) => (
            <li
              className="list-unstyled border-bottom p-2 text-truncate"
              data-id={id}
              key={camelCase(town)}
              title={`Total deaths in ${town}`}
              onClick={handleClick}
            >
              <span className="black pr-2">
                {addCommasToNumber(totalDeaths)} deaths
              </span>
              <span className="text-capitalize">{town}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

TotalDeaths.propTypes = {
  totalDeaths: PropTypes.number.isRequired,
  totalDeathsByTown: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      town: PropTypes.string,
      totalDeaths: PropTypes.number,
    })
  ).isRequired,
  onSetActiveId: PropTypes.func.isRequired,
}

export default TotalDeaths
