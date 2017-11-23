import React from 'react'
import { SketchPicker } from 'react-color'
import { StyleSheet, css } from 'aphrodite'
import chroma from 'chroma-js'
import ColorBox from './ColorBox'
import Border from './Border'

class ColorInput extends React.PureComponent {
  constructor(props) {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      showPicker: false,
    }
  }

  createColorObject(chromaColor) {
    const rgba = chromaColor.rgba()
    return {
      r: rgba[0],
      g: rgba[1],
      b: rgba[2],
      a: rgba[3],
    }
  }

  handleClick() {
    this.setState({ showPicker: true })
  }

  handleClose() {
    this.setState({ showPicker: false })
  }

  handleChange(colorObject) {
    const color = colorObject.rgb
    const colorArray = [color.r, color.g, color.b, color.a]
    this.props.onChange(chroma(colorArray))
  }

  render() {
    return (
      <div
        className={css(styles.layout, this.state.showPicker && styles.focused)}
      >
        <div className={css(styles.swatch)}>
          <Border>
            <ColorBox color={this.props.value.css()} height={21} />
          </Border>
        </div>
        <input
          className={css(styles.input)}
          type="text"
          value={this.props.value.hex()}
          readOnly
        />
        <div className={css(styles.target)} onClick={this.handleClick} />
        {this.state.showPicker && (
          <div>
            <div className={css(styles.cover)} onClick={this.handleClose} />
            <div className={css(styles.popover)}>
              <SketchPicker
                presetColors={[]}
                color={this.createColorObject(this.props.value)}
                onChangeComplete={this.handleChange}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    marginRight: 10,
    position: 'relative',
  },
  swatch: {
    position: 'absolute',
    width: 21,
    height: 21,
    marginTop: 9,
    marginLeft: 9,
    borderRadius: 3,
    overflow: 'hidden',
  },
  input: {
    height: 34,
    paddingLeft: 38,
    width: 80,
    textTransform: 'uppercase',
    fontSize: 13,
  },
  target: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9997,
    cursor: 'pointer',
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9998,
  },
  popover: {
    position: 'absolute',
    zIndex: 9999,
    top: 46,
    left: -3,
  },
  focused: {
    '::after': {
      content: '""',
      width: 'calc(100% + 6px)',
      height: 'calc(100% + 6px)',
      display: 'block',
      background: '#B9D8F7',
      position: 'absolute',
      left: -3,
      top: -3,
      zIndex: -1,
      borderRadius: 3,
    },
  },
})

export default ColorInput
