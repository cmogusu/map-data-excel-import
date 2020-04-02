import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import './style.css'

class GMaps extends Component {
  markers = new Array(this.props.data.length - 1)

  handleOnLoad = index => marker => {
    this.setMarkers(index, marker)
  }

  setMarkers(index, marker) {
    this.markers[index] = marker
    const filledMarkers = this.markers.filter(v => !!v).length
    if (this.markers.length === filledMarkers) this.forceUpdate()
  }

  render() {
    const data = this.props.data.slice(1)
    const [, , lt, ln] = data[0]

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={{ lat: lt, lng: ln }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={12}
            onLoad={this.handleOnLoad}
          >
            {data.map((datum, index) => {
              const [name, , lat, lng] = datum
              return (
                <Fragment key={`f-${lat}-${lng}`}>
                  <Marker
                    title={name}
                    position={{ lat, lng }}
                    onLoad={this.handleOnLoad(index)}
                  />
                  {this.markers[index] && (
                    <InfoWindow
                      anchor={this.markers[index]}
                      title={name}
                    >
                      <span>{name}</span>
                    </InfoWindow>
                  )}
                </Fragment>
              )
            })}
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
