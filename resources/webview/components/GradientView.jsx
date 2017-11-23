import React from 'react'
import pluginCall from 'sketch-module-web-view/client'
import chroma from 'chroma-js'
import { StyleSheet, css } from 'aphrodite'
import { Button } from 'react-desktop/macOs'
import {
  createGradientStyle,
  interpolateArray,
  getTextColor,
} from '../helpers'

import ColorModes from './common/ColorModes'
import Container from './common/Container'
import Canvas from './common/Canvas'
import ColorBox from './common/ColorBox'
import Border from './common/Border'

class GradientView extends React.Component {
  constructor(props) {
    super()
    this.handleColorModeChange = this.handleColorModeChange.bind(this)
    this.handleApplyClick = this.handleApplyClick.bind(this)
    this.state = {
      colorMode: 'lab'
    }
  }

  handleColorModeChange(e) {
    this.setState({ colorMode: e.target.value })
  }

  handleApplyClick() {
    const scale = chroma
      .scale(this.props.colorArray)
      .domain(this.props.positionArray)
      .mode(this.state.colorMode)
    let stopArray = []

    interpolateArray(this.props.positionArray).forEach(function(position) {
      stopArray.push({ color: scale(position).rgba(), position: position })
    })

    pluginCall('applyGradient', stopArray)
  }

  render() {
    const newScale = chroma
      .scale(this.props.colorArray)
      .domain(this.props.positionArray)
      .mode(this.state.colorMode)
    const oldScale = chroma
      .scale(this.props.colorArray)
      .domain(this.props.positionArray)
      .mode('rgb')

    return (
      <div>
        <Container>
          <ColorModes
            mode={this.state.colorMode}
            onChange={this.handleColorModeChange}
          />
        </Container>
        <Canvas>
          <Border>
            <ColorBox
              color={createGradientStyle(newScale, this.props.positionArray)}
              height={100}
              styles={[styles.gradient, styles.new]}
            >
              <span style={{ color: getTextColor(newScale(0.5)) }}>New</span>
            </ColorBox>
          </Border>
          <Border>
            <ColorBox
              color={createGradientStyle(oldScale, this.props.positionArray)}
              height={40}
              styles={styles.gradient}
            >
              <span style={{ color: getTextColor(oldScale(0.5)) }}>Old</span>
            </ColorBox>
          </Border>
        </Canvas>
        <Container rightAlign>
          <Button color="blue" onClick={this.handleApplyClick}>
            Apply
          </Button>
        </Container>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 3,
    overflow: 'hidden',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  new: {
    marginBottom: 4,
  },
})

export default GradientView
