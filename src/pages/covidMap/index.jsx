import React from 'react'

import Map from './components/Map'
import MapList from './components/MapList'
import { CovidMapContainer } from './style'

const CovidMap = () => {
  return (
    <CovidMapContainer>
      <MapList className="map-list" />
      <Map />
    </CovidMapContainer>
  )
}

export default CovidMap
