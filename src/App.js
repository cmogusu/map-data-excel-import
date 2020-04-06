import React, { Component } from 'react'
import Header from './components/Header'
import TotalConfirmed from './components/TotalConfirmed'
import TotalRecovered from './components/TotalRecovered'
import TotalDeaths from './components/TotalDeaths'
import ClusterMap from './components/ClusterMap'
import 'antd/dist/antd.css'
import './App.css'

// const d = [["Name","Type","Latitude","Longitude"],["Empire Blvd","Road",-31.56391,147.154312],["Boropack","Building",-33.718234,150.363181],["Resorts world casino","Building",-33.727111,150.371124],["Federal hall","Building",-33.848588,151.209834],["House 1","Building",-33.851702,151.216968],["House 2","Building",-34.671264,150.863657],["House 3","Building",-35.304724,148.662905],["House 4","Building",-36.817685,175.699196],["House 5","Building",-36.828611,175.790222],["House 6","Building",-37.75,145.116667],["House 7","Building",-37.759859,145.128708],["House 8","Building",-37.765015,145.133858],["House 9","Building",-37.770104,145.143299],["House 10","Building",-37.7737,145.145187],["House 11","Building",-37.774785,145.137978],["House 12","Building",-37.819616,144.968119],["House 13","Building",-38.330766,144.695692],["House 14","Building",-39.927193,175.053218],["House 15","Building",-41.330162,174.865694],["House 16","Building",-42.734358,147.439506],["House 17","Building",-42.734358,147.501315],["House 18","Building",-42.735258,147.438],["House 19","Building",-43.999792,170.463352]]
const d = [["Name","Type","Latitude","Longitude"],["Empire Blvd","Road",40.664045,-73.95067],["Boropack","Building",40.662107,-73.945117],["Resorts world casino","Building",40.673405,-73.831781],["Federal hall","Building",40.707443,-74.01007]]


const totalInfectedByTown = [
  {
    town: 'Johanesburg',
    noOfInfected: 337548,
  },
  {
    town: 'Newcastle',
    noOfInfected: 134658,
  },
  {
    town: 'Polokwane',
    noOfInfected: 456878,
  },
  {
    town: 'Mbombella',
    noOfInfected: 457662,
  },
  {
    town: 'Cape Town',
    noOfInfected: 98452,
  },
  {
    town: 'Port Elizabeth',
    noOfInfected: 78954,
  },
]

const totalInfected = 1277656

class App extends Component {
  state = {
    data: d,
  }

  setData = data => {
    this.setState({ data })
  }

  render() {
    return (
      <main className="app p-2">
        <Header />

        <div className="row align-self-stretch no-gutters">
          <div className="col-md-4 col-lg-2 pr-2">
            <TotalConfirmed totalInfected={totalInfected} totalInfectedByTown={totalInfectedByTown} />
          </div>
          <div className="col-md-5 col-lg-6 pr-2">
            <ClusterMap totalInfectedByTown={d} />
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-6">
                <TotalRecovered totalInfected={totalInfected} totalInfectedByTown={totalInfectedByTown} />
              </div>
              <div className="col-md-6">
                <TotalDeaths totalInfected={totalInfected} totalInfectedByTown={totalInfectedByTown} />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default App
