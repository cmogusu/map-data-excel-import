import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, StreetViewService } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'


class GMaps extends Component {
  handleOnLoad = streetViewService => {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]
    console.log('***', streetViewService)
    streetViewService.getPanorama({
      location: { lat, lng },
      radius: 50,
    }, (data, status) => {
      console.log('####', status, data)
    })
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
          >
            <StreetViewService onLoad={this.handleOnLoad} />
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
