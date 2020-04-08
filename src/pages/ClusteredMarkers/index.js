import React, { Component } from 'react'
import camelCase from 'lodash/camelCase'
import groupBy from 'lodash/groupBy'
import ImportDataWithModal from 'components/ImportDataWithModal'
import MultiplePointsPerMarker from 'components/MultiplePointsPerMarker'
import Header from 'components/Header'
import { mergeByProp } from 'services/common'
import sampleData from './sampleData'

class ClusteredMarkers extends Component {
  _isMounted = true

  state = {
    data: [],
  }

  componentDidMount() {
    this.setSampleData()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  groupData(data) {
    const obj = groupBy(data, 'Latitude')
    return Object.values(obj)
  }

  setSampleData() {
    const data = this.groupData(sampleData)
    if (this._isMounted) this.setState({ data })
  }

  setData = rawData => {
    const data = this.groupData(sampleData)
    if (this._isMounted) this.setState({ data })
  }

  render() {
    const { data } = this.state

    return (
      <main className="p-2">
        <Header title="List multiple items on the same pin" />

        <div className="row align-self-stretch h-90">
          <div className="col-md-2 border-right">
            <ImportDataWithModal
              hasData={data.length > 0}
              sampleFile="/clustered-marker-data.xls"
              setData={this.setData}
            />
          </div>
          <div className="col-md-10">
            <MultiplePointsPerMarker data={data} />
          </div>
        </div>
      </main>
    )
  }
}

export default ClusteredMarkers
