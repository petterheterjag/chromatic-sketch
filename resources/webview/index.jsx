import React from 'react'
import ReactDOM from 'react-dom'
import ColorScaleView from './components/ColorScaleView'
import GradientView from './components/GradientView'
import pluginCall from 'sketch-module-web-view/client'

window.renderColorScaleView = (firstColor, lastColor) => {
  ReactDOM.render(
    <ColorScaleView firstColor={firstColor} lastColor={lastColor} />,
    document.getElementById('container')
  )
}

window.renderGradientView = (colorArray, positionArray) => {
  ReactDOM.render(
    <GradientView colorArray={colorArray} positionArray={positionArray} />,
    document.getElementById('container')
  )
}

pluginCall('ready')
