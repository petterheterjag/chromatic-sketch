import React from 'react'
import { StyleSheet, css } from 'aphrodite'

class Canvas extends React.PureComponent {
  render() {
    return <div className={css(styles.canvas)}>{this.props.children}</div>
  }
}

const styles = StyleSheet.create({
  canvas: {
    background: '#fff',
    borderTop: '1px solid #DFDFDF',
    borderBottom: '1px solid #DFDFDF',
    padding: 40,
  },
})

export default Canvas
