import React from 'react'
import pluginCall from 'sketch-module-web-view/client'
import chroma from 'chroma-js'
import { StyleSheet, css } from 'aphrodite'
import { createGradientStyle } from '../helpers'
import Slider from 'rc-slider'
import { Button } from 'react-desktop/macOs'
import { Checkboard } from 'react-color/lib/components/common'

import ColorModes from './common/ColorModes'
import ColorInput from './common/ColorInput'
import Swatch from './common/Swatch'
import Container from './common/Container'
import Canvas from './common/Canvas'
import Border from './common/Border'

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

class ColorScaleView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleFirstColorChange = this.handleFirstColorChange.bind(this)
    this.handleLastColorChange = this.handleLastColorChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleColorModeChange = this.handleColorModeChange.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.handleInsertClick = this.handleInsertClick.bind(this)
    this.state = {
      firstColor: chroma(this.props.firstColor),
      lastColor: chroma(this.props.lastColor),
      scaleValues: [0, 33.3, 66.6, 100],
      defaultScale: true,
      colorMode: 'lab',
    }
  }

  createDefaultScale(count) {
    this.setState({ defaultScale: true })
    let defaultScale = []
    for (var i = 0; i < count; i++) {
      defaultScale.push(100 / (count - 1) * i)
    }

    return defaultScale
  }

  handleRangeChange(value) {
    this.setState({ scaleValues: value })
    this.setState({ defaultScale: false })
  }

  handleFirstColorChange(color) {
    this.setState({ firstColor: color })
  }

  handleLastColorChange(color) {
    this.setState({ lastColor: color })
  }

  handleNumberChange(e) {
    let number = Number(e.target.value)
    if (number < 2) {
      number = 2
    } else if (number > 9) {
      number = 9
    }

    this.setState({ scaleValues: this.createDefaultScale(number) })
  }

  handleColorModeChange(e) {
    this.setState({ colorMode: e.target.value })
  }

  handleResetClick() {
    this.setState({
      scaleValues: this.createDefaultScale(this.state.scaleValues.length),
    })
  }

  handleInsertClick() {
    const scale = chroma
      .scale([this.state.firstColor, this.state.lastColor])
      .mode(this.state.colorMode)
    var colorArray = []
    for (var i = 0; i < this.state.scaleValues.length; i++) {
      colorArray.push(scale(this.state.scaleValues[i] / 100).rgba())
    }

    pluginCall('insert', colorArray)
  }

  render() {
    const scale = chroma
      .scale([this.state.firstColor, this.state.lastColor])
      .mode(this.state.colorMode)
    const numberOfSwatches = this.state.scaleValues.length
    const gradientStyle = createGradientStyle(scale)

    var swatchArray = []
    for (var i = 0; i < numberOfSwatches; i++) {
      swatchArray.push(
        <Swatch color={scale(this.state.scaleValues[i] / 100)} key={i} />
      )
    }

    return (
      <div>
        <Container>
          <ColorInput
            value={this.state.firstColor}
            onChange={this.handleFirstColorChange}
          />
          <ColorInput
            value={this.state.lastColor}
            onChange={this.handleLastColorChange}
          />
          <input
            className={css(styles.numberInput)}
            type="number"
            min="2"
            max="9"
            onChange={this.handleNumberChange}
            value={numberOfSwatches}
          />
          <ColorModes
            mode={this.state.colorMode}
            onChange={this.handleColorModeChange}
          />
        </Container>
        <Canvas>
          <Border>
            <div className={css(styles.palette)}>{swatchArray}</div>
          </Border>
          <div className={css(styles.scale)}>
            <Button
              className={css(styles.resetButton)}
              onClick={this.handleResetClick}
              disabled={this.state.defaultScale}
            >
              Reset
            </Button>
            <div className={css(styles.range)}>
              <Checkboard size={6} white="#fff" grey="#eee" />
              <Range
                value={this.state.scaleValues}
                count={numberOfSwatches - 1}
                onChange={this.handleRangeChange}
                railStyle={{ background: gradientStyle }}
              />
            </div>
          </div>
        </Canvas>
        <Container rightAlign>
          <Button color="blue" onClick={this.handleInsertClick}>
            Insert
          </Button>
        </Container>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  palette: {
    display: 'flex',
    flexFlow: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  numberInput: {
    margin: 0,
    padding: 10,
    fontSize: 13,
    '::-webkit-inner-spin-button': {
      opacity: 1,
      padding: 4,
    },
    '::-webkit-outer-spin-button': {
      opacity: 1,
      padding: 4,
    },
  },
  scale: {
    display: 'flex',
    paddingTop: 18,
    marginTop: 40,
    marginBottom: -20,
    borderTop: '1px solid #EDEDED',
  },
  range: {
    position: 'relative',
    flex: '1 0 0',
    borderRadius: 3,
    height: 20,
  },
  resetButton: {
    marginRight: 15,
    marginTop: 0,
  },
})

export default ColorScaleView
