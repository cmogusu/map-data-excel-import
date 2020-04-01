import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

class GMaps extends Component {
  map = null

  hm = null

  state = {
    isGoogleLoaded: false,
  }

  handleLoaded = () => {
    this.setState({ isGoogleLoaded: true })
  }

  handleMapLoaded = map => {
    this.map = map
  }

  handleHeatmapLoaded = hm => {
    this.hm = hm
    this.forceUpdate()
  }

  getDataPoints = () =>
    this
      .props
      .data
      .slice(1)
      .map(([, , lat, lng]) => window.google.maps.LatLng(lat, lng))

  render() {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
          libraries={['visualization']}
          onLoad={this.handleLoaded}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={18}
            onLoad={this.handleMapLoaded}
          >
          {this.state.isGoogleLoaded && (
            <HeatmapLayer
              data={this.getDataPoints()}
              onLoad={this.handleHeatmapLoaded}
            />
          )}
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

GMaps.propTypes = {
  data: PropTypes.array.isRequired
}

export default GMaps
