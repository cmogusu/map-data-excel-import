import React, { Component } from 'react'
import Header from './components/Header'
import TotalInfected from './components/TotalInfected'
import TotalRecovered from './components/TotalRecovered'
import TotalDeaths from './components/TotalDeaths'
import CircleMap from './components/CircleMap'
import ImportData from './components/ImportData2'
import { getPropSum } from './services/common'
import sampleData from './data/sampleData'
import 'antd/dist/antd.css'
import './App.css'

const formatRawData = rawData =>
  rawData.map(datum => {
    const [town, totalInfected, totalDeaths, totalRecovered, lat, lng] = datum
    return {
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
    data: sampleData,
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  setTotals = data => {
    this.totalInfected = getPropSum(data, 'totalInfected')
    this.totalDeaths = getPropSum(data, 'totalDeaths')
    this.totalRecovered = getPropSum(data, 'totalRecovered')
  }

  setData = rawData => {
    const data = formatRawData(rawData).slice(1)
    this.setTotals(data)
    if (this._isMounted) this.setState({ data })
  }

  render() {
    const { data } = this.state

    return (
      <main className="app p-2">
        <Header />

        <div className="row align-self-stretch no-gutters">
          <div className="col-md-4 col-lg-2 pr-2">
            <ImportData hasData={data.length > 0} setData={this.setData} />
            <TotalInfected totalInfected={this.totalInfected} totalInfectedByTown={data} />
          </div>
          <div className="col-md-5 col-lg-6 pr-2">
            <CircleMap totalInfectedByTown={data} />
          </div>
          <div className="col-md-4">
            <div className="row no-gutters">
              <div className="col-md-6 pr-2">
                <TotalDeaths totalDeaths={this.totalDeaths} totalDeathsByTown={data} />
              </div>
              <div className="col-md-6">
                <TotalRecovered totalRecovered={this.totalRecovered} totalRecoveredByTown={data} />
              </div>
            </div>
          </div>
        </div>

      </main>
    )
  }
}

export default App
