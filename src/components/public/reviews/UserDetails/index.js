import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { globalStyles } from 'components/globalStyles'
import FormContainer from 'components/layout/FormContainer'
import FormHeader from 'components/layout/FormHeader'
import TextInput from 'components/inputs/TextInput'

const ButtonText = styled(Typography)`
  color: ${props => props.theme.palette.primary.contrastText} !important;
`

const UserDetails = ({ user, handleChange, errors, onSubmit, onVisit }) => {
  useEffect(onVisit, [])
  return (
    <FormContainer>
      <FormHeader
        subtitle="Nice one! 🙌"
        title="Want rewards and discounts on future stays? Leave your deets below!"
      />
      <form onSubmit={onSubmit}>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          name="name"
          value={user.name}
          handleChange={handleChange}
          error={errors.name}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          name="email"
          value={user.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <Button
          fullWidth
          style={globalStyles.top20}
          color="primary"
          variant="contained"
          type="submit"
        >
          <ButtonText variant="caption" gutterBottom>
            Get my rewards
          </ButtonText>
        </Button>
      </form>
    </FormContainer>
  )
}

export default UserDetails
