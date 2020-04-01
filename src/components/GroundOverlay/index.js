import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

const center = {
  lat: 40.740,
  lng: -74.18
}

const bounds = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655
}

class GMaps extends Component {
  handleOnLoad = groundLayer => {
    console.log(groundLayer)
  }

  render() {
    // const data = this.props.data.slice(1)
    // const [, , lat, lng] = data[0]

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={center}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={13}
          >
            <GroundOverlay
              key={'url'}
              url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
              bounds={bounds}
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
