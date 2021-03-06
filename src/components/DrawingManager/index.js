import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

class GMaps extends Component {
  map = null

  dm = null

  handleMapLoaded = map => {
    this.map = map
  }

  handleOnDManagerLoad = dm => {
    this.dm = dm
  }

  handleOnPolygonComplete = polyline => {
    const mvcArr = polyline.getPath()
    const coords = mvcArr
      .getArray()
      .map(latLng => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }))
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
          libraries={['drawing']}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={18}
            onLoad={this.handleMapLoaded}
          >
            <DrawingManager
              drawingMode="polygon"
              onLoad={this.handleOnDManagerLoad}
              onPolygonComplete={this.handleOnPolygonComplete}
            />
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
