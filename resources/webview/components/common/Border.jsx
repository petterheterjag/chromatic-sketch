import React from 'react'
import { StyleSheet, css } from 'aphrodite'

class Border extends React.PureComponent {
  render() {
    return <div className={css(styles.border)}>{this.props.children}</div>
  }
}

const styles = StyleSheet.create({
  border: {
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: 3,
      pointerEvents: 'none',
    },
  },
})

export default Border
