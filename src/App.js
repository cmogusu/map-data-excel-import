import React, { Component } from 'react'
import ImportData from './components/ImportData'
import GMaps from './components/DrawingManager'
import 'antd/dist/antd.css'
import './App.css'

const d = [["Name","Type","Latitude","Longitude"],["Empire Blvd","Road",40.664045,-73.95067],["Boropack","Building",40.662107,-73.945117],["Resorts world casino","Building",40.673405,-73.831781],["Federal hall","Building",40.707443,-74.01007]]

class App extends Component {
  state = {
    data: d,
  }

  setData = data => {
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        {data.length < 1
          ? <ImportData setData={this.setData} />
          : <GMaps data={data} />
        }
      </div>
    )
  }
}

export default App
