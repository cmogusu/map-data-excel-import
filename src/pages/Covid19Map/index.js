import React, { Component } from 'react'
import camelCase from 'lodash/camelCase'
import Header from 'components/Header'
import TotalInfected from 'components/TotalInfected'
import TotalRecovered from 'components/TotalRecovered'
import TotalDeaths from 'components/TotalDeaths'
import CircleMap from 'components/CircleMap'
import ImportData from 'components/ImportDataWithModal'
import { getPropSum } from 'services/common'
import './style.css'
import sampleData from './sampleData'

const formatRawData = rawData =>
  rawData.map(datum => {
    const [town, totalInfected, totalDeaths, totalRecovered, lat, lng] = datum
    return {
      id: camelCase(town),
      town,
      totalInfected,
      totalDeaths,
      totalRecovered,
      lat,
      lng,
    }
  })

class App extends Component {
  _isMounted = true

  totalInfected = 0

  totalDeaths = 0

  totalRecovered = 0

  state = {
    data: [],
    activeId: '',
  }

  componentDidMount() {
    this.setSampleData()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  setSampleData() {
    this.setTotals(sampleData)
    this.setState({ data: sampleData })
  }

  setTotals(data) {
    this.totalInfected = getPropSum(data, 'totalInfected')
    this.totalDeaths = getPropSum(data, 'totalDeaths')
    this.totalRecovered = getPropSum(data, 'totalRecovered')
  }

  setData = rawData => {
    const data = formatRawData(rawData).slice(1)
    this.setTotals(data)
    if (this._isMounted) this.setState({ data })
  }

  setActiveId = activeId => {
    if (this._isMounted) this.setState({ activeId })
  }

  render() {
    const { data, activeId } = this.state

    return (
      <main className="app p-2">
        <Header title="Coronavirus COVID-19 Cases in South Africa" />

        <div className="row align-self-stretch no-gutters">
          <div className="col-md-4 col-lg-2 pr-2">
            <ImportData
              hasData={data.length > 0}
              sampleFile="/southAfricaCovid19Stats.xlsx"
              setData={this.setData}
            />
            <TotalInfected
              totalInfected={this.totalInfected}
              totalInfectedByTown={data}
              onSetActiveId={this.setActiveId}
            />
          </div>
          <div className="col-md-5 col-lg-6 pr-2">
            <CircleMap activeId={activeId} totalInfectedByTown={data}/>
          </div>
          <div className="col-md-4">
            <div className="row no-gutters">
              <div className="col-md-6 pr-2">
                <TotalDeaths totalDeaths={this.totalDeaths} totalDeathsByTown={data} onSetActiveId={this.setActiveId} />
              </div>
              <div className="col-md-6">
                <TotalRecovered totalRecovered={this.totalRecovered} totalRecoveredByTown={data} onSetActiveId={this.setActiveId} />
              </div>
            </div>
          </div>
        </div>

      </main>
    )
  }
}

export default App
