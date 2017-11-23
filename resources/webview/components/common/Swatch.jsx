import React from 'react'
import chroma from 'chroma-js'
import { StyleSheet, css } from 'aphrodite'
import { getTextColor } from '../../helpers'
import ColorBox from './ColorBox'

class Swatch extends React.PureComponent {
  render() {
    return (
      <div className={css(styles.swatch)}>
        <ColorBox color={this.props.color.css()} height={100}>
          <span style={{ color: getTextColor(this.props.color) }}>
            {this.props.color.hex()}
          </span>
        </ColorBox>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  swatch: {
    flex: '1 0 0',
    position: 'relative',
    fontSize: 11,
    textTransform: 'uppercase',
  },
})

export default Swatch
