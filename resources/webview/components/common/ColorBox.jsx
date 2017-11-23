import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Checkboard } from 'react-color/lib/components/common'

class ColorBox extends React.PureComponent {
  render() {
    const checkboardSize = this.props.height < 30 ? 6 : 12

    return (
      <div
        className={css(styles.box, this.props.styles)}
        style={{ height: this.props.height }}
      >
        <Checkboard size={checkboardSize} white="#fff" grey="#eee" />
        <div
          className={css(styles.color)}
          style={{
            background: this.props.color,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    position: 'relative',
  },
  color: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
})

export default ColorBox
