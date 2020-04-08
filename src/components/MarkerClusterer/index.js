import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from 'constants/common'


class GMaps extends Component {
  handleOnLoad = groundLayer => {
    console.log(groundLayer)
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
            zoom={4}
          >
            <MarkerClusterer
              options={{
                imageExtension: 'png',
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
              }}
            >
              {clusterer =>
                data.map(([, , lt, ln]) => (
                  <Marker
                    animation="DROP"
                    key={`p-${lt}${ln}`}
                    position={{ lat: lt, lng: ln }}
                    clusterer={clusterer}
                  />
                ))
              }
            </MarkerClusterer>
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
