import React from 'react'
import { StyleSheet, css } from 'aphrodite'

class Container extends React.PureComponent {
  static defaultProps = {
    rightAlign: false,
  }

  render() {
    return (
      <div
        className={css(
          styles.container,
          this.props.rightAlign && styles.rightAlign
        )}
      >
        {this.props.children}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
})

export default Container
