import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

class GMaps extends Component {
  map = null

  marker = null

  handleMapLoaded = map => {
    this.map = map
  }

  handleMarkerLoaded = marker => {
    this.marker = marker
    this.forceUpdate()
  }

  render() {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={18}
            onLoad={this.handleMapLoaded}
          >
            <Marker
              position={{ lat, lng }}
              onLoad={this.handleMarkerLoaded}
            />
            {this.marker && (
              <InfoWindow anchor={this.marker}>
                <p>hello world <br /> how u doing</p>
              </InfoWindow>
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
