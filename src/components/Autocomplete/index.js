import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'


class GMaps extends Component {
  autocomplete = null

  state = {
    address: '',
    icon: '',
  }

  handleOnLoad = autocomplete => {
    this.autocomplete = autocomplete
    console.log(autocomplete)
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace()
    if (place) {
      const { formatted_address: address, icon } = place
      this.setState({ address, icon })
    }
  }

  render() {
    const { address, icon } = this.state
    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
          libraries={['places']}
        >
          <Autocomplete
            type="geocode"
            onLoad={this.handleOnLoad}
            onPlaceChanged={this.handlePlaceChanged}
          >
            <input type="text" placeholder="search" />
          </Autocomplete>
          <p>
            {address || ''}
            <br />
            {icon && <img alt="location" src={icon} />}
          </p>

        </LoadScript>
      </div>
    )
  }
}

GMaps.propTypes = {
  data: PropTypes.array.isRequired
}

export default GMaps
