import React, { cloneElement } from 'react'
import { Box, Typography } from '@material-ui/core'
import config from 'shopjs/config'

const Placeholder = ({ title, subtitle, icon, size = 50 }) => {
  let newIcon
  const styles = {
    icon: {
      fontSize: `${size}px`,
      color: config.theme.colors.primary,
    },
  }
  if (icon) {
    newIcon = cloneElement(icon, { style: styles.icon })
  }

  return (
    <Box my={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {newIcon}
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{subtitle}</Typography>
    </Box>
  )
}

export default Placeholder
