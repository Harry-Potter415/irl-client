import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'

const styles = {
  wideColumn: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  narrowColumn: {
    maxWidth: '450px',
    margin: '0 auto',
  },
  paper: {
    padding: '20px',
  },
}

class Column extends Component {
  render() {
    const { paper, narrow } = this.props
    return (
      <div style={narrow ? styles.narrowColumn : styles.wideColumn}>
        {!paper ? this.props.children : <Paper style={styles.paper}>{this.props.children}</Paper>}
      </div>
    )
  }
}

export default Column
