import React from 'react'
import { StyleSheet, css } from 'aphrodite'

class ColorModes extends React.PureComponent {
  render() {
    return (
      <div className={css(styles.layout)}>
        <label>
          Color Mode:
          <select
            className={css(styles.select)}
            value={this.props.mode}
            onChange={this.props.onChange}
          >
            <option value="lab">Lab</option>
            <option value="lch">Lch</option>
            <option value="hsl">HSL</option>
            <option value="rgb">RGB</option>
          </select>
        </label>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    marginLeft: 'auto',
  },
  select: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 9,
  },
})

export default ColorModes
