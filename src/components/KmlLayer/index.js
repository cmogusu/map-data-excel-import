import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, KmlLayer } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

class GMaps extends Component {
  handleOnLoad = kmlLayer => {
    setTimeout(() => {
      console.log(kmlLayer.status)
    }, 1000)
  }

  render() {
    const lat = 41.876
    const lng = -87.624

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
          >
            <KmlLayer
              url='/to-amsterdam-and-beyond.kml'
              onLoad={this.handleOnLoad}
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
