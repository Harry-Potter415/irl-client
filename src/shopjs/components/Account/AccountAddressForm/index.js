import React from 'react'
import { useForm } from 'shopjs/hooks'
import { get } from 'shopjs/helpers'
import { withStyles, Typography, TextField, Button, Box } from '@material-ui/core'

const styles = theme => ({
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
})

const AccountAddressForm = ({ classes, address, title, accountAddressUpdate }) => {
  const [{ validation, isFieldValid, values }, { text }] = useForm(address)

  const handleSubmit = async e => {
    accountAddressUpdate(address.id, {
      address1: get(values, 'address1', null),
      address2: get(values, 'address2', null),
      city: get(values, 'city', null),
      country: get(values, 'country', null),
      firstName: get(values, 'addressFirstName', null),
      lastName: get(values, 'addressLastName', null),
      phone: get(values, 'addressPhone', null),
      province: get(values, 'province', null),
      zip: get(values, 'zip', null),
    })
  }

  return (
    <Box p={2}>
      <Box textAlign="center">
        <Typography variant="h6">{title}</Typography>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="First name"
        error={isFieldValid('addressFirstName')}
        {...text('addressFirstName')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Last name"
        error={isFieldValid('addressLastName')}
        {...text('addressLastName')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Company"
        error={isFieldValid('company')}
        {...text('company')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Address line 1"
        error={isFieldValid('address1')}
        {...text('address1')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Address line 2"
        error={isFieldValid('address2')}
        {...text('address2')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="City"
        error={isFieldValid('city')}
        {...text('city')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Zipcode"
        error={isFieldValid('zip')}
        {...text('zip')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Country"
        error={isFieldValid('country')}
        {...text('country')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Province"
        error={isFieldValid('province')}
        {...text('province')}
        className={classes.input}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Phone number"
        error={isFieldValid('addressPhone')}
        {...text('addressPhone')}
        className={classes.input}
      />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        disabled={!validation.valid}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </Box>
  )
}

export default withStyles(styles)(AccountAddressForm)
